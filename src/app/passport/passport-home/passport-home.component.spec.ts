import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportHomeComponent } from './passport-home.component';

describe('PassportHomeComponent', () => {
  let component: PassportHomeComponent;
  let fixture: ComponentFixture<PassportHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassportHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassportHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
