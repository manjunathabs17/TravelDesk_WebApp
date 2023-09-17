import { TravelBookingModule } from './../travel-booking.module';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  ɵFormControlCtor,
  // MatSelectModule
} from '@angular/forms';
import { map, startWith } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss'],
})
export class AddBookingComponent implements OnInit, OnChanges {
  form: any;
  travelBooking!: FormGroup;
  submitted = false;

  @Input() min: any;
  booking = new Date();

  // constructor() {
  //   this.yesterday.setDate(this.yesterday.getDate() - 0);
  // }

  @Input() opens: boolean = false;
  @Input() edit: boolean = false;
  @Input() editData: any;

  @Input() view: boolean = false;
  @Input() viewData: any;

  @Output() closeEvent = new EventEmitter();

  constructor(
    private _httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  selected = 'option2';

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['opens']);

    if (changes['opens'].currentValue && !this.edit) {
      this.travelBooking?.reset();
    }

    if (this.edit) {
      console.log(this.editData);

      this.travelBooking.controls['company'].setValue(
        this.editData.company_name
      );

      this.travelBooking.controls['name'].setValue(this.editData.emp_name);

      this.travelBooking.controls['debitedTo'].setValue(
        this.editData.company_name
      );

      this.travelBooking.controls['authorisedBy'].setValue(
        this.editData.authorized_by
      );

      this.travelBooking.controls['PassedTo'].setValue(this.editData.passed_to);

      this.travelBooking.controls['event'].setValue(this.editData.event);

      if (this.editData.type === 'air_booking') {
        this.travelBooking.controls['travelDetails'].setValue('Air');
      }
      if (this.editData.type === 'hotel_booking') {
        this.travelBooking.controls['travelDetails'].setValue('Hotel');
      }
      if (this.editData.type === 'road_travel') {
        this.travelBooking.controls['travelDetails'].setValue('Taxi');
      }

      //air
      let travelValue = this.editData.travel.split('-');

      this.travelBooking.controls['fromAir'].setValue(travelValue[0]);

      this.travelBooking.controls['toAir'].setValue(travelValue[1]);

      let formattedDate = this.editData.from_date.split('/');

      this.travelBooking.controls['booking'].setValue(
        moment(formattedDate[2] + formattedDate[1] + formattedDate[0]).format()
      );

      let formattedDate1 = this.editData.to_date.split('/');

      this.travelBooking.controls['departure'].setValue(
        moment(
          formattedDate1[2] + formattedDate1[1] + formattedDate1[0]
        ).format()
      );

      let formattedDate2 = this.editData.to_date.split('/');

      this.travelBooking.controls['return'].setValue(
        moment(
          formattedDate2[2] + formattedDate2[1] + formattedDate2[0]
        ).format()
      );

      this.travelBooking.controls['vendor'].setValue(this.editData.airline);

      this.travelBooking.controls['pnrNumber'].setValue(this.editData.pnr);

      this.travelBooking.controls['airRemark'].setValue(this.editData.remark);

      //Hotel

      this.travelBooking.controls['city'].setValue(this.editData.city);

      this.travelBooking.controls['hotel'].setValue(this.editData.hotel_name);

      let formattedDateCheckIn = this.editData.from_date.split('/');

      this.travelBooking.controls['checkin'].setValue(
        moment(
          formattedDateCheckIn[2] +
            formattedDateCheckIn[1] +
            formattedDateCheckIn[0]
        ).format()
      );

      let formattedDateCheckOut = this.editData.to_date.split('/');

      this.travelBooking.controls['checkOut'].setValue(
        moment(
          formattedDateCheckOut[2] +
            formattedDateCheckOut[1] +
            formattedDateCheckOut[0]
        ).format()
      );

      this.travelBooking.controls['remarks'].setValue(this.editData.remark);

      //Taxi
      this.travelBooking.controls['fromTaxi'].setValue(
        this.editData.travel_from
      );
      this.travelBooking.controls['toTaxi'].setValue(this.editData.travel_to);

      let formattedDatereporting = this.editData.to_date.split('/');

      this.travelBooking.controls['reportingDate'].setValue(
        moment(
          formattedDatereporting[2] +
            formattedDatereporting[1] +
            formattedDatereporting[0]
        ).format()
      );

      let formattedTimeReporting = this.editData.to_date.split('/');

      this.travelBooking.controls['reportingTime'].setValue(
        moment(
          formattedTimeReporting[2] +
            formattedTimeReporting[1] +
            formattedTimeReporting[0]
        ).format()
      );

      this.travelBooking.controls['carType'].setValue(this.editData.taxi_type);
      this.travelBooking.controls['remarks'].setValue(this.editData.remark);

      console.log(this.travelBooking);
    }

    if (this.view) {
      this.travelBooking.disable();
    }
  }

  onChange(value: any, formControl: any) {
    console.log(value);
    if (formControl === 'company') {
      this.travelBooking.controls[formControl].setValue(value.company_name);
      this.companyId = value.company_id;
      this.getName();
    }
    if (formControl === 'name') {
      this.travelBooking.controls[formControl].setValue(
        value.emp_name + ' ' + value?.lastname
      );
    }
    if (formControl === 'debitedTo') {
      this.travelBooking.controls[formControl].setValue(value.company_name);
    }
    if (formControl === 'event') {
      this.travelBooking.controls[formControl].setValue(value.event_name);
    }

    // ---------------------AIR---------------------------

    if (formControl === 'fromAir') {
      this.travelBooking.controls[formControl].setValue(value.iata_code);
    }
    if (formControl === 'toAir') {
      this.travelBooking.controls[formControl].setValue(value.iata_code);
    }

    if (formControl === 'vendor') {
      this.travelBooking.controls[formControl].setValue(value.airline_name);
    }

    // ---------------------HOTEL---------------------------

    if (formControl === 'city') {
      this.travelBooking.controls[formControl].setValue(value.city);
    }
    if (formControl === 'hotel') {
      this.travelBooking.controls[formControl].setValue(value.hotel_name);
    }
  }

  companiesOptionC: any;
  companies: any = [];
  eventOptionsName: any;
  nameArr: any = [];
  companiesOption: any;
  debitedArr: any = [];
  eventOption: any;
  eventArr: any = [];
  eventAuthorised: any;
  PassedTo: any;
  // ---------------------------Air---------------------------

  airportsArr: any = [];
  airportOption: any;

  airportOptionTo: any;
  airportsArrTo: any = [];

  vendorOption: any;
  vendorArr: any = [];

  bookingOption: any;
  bookingArr: any = [];

  departureOption: any;
  departureArr: any = [];
  // ---------------------------hotel---------------------------
  cityOption: any;
  cityArr: any = [];

  hotelOption: any;
  hotelArr: any = [];

  hotelbookingOption: any;
  hotelbookingArr: any = [];

  checkinOption: any;
  checkinArr: any = [];

  // ---------------------------------Taxi-----------------------------

  // taxiOption: any;
  // taxiArr: any = [];

  types: any = ['Air', 'Hotel', 'Taxi'];

  ngOnInit(): void {
    this.travelBooking = this.formBuilder.group({
      company: ['', Validators.required],
      name: ['', Validators.required],
      debitedTo: ['', Validators.required],
      authorisedBy: ['', Validators.required],
      PassedTo: ['', Validators.required],
      event: ['', Validators.required],
      travelDetails: ['', Validators.required],
      fromAir: ['', Validators.required],
      toAir: ['', Validators.required],
      vendor: ['', Validators.required],
      booking: ['', Validators.required],
      departure: ['', Validators.required],
      return: ['', Validators.required],
      pnrNumber: ['', Validators.required],
      airRemark: ['', Validators.required],

      city: ['', Validators.required],
      hotel: ['', Validators.required],
      hotelbooking: ['', Validators.required],
      checkin: ['', Validators.required],
      checkOut: ['', Validators.required],
      remarks: ['', Validators.required],

      fromTaxi: ['', Validators.required],
      toTaxi: ['', Validators.required],
      reportingDate: ['', Validators.required],
      reportingTime: ['', Validators.required],
      carType: ['', Validators.required],
      remark: ['', Validators.required],
      taxiTime: ['', Validators.required],
    });

    if (this.edit) {
      console.log(this.editData);
    }

    if (this.view) {
      console.log(this.viewData);
    }

    this.companiesOptionC = this.travelBooking.controls[
      'company'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.company_name;
        return name ? this._filter(name as string) : this.companies.slice();
      })
    );

    this.eventOptionsName = this.travelBooking.controls[
      'name'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.company_name;
        return name ? this._filterNames(name as string) : this.nameArr.slice();
      })
    );

    this.companiesOption = this.travelBooking.controls[
      'debitedTo'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.company_name;
        return name
          ? this._filterDebitedTo(name as string)
          : this.debitedArr.slice();
      })
    );

    this.eventOption = this.travelBooking.controls['event'].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.event_name;
        return name ? this._filterEvent(name as string) : this.eventArr.slice();
      })
    );

    this.airportOption = this.travelBooking.controls[
      'fromAir'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.city_name;
        return name
          ? this._filterAirport(name as string)
          : this.airportsArr.slice();
      })
    );

    this.vendorOption = this.travelBooking.controls['vendor'].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.airline_name;
        return name
          ? this._filterVendor(name as string)
          : this.vendorArr.slice();
      })
    );

    this.airportOptionTo = this.travelBooking.controls[
      'toAir'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.city_name;
        return name
          ? this._filterAirport(name as string)
          : this.airportsArr.slice();
      })
    );

    // --------------------------------hotel-----------------------------

    this.cityOption = this.travelBooking.controls['city'].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        if (value.length > 4) {
          this.getCity(value);
        }
        const name = typeof value === 'string' ? value : value?.city;
        return name ? this._filterCity(name as string) : this.cityArr.slice();
      })
    );

    this.hotelOption = this.travelBooking.controls['hotel'].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.hotel_name;
        return name ? this._filterHotel(name as string) : this.hotelArr.slice();
      })
    );

    this.booking.setDate(this.booking.getDate() - 0); //Date Disable property

    this.getCompanyNames();
    this.getName();
    this.getDebitedTo();
    this.getEvent();
    this.getAirPorts();
    this.getVendor();
    this.getHotel();
    // this.getTaxi();
  }

  getCompanyNames() {
    this._httpClient
      .get(environment?.apiKey + 'company')
      .subscribe((res: any) => {
        this.companies = res.data;
      });
  }

  companyId;

  getName() {
    if (this.companyId) {
      this._httpClient
        .get(
          environment?.apiKey +
            'employee' +
            '/findAllEmployeesByCompany/' +
            this.companyId
        )
        .subscribe((res: any) => {
          this.nameArr = res.data;
        });
    }
  }

  getDebitedTo() {
    this._httpClient
      .get(environment?.apiKey + 'travelbooking')
      .subscribe((res: any) => {
        this.debitedArr = res.data;
      });
  }

  getEvent() {
    this._httpClient
      .get(environment?.apiKey + 'event')
      .subscribe((res: any) => {
        this.eventArr = res.data;
      });
  }

  getAirPorts() {
    this._httpClient
      .get(environment?.apiKey + 'airport')
      .subscribe((res: any) => {
        this.airportsArr = res.data;
      });
  }

  getVendor() {
    this._httpClient
      .get(environment?.apiKey + 'airlines')
      .subscribe((res: any) => {
        this.vendorArr = res.data;
      });
  }

  getCity(city: string) {
    this._httpClient
      .get(environment?.apiKey + 'location/getAllCity?city=' + city)
      .subscribe((res: any) => {
        this.cityArr = res.data;
      });
  }

  getHotel() {
    this._httpClient
      .get(environment?.apiKey + 'hotelbooking')
      .subscribe((res: any) => {
        this.hotelArr = res.data;
      });
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.companies.filter((option: any) =>
      option.company_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterNames(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.nameArr.filter((option: any) =>
      option.emp_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterDebitedTo(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.debitedArr.filter((option: any) =>
      option.emp_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterEvent(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.eventArr.filter((option: any) =>
      option.event_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterAirport(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.airportsArr.filter((option: any) =>
      option.city_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterVendor(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.vendorArr.filter((option: any) =>
      option.airline_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterCity(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.cityArr.filter((option: any) =>
      option.city.toLowerCase().includes(filterValue)
    );
  }

  private _filterHotel(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.cityArr.filter((option: any) =>
      option.hotel_name.toLowerCase().includes(filterValue)
    );
  }

  displayCompany(company: any): string {
    return company && company.company_name ? company.company_name : '';
  }
  displayFnName(name: any) {
    return name && name?.emp_name ? name.emp_name + ' ' + name.lastname : '';
  }

  displayFnStatic(value: any) {
    return value;
  }

  displayEvent(event: any) {
    return event && event.event_name ? event.event_name : '';
  }

  displayAirportFrom(value: any) {
    return value && value.iata_code
      ? value.iata_code + ' ' + '(' + value.airport_name + ')'
      : '';
  }

  // displayAirportTo(value: any) {
  //   return value && value.iata_code
  //     ? value.iata_code + ' ' + value.city_name
  //     : '';
  // }

  displayVendor(value: any) {
    return value && value.airline_name ? value.airline_name : '';
  }

  displayCity(value: any) {
    return value && value.city ? value.city : '';
  }

  displayHotel(value: any) {
    return value && value.hotel_name ? value.hotel_name : '';
  }

  // displayFn(company: any): string {
  //   return company && company.company_name ? company.company_name : '';
  // }

  closeForm() {
    this.closeEvent.emit(this.opens);
    this.travelBooking.reset();
    this.submitted = false;
  }
  dataPrint(value: any) {
    console.log(value);
  }

  clear(ctrl: any) {
    this.travelBooking.controls[ctrl].setValue('');
  }
  // -----------------form control---------------------
  // convenience getter for easy access to form fields
  get c() {
    return this.travelBooking.controls;
  }

  onSubmit() {
    this.submitted = true;

    let body = {};
    // -----------------------------------------AIR BOOKING--------------------------------------------

    //1)all should be true in air
    if (
      this.travelBooking.controls['travelDetails'].value === 'Air' &&
      this.travelBooking.controls['company'].value &&
      this.travelBooking.controls['company'].value &&
      this.travelBooking.controls['debitedTo'].value &&
      this.travelBooking.controls['authorisedBy'].value &&
      this.travelBooking.controls['PassedTo'].value &&
      this.travelBooking.controls['fromAir'].value &&
      this.travelBooking.controls['toAir'].value &&
      this.travelBooking.controls['departure'].valid &&
      this.travelBooking.controls['return'].value &&
      this.travelBooking.controls['departure'].value &&
      this.travelBooking.controls['vendor'].value &&
      this.travelBooking.controls['pnrNumber'].value &&
      this.travelBooking.controls['event'].value
    ) {
      body = {
        emp_id: '1',
        company_name: this.travelBooking.controls['company'].value,
        emp_name: this.travelBooking.controls['company'].value,
        remark: 'test',
        type: 'air_booking',
        debit_to: this.travelBooking.controls['debitedTo'].value,
        authorized_by: this.travelBooking.controls['authorisedBy'].value,
        passed_to: this.travelBooking.controls['PassedTo'].value,
        travel_from: this.travelBooking.controls['fromAir'].value,
        travel_to: this.travelBooking.controls['toAir'].value,
        event_id: '1',

        dep_date: this.travelBooking.controls['departure'].value,
        return_date: this.travelBooking.controls['return'].value,
        airline: this.travelBooking.controls['vendor'].value,
        pnr: this.travelBooking.controls['pnrNumber'].value,
        req_date: this.travelBooking.controls['departure'].value,
        event: this.travelBooking.controls['event'].value,
        created_by: 'test',
      };

      this._httpClient
        .post(environment?.apiKey + 'airbooking', body)
        .subscribe((res) => {
          console.log('successfull', res);
          this.travelBooking.reset();
          this.submitted = false;
          this.closeForm();
        });
    }

    // -----------------------------------------HOTEL BOOKING--------------------------------------------

    if (
      this.travelBooking.controls['travelDetails'].value === 'Hotel' &&
      this.travelBooking.controls['company'].value &&
      this.travelBooking.controls['company'].value &&
      this.travelBooking.controls['debitedTo'].value &&
      this.travelBooking.controls['authorisedBy'].value &&
      this.travelBooking.controls['PassedTo'].value &&
      this.travelBooking.controls['hotel'].value &&
      this.travelBooking.controls['city'].value &&
      this.travelBooking.controls['checkin'].value &&
      this.travelBooking.controls['checkOut'].value &&
      this.travelBooking.controls['remarks'].value
    ) {
      body = {
        emp_id: '1',
        company_name: this.travelBooking.controls['company'].value,
        emp_name: this.travelBooking.controls['company'].value,
        remark: this.travelBooking.controls['remarks'].value,
        debit_to: this.travelBooking.controls['debitedTo'].value,
        authorized_by: this.travelBooking.controls['authorisedBy'].value,
        passed_to: this.travelBooking.controls['PassedTo'].value,
        hotel_name: this.travelBooking.controls['hotel'].value,
        city: this.travelBooking.controls['city'].value,
        checkin: this.travelBooking.controls['checkin'].value,
        checkout: this.travelBooking.controls['checkOut'].value,
        event: this.travelBooking.controls['event'].value,
        req_date: '2023-01-01 00:00:00',
        created_by: 'Javed',
      };

      this._httpClient
        .post(environment?.apiKey + 'hotelbooking', body)
        .subscribe((res) => {
          console.log('successfull', res);
          this.travelBooking.reset();
          this.submitted = false;
          this.closeForm();
        });
    }

    // -----------------------------------------TAXI BOOKING--------------------------------------------

    if (
      this.travelBooking.controls['travelDetails'].value === 'Taxi' &&
      this.travelBooking.controls['company'].value &&
      this.travelBooking.controls['company'].value &&
      this.travelBooking.controls['debitedTo'].value &&
      this.travelBooking.controls['authorisedBy'].value &&
      this.travelBooking.controls['PassedTo'].value &&
      this.travelBooking.controls['fromTaxi'].value &&
      this.travelBooking.controls['toTaxi'].value &&
      this.travelBooking.controls['reportingTime'].value &&
      this.travelBooking.controls['carType'].value &&
      this.travelBooking.controls['remark'].value
    ) {
      body = {
        emp_id: '1',
        company_name: this.travelBooking.controls['company'].value,
        emp_name: this.travelBooking.controls['company'].value,
        remark: this.travelBooking.controls['remark'].value,
        debit_to: this.travelBooking.controls['debitedTo'].value,
        authorized_by: this.travelBooking.controls['authorisedBy'].value,
        passed_to: this.travelBooking.controls['PassedTo'].value,
        travel_from: this.travelBooking.controls['fromTaxi'].value,
        travel_to: this.travelBooking.controls['toTaxi'].value,
        pickup_time: this.travelBooking.controls['reportingTime'].value,
        drop_time: '',
        event_id: '1',
        taxi_type: this.travelBooking.controls['carType'].value,
        created_by: 'test',
      };

      this._httpClient
        .post(environment?.apiKey + 'roadtravel', body)
        .subscribe((res) => {
          console.log('successfull', res);
          this.travelBooking.reset();
          this.submitted = false;
          this.closeForm();
        });
    }
  }

  editRowData(ctrl: any) {
    this.travelBooking.controls[ctrl].setValue('');
  }
}
