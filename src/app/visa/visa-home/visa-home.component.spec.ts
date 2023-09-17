import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaHomeComponent } from './visa-home.component';

describe('VisaHomeComponent', () => {
  let component: VisaHomeComponent;
  let fixture: ComponentFixture<VisaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
