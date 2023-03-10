import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {  Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import {  selectOptions } from 'src/app/state/selectors/items.selector';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuOptions$: Observable<any> = new Observable() ;



  constructor(
    private store: Store<AppState>,

  ) { }

  ngOnInit(): void {
    this.menuOptions();
 
  }
  menuOptions() {
    this.menuOptions$ = this.store.select(selectOptions);
            
  }
  alerta(pepe){
    alert(pepe);
  }
  

}
