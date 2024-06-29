import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
})
export class LoadingComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public message:any
  ) { }

  ngOnInit(): void { }
}