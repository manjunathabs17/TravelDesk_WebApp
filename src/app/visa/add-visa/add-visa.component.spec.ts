import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisaComponent } from './add-visa.component';

describe('AddVisaComponent', () => {
  let component: AddVisaComponent;
  let fixture: ComponentFixture<AddVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
