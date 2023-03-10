import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCiteComponent } from './register-cite.component';

describe('RegisterCiteComponent', () => {
  let component: RegisterCiteComponent;
  let fixture: ComponentFixture<RegisterCiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
