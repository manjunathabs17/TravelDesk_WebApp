import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatTableComponent } from './custom-mat-table.component';

describe('CustomMatTableComponent', () => {
  let component: CustomMatTableComponent;
  let fixture: ComponentFixture<CustomMatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomMatTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
