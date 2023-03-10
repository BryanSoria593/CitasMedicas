import { Component, OnInit, Input } from '@angular/core';
import { selectIdUser } from 'src/app/state/selectors/items.selector';
import { selectCites, selectLoading } from 'src/app/state/selectors/cites.selector';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Observable, of, tap } from 'rxjs';
import * as CitesActions from 'src/app/state/actions/cites.action';
import { PageEvent } from '@angular/material/paginator';
import { CitesModel } from 'src/app/core/models/cites/cites.interface';
import { CitesService } from 'src/app/modules/cites/services/cites.service';

@Component({
  selector: 'app-cites',
  templateUrl: './cites.component.html',
  styleUrls: ['./cites.component.scss']
})
export class CitesComponent implements OnInit {
  // @Input() data: CitesModel[] = [];
  data$: Observable<CitesModel[]> = new Observable();

  pageSize: 5;
  desde: number = 0;
  hasta: number = 5;

  // Sirve para almacenar la columna y la dirección de ordenamiento, así ordenar en desc y asc según la columna
  ordenamiento = { columna: null, direccion: null };


  constructor(
    private store: Store<AppState>
  ) { }


  ngOnInit(): void {
    this.data$ = this.store.select(selectCites)

  }

  cambiarpagina(e: PageEvent) {
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }


  ordenarPor(columna: string) {
    if (this.ordenamiento.columna === columna) {
      this.ordenamiento.direccion = this.ordenamiento.direccion === 'asc' ? 'desc' : 'asc';
    } else {
      this.ordenamiento.columna = columna;
      this.ordenamiento.direccion = 'asc';
    }

    // Crea una copia del array original

    this.data$.subscribe((data) => {
      const newData = data.slice(0);
      newData.sort((a, b) => {

        // Ordena los datos según la columna y la dirección de ordenamiento

        const direccion = this.ordenamiento.direccion === 'asc' ? 1 : -1;
        if (a[columna] < b[columna]) {
          return -1 * direccion;
        } else if (a[columna] > b[columna]) {
          return 1 * direccion;
        } else {
          return 0;
        }
      });

      this.data$ = of(newData); // Con el 'of' se retorne un observable con el nuevo array ordenado


    })




    // Asigna el nuevo array ordenado a la propiedad 'data'
  }

}



