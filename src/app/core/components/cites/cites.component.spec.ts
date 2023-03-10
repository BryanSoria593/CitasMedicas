import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitesComponent } from './cites.component';

describe('CitesComponent', () => {
  let component: CitesComponent;
  let fixture: ComponentFixture<CitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
