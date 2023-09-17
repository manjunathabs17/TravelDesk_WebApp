import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  ɵFormControlCtor,
  // MatSelectModule
} from '@angular/forms';
import { last, map, startWith } from 'rxjs';

@Component({
  selector: 'app-add-forex',
  templateUrl: './add-forex.component.html',
  styleUrls: ['./add-forex.component.scss'],
})
export class AddForexComponent implements OnInit, OnChanges {
  addForex!: FormGroup;
  submitted = false;
  isLoading = false;
  @Input() opens: boolean = false;
  companyId: any;

  @Input() update: boolean = false;
  @Input() updateData: any;

  @Output() closeEvent = new EventEmitter();
  company_name: any;
  debited_to: any;

  constructor(
    private _httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['opens']);

    if (this.update) {
      console.log(this.updateData);

      // add forex
      this.addForex.controls['vedorForex'].setValue(
        this.updateData.vendor_name
      );

      this.addForex.controls['travelerName'].setValue(
        this.updateData.traveler_name
      );
      this.addForex.controls['designation'].setValue(
        this.updateData.designation
      );
      this.addForex.controls['visitCountry'].setValue(this.updateData.country);

      this.addForex.controls['noOfDay'].setValue(this.updateData.no_of_day);

      this.addForex.controls['forexDeparture'].setValue(
        this.updateData.dept_date
      );
      this.addForex.controls['forexReturn'].setValue(
        this.updateData.return_date
      );
      this.addForex.controls['forexExchange'].setValue(
        this.updateData.exchange_date
      );

      // forex details
      this.addForex.controls['taxPurchased'].setValue(
        this.updateData.total_forex_purchased
      );
      this.addForex.controls['currency'].setValue(this.updateData.currency);

      this.addForex.controls['entertainment'].setValue(
        this.updateData.currency
      );

      this.addForex.controls['forexdebitedTo'].setValue(this.debited_to);

      this.addForex.controls['inrAmount'].setValue(this.updateData.inr_amount);
      this.addForex.controls['billNo'].setValue(this.updateData.bill_no);
      this.addForex.controls['forexRemarks'].setValue(this.updateData.remarks);

      // surreder forex
      this.addForex.controls['foreignCurrency'].setValue(
        this.updateData.refund_amount_if_forex_currency
      );
      this.addForex.controls['inrRefundAmount'].setValue(
        this.updateData.inr_refund_amount
      );
      this.addForex.controls['checkNo'].setValue(
        this.updateData.refund_cheque_no
      );
      this.addForex.controls['forexChequedate'].setValue(
        this.updateData.date_of_check
      );

      this.addForex.controls['refundBank'].setValue(
        this.updateData.refund_bank
      );
      this.addForex.controls['forexCheckNo'].setValue(
        this.updateData.cheque_no
      );
      this.addForex.controls['dateOfCheck'].setValue(
        this.updateData.date_of_cheque
      );
      this.addForex.controls['bankName'].setValue(this.updateData.bank_name);
      this.addForex.controls['refundBillNo'].setValue(
        this.updateData.refund_bill_no
      );
      this.addForex.controls['refundBillAmount'].setValue(
        this.updateData.refund_bill_amount
      );
    }
  }

  onChange(value: any, formControl: any) {
    if (formControl === 'vedorForex') {
      console.log(value);
      this.addForex.controls[formControl].setValue(value.airline_name);
    }

    if (formControl === 'travelerName') {
      console.log(value);
      this.addForex.controls[formControl].setValue(
        value.emp_name + ' ' + value?.lastname
      );
    }

    if (formControl === 'visitCountry') {
      console.log(value);
      this.addForex.controls[formControl].setValue(value.name);
    }
    if (formControl === 'forexdebitedTo') {
      console.log(value);
      this.addForex.controls[formControl].setValue(value.company_name);
    }
  }

  // ------------Arrys-----------

  vendorOptions: any;
  vendorArr: any = [];

  travelerOptions: any;
  travelerArr: any = [];

  visitCountryOptions: any;
  visitArr: any = [];

  forexdebitedToOptrions: any;
  forexdebitedArr: any = [];

  ngOnInit(): void {
    this.addForex = this.formBuilder.group({
      vedorForex: ['', Validators.required],
      travelerName: ['', Validators.required],
      designation: ['', Validators.required],
      visitCountry: ['', Validators.required],
      noOfDay: ['', Validators.required],
      forexDeparture: ['', Validators.required],
      forexReturn: ['', Validators.required],

      // ---------------FOREX DETAILS--------------------------
      forexExchange: ['', Validators.required],
      taxPurchased: ['', Validators.required],
      currency: ['', Validators.required],
      averageCost: ['', Validators.required],
      entertainment: ['', Validators.required],
      forexdebitedTo: ['', Validators.required],
      inrAmount: ['', Validators.required],
      billNo: ['', Validators.required],
      paymentDetails: ['', Validators.required],
      forexRemarks: ['', Validators.required],

      // ----------------------SURRENDER FOREX-------------------------
      foreignCurrency: ['', Validators.required],
      inrRefundAmount: ['', Validators.required],
      forexChequedate: ['', Validators.required],
      checkNo: ['', Validators.required],
      refundBank: ['', Validators.required],
      forexCheckNo: ['', Validators.required],
      dateOfCheck: ['', Validators.required],
      bankName: ['', Validators.required],
      refundBillNo: ['', Validators.required],
      refundBillAmount: ['', Validators.required],
    });

    if (this.update) {
      console.log(this.updateData);
    }

    //  ----------------API CALLS----------------------

    this.getVendorNames();
    this.getTravelerName();
    this.getvisitCountry();
    this.getForexdebit();

    this.vendorOptions = this.addForex.controls['vedorForex'].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.airline_name;
        return name
          ? this._filterNames(name as string)
          : this.vendorArr.slice();
      })
    );

    this.travelerOptions = this.addForex.controls[
      'travelerName'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.emp_name;
        return name
          ? this._filterTraveler(name as string)
          : this.travelerArr.slice();
      })
    );

    this.visitCountryOptions = this.addForex.controls[
      'visitCountry'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterVisit(name as string) : this.visitArr.slice();
      })
    );

    this.forexdebitedToOptrions = this.addForex.controls[
      'forexdebitedTo'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.company_name;
        return name
          ? this._filterDebitedTo(name as string)
          : this.forexdebitedArr.slice();
      })
    );
  }

  // ----------------------FILTERS------------------------

  private _filterNames(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.vendorArr.filter((option: any) =>
      option.airline_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterTraveler(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.travelerArr.filter((option: any) =>
      option.emp_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterVisit(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.visitArr.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterDebitedTo(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.forexdebitedArr.filter((option: any) =>
      option.company_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterAddforex(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.forexdebitedArr.filter((option: any) =>
      option.company_name.toLowerCase().includes(filterValue)
    );
  }

  getVendorNames() {
    this._httpClient
      .get(environment?.apiKey + 'airlines')
      .subscribe((res: any) => {
        this.vendorArr = res.data;
      });
  }

  getTravelerName() {
    this._httpClient
      .get(environment?.apiKey + 'employee')
      .subscribe((res: any) => {
        this.travelerArr = res.data;
      });
  }

  getvisitCountry() {
    this._httpClient
      .get(environment?.apiKey + 'location')
      .subscribe((res: any) => {
        this.visitArr = res.data;
      });
  }

  getForexdebit() {
    this._httpClient
      .get(environment?.apiKey + 'travelbooking')
      .subscribe((res: any) => {
        this.forexdebitedArr = res.data;
      });
  }

  // ----------------------------DISPLAY FUNCTIONS--------------------------

  // displayVendor(value: any) {
  //   return value && value.airline_name ? value.airline_name : '';
  // }

  // displayTraveler(value: any) {
  //   return value && value.emp_name ? value.emp_name : '';
  // }

  // displayCountry(value: any) {
  //   return value && value.country ? value.country : '';
  // }

  clear(ctrl: any) {
    this.addForex.controls[ctrl].setValue('');
  }

  closeForm() {
    this.closeEvent.emit(this.opens);
    this.addForex.reset();
    this.opens = false;
    this.submitted = false;
  }

  // -----------------form control---------------------
  // convenience getter for easy access to form fields
  get c() {
    return this.addForex.controls;
  }

  onSubmit() {
    this.submitted = true;

    let body = {};

    body = {
      created_at: '',
      id: 14,
      vendor_name: this.addForex.controls['vedorForex'].value,
      traveler_name: this.addForex.controls['travelerName'].value,
      designation: this.addForex.controls['designation'].value,
      country: this.addForex.controls['visitCountry'].value,
      no_of_day: this.addForex.controls['noOfDay'].value,
      dept_date: this.addForex.controls['forexDeparture'].value,
      return_date: this.addForex.controls['forexReturn'].value,
      exchange_date: this.addForex.controls['forexExchange'].value,

      total_forex_purchased: this.addForex.controls['taxPurchased'].value,
      currency: this.addForex.controls['currency'].value,
      entertainment: this.addForex.controls['entertainment'].value,
      debited_to: this.addForex.controls['forexdebitedTo'].value,
      inr_amount: this.addForex.controls['inrAmount'].value,
      bill_no: this.addForex.controls['billNo'].value,
      payment_details: '',
      remarks: this.addForex.controls['forexRemarks'].value,

      refund_amount_if_forex_currency:
        this.addForex.controls['foreignCurrency'].value,
      inr_refund_amount: this.addForex.controls['inrRefundAmount'].value,
      refund_cheque_no: this.addForex.controls['checkNo'].value,
      date_of_check: this.addForex.controls['forexChequedate'].value,
      refund_bank: this.addForex.controls['refundBank'].value,
      cheque_no: this.addForex.controls['forexCheckNo'].value,
      date_of_cheque: this.addForex.controls['dateOfCheck'].value,
      bank_name: this.addForex.controls['bankName'].value,
      refund_bill_no: this.addForex.controls['refundBillNo'].value,
      refund_bill_amount: this.addForex.controls['refundBillAmount'].value,
      created_by: '',
    };

    this._httpClient
      .post(environment?.apiKey + 'forex', body)
      .subscribe((res) => {
        console.log('successfull', res);
        this.addForex.reset();
        this.submitted = false;
        this.closeForm();
      });
  }

  updateRowData(ctrl: any) {
    this.addForex.controls[ctrl].setValue('');
  }
}
