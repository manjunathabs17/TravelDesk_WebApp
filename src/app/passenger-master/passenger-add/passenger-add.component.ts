import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-passenger-add',
  templateUrl: './passenger-add.component.html',
  styleUrls: ['./passenger-add.component.scss'],
})
export class PassengerAddComponent implements OnInit, OnChanges {
  passenger!: FormGroup;
  submitted = false;

  @Input() opens: boolean = false;
  @Input() edit_passenger: boolean = false;
  @Input() editData: any;

  @Input() view: boolean = false;
  @Input() viewData: any;

  @Output() closeEvent = new EventEmitter();

  constructor(
    private _httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['opens']);

    if (changes['opens'].currentValue && !this.edit_passenger) {
      this.passenger?.reset();
    }

    if (this.edit_passenger) {
      console.log(this.editData);

      this.passenger.controls['firstName'].setValue(this.editData.emp_name);

      this.passenger.controls['lastName'].setValue(this.editData.lastname);

      this.passenger.controls['companyName'].setValue(
        this.editData.company_name
      );
      this.passenger.controls['reportingManager'].setValue(
        this.editData.reporting_manager
      );
      this.passenger.controls['dateOfBirth'].setValue(this.editData.emp_dob);
      this.passenger.controls['phoneNumber'].setValue(this.editData.phone);
      this.passenger.controls['passengerAddress'].setValue(
        this.editData.emp_add1
      );
      this.passenger.controls['country'].setValue(this.editData.country);
      this.passenger.controls['state'].setValue(this.editData.state);
      this.passenger.controls['pinCode'].setValue(this.editData.pincode);
      this.passenger.controls['profilePic'].setValue(this.editData.profile_pic);
    }
  }

  onChange(value: any, formControl: any) {
    if (formControl === 'companyName') {
      console.log(value);
      this.passenger.controls[formControl].setValue(value.company_name);
    }

    if (formControl === 'country') {
      console.log(value);
      this.passenger.controls[formControl].setValue(value.name);
    }
  }

  companyNameOptions: any;
  companyNameArr: any = [];

  CountryOptions: any;
  countryArr: any = [];

  ngOnInit(): void {
    this.passenger = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      reportingManager: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailId: ['', Validators.required],
      passengerAddress: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pinCode: ['', Validators.required],
      profilePic: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', Validators.required],
      companyLocation: ['', Validators.required],
    });

    this.getcompanyName();
    this.getCountryName();

    this.companyNameOptions = this.passenger.controls[
      'companyName'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.company_name;
        return name
          ? this._filterNames(name as string)
          : this.companyNameArr.slice();
      })
    );

    this.CountryOptions = this.passenger.controls['country'].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this._filterCountry(name as string)
          : this.countryArr.slice();
      })
    );
  }

  private _filterNames(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.companyNameArr.filter((option: any) =>
      option.company_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterCountry(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.countryArr.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  getcompanyName() {
    this._httpClient
      .get(environment?.apiKey + 'company')
      .subscribe((res: any) => {
        this.companyNameArr = res.data;
      });
  }

  getCountryName() {
    this._httpClient
      .get(environment?.apiKey + 'location')
      .subscribe((res: any) => {
        this.countryArr = res.data;
      });
  }

  get c() {
    return this.passenger.controls;
  }

  clear(ctrl: any) {
    this.passenger.controls[ctrl].setValue('');
  }

  closePassenger() {
    this.closeEvent.emit(this.opens);
    this.passenger.reset();
    this.opens = false;
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;

    let body = {};

    body = {
      is_active: 1,
      created_at: '2023-06-28T05:42:12.741Z',
      id: 3047,
      emp_name: this.passenger.controls['firstName'].value,
      lastname: this.passenger.controls['lastName'].value,
      emp_dob: this.passenger.controls['dateOfBirth'].value,
      emp_add1: this.passenger.controls['passengerAddress'].value,
      emp_add2: 'Mira Road',
      city: this.passenger.controls['city'].value,
      state: this.passenger.controls['state'].value,
      country: this.passenger.controls['country'].value,
      pincode: this.passenger.controls['pinCode'].value,
      company_name: this.passenger.controls['companyName'].value,
      country_code: 'IN',
      created_by: 'JAVED',
      profile_pic: this.passenger.controls['profilePic'].value,
      company_id: '5',
    };

    this._httpClient
      .post(environment?.apiKey + 'employee', body)
      .subscribe((res) => {
        console.log('successfull', res);
        this.passenger.reset();
        this.submitted = false;
        this.closePassenger();
      });
  }

  editRowData(ctrl: any) {
    this.passenger.controls[ctrl].setValue('');
  }
}
