import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CitesModel } from 'src/app/core/models/cites/cites.interface';
import { AppState } from 'src/app/state/app.state';
import { selectIdUser } from 'src/app/state/selectors/items.selector';
import { CitesService } from '../../services/cites.service';
import * as CitesActions from 'src/app/state/actions/cites.action';
import { selectCites } from 'src/app/state/selectors/cites.selector';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  id_usuario$: number = null;
  data: CitesModel[] = [];

  constructor(
    private citesService: CitesService,
    private store: Store<AppState>,

  ) { }

  ngOnInit(): void {
    this.store.select(selectIdUser).subscribe({
      next: (data) => {
        if (data) {
          this.id_usuario$ = data;
          this.store.dispatch(CitesActions.loadAllCitesRequest({ id_usuario: this.id_usuario$ }));
          this.getData();
        }
      }
    })
  }

  getData() {
    this.store.select(selectCites).subscribe({
      next: (data) => {
        if (data) {
          this.data = data;
          console.log(this.data);          
        }
      }
    }
    )
  }

}
