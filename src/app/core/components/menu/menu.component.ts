import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AppState } from 'src/app/state/app.state'
import { selectIdRol, selectOptions } from 'src/app/state/selectors/user.selector'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuOptions$: Observable<any> = new Observable()

  showToggle = 'hidden';

  displayWords: string = '';
  logoArrow: string = 'fa-arrow-left';
  spaceWidthMenu: string = 'w-40';
  minimizedMenu: string = ''
  spaceIcons: string = 'pl-2';
  displayTooltip: string = 'hidden';
  sizeOfIcons: string = '';
  hideWords: boolean = false;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.menuOptions();
  }

  menuOptions() {
    this.menuOptions$ = this.store.select(selectOptions)
  }
  showMenu() {
    this.showToggle = this.showToggle === 'hidden' ? 'absolute z-10 sm:relative' : 'hidden'
  }
  
  hideWordsMenu() {
    this.hideWords = !this.hideWords
    this.displayWords = this.displayWords === '' ? 'hidden' : ''
    this.logoArrow = this.logoArrow === 'fa-arrow-left' ? 'fa-arrow-right' : 'fa-arrow-left'
    this.hideWords ? this.spaceWidthMenu = 'menuHide' : this.spaceWidthMenu = 'menuShow'
    this.spaceIcons = this.spaceIcons === 'pl-2' ? 'py-0 mx-auto' : 'pl-2'
    this.displayTooltip = this.displayTooltip === 'hidden' ? '' : 'hidden'
    this.hideWords ? this.sizeOfIcons = 'text-[16px]' : this.sizeOfIcons = ''
  }
}
