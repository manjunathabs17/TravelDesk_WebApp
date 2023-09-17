import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddForexComponent } from './add-forex.component';

describe('AddForexComponent', () => {
  let component: AddForexComponent;
  let fixture: ComponentFixture<AddForexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddForexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddForexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
