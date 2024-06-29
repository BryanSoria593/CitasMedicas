import { Component, Inject, OnInit } from '@angular/core'
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Image, Medicament, PreImageUpload } from 'src/app/core/models/cites/cites.interface'
import { DoctorService } from 'src/app/modules/doctor/services/doctor.service'
import { GeneralService } from 'src/app/shared/services/general.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-assign-medication',
  templateUrl: './assign-medication.component.html',
  styleUrls: ['./assign-medication.component.scss']
})

export class AssignMedicationComponent implements OnInit {

  preImages: PreImageUpload[] = []
  medicamentForm: FormGroup
  urlsImages: Image[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private generalService: GeneralService,
    private dialogRef: MatDialogRef<AssignMedicationComponent>,
    private router: Router
  ) {
    this.medicamentForm = this.fb.group({
      medicaments: this.fb.array([], [Validators.required, Validators.minLength(1)]),
      extraInfo: '',
    })
  }

  ngOnInit(): void { this.addMedicament() }

  medicaments(): FormArray {
    return this.medicamentForm.get("medicaments") as FormArray
  }

  addMedicament() {
    this.medicaments().push(this.newMedicamentForm())
  }

  newMedicamentForm(): FormGroup {
    return this.fb.group({
      medicament: ['', Validators.required],
      instruction: ['', Validators.required],
    })
  }

  removeMedicament(i: number) {
    this.medicaments().removeAt(i)
  }

  onDrop(event: DragEvent) {
    event.preventDefault()
    const files = event.dataTransfer.files
    this.handleFiles(files)
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i]
        const reader = new FileReader()
        reader.onload = () => {
          const name = event.target.files[i].name
          this.preImages.push({
            name,
            file: reader.result as string
          })
        }
        reader.readAsDataURL(file)
      }
    }
  }

  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onload = () => {
        const name = files[i].name
        this.preImages.push({
          name,
          file: reader.result as string
        })
      }
      reader.readAsDataURL(file)
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault()
  }

  removeImage(index: number) {
    this.preImages.splice(index, 1)
  }

  async uploadImageToCloudinary(name: string, file: string) {
    const APICloud = environment.apiCloudinay
    const formData = new FormData()

    
    formData.append('upload_preset', environment.uploadPresetNameCloudinary)
    formData.append('file', file)

    try {
      const resp = await fetch(APICloud, {
        method: 'POST',
        body: formData
      })
      if (!resp.ok) throw new Error('No se pudo subir la imágen')
      const cloudResp = await resp.json()
      this.urlsImages.push({ name, url: cloudResp.secure_url })
    } catch {
      this.generalService.openDialogSuccess("No se ha podido subir las imágenes al servicio", 'fa-solid fa-xmark', 'text-red-500', 3000)
    }
  }

  async uploadImages() {
    try {
      this.urlsImages = []
      await Promise.all(this.preImages.map(async (image) => {
        await this.uploadImageToCloudinary(image.name, image.file)
      }))
      this.sendHistorial(
        this.data.idCite,
        this.medicamentForm.value.medicaments,
        this.urlsImages,
        this.medicamentForm.value.extraInfo
      )
    } catch {
      this.generalService.openDialogSuccess("No se ha podido subir las imágenes", 'fa-solid fa-xmark', 'text-red-500', 3000)
    }
  }

  onSubmit() {
    if (this.preImages.length > 0) {
      this.uploadImages()
    } else {
      this.sendHistorial(
        this.data.idCite,
        this.medicamentForm.value.medicaments,
        [],
        this.medicamentForm.value.extraInfo
      )
    }
  }

  sendHistorial(idCite: number, medicaments: Medicament[], images: Image[] | [], extraInfo: string) {
    const dialog = this.generalService.openDialogLoading()
    this.doctorService.postHistorialByCite(idCite, medicaments, images, extraInfo).subscribe({
      next: (resp) => {
        dialog.close()
        if (resp.ok) {
          this.generalService.openDialogSuccess(resp.msg, 'fa-solid fa-check', 'text-green-500', 3000)
          setTimeout(() => {
            this.dialogRef.close(true)
            this.router.navigate(['/doctor/atendidos'])
          }, 3000)
        }
      },
      error: (err) => {
        dialog.close()
        this.generalService.openDialogSuccess(err.error.msg, 'fa-solid fa-xmark', 'text-red-500', 3000)
        this.dialogRef.close(true)
      }
    })
  }
}