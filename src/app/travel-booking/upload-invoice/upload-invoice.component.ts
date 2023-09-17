import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrls: ['./upload-invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UploadInvoiceComponent {
  @Output() closeEvent = new EventEmitter();

  @Input() opens: boolean = false;
  @Input() edit: boolean = false;
  @Input() editData: any;

  uploadinvoice!: FormGroup;
  // invoiceForm!: FormGroup;

  browseInvoice!: FormBuilder;
  travelBooking!: FormGroup;
  submitted = false;
  reset = true;

  public isDisabled: boolean = false;

  constructor(
    private _httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isDisabled = true;
    this.getInvoice();
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
      // vendor: ['', Validators.required],
      invoiceRecievedDate: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      dateSentToAccounts: ['', Validators.required],
      creditNote: ['', Validators.required],
      creditNoteNumber: ['', Validators.required],
      refundAmount: ['', Validators.required],
      statement: ['', Validators.required],
      invoiceNumber: ['', Validators.required],
      forwardTo: ['', Validators.required],
      invoiceAmountINR: ['', Validators.required],
      browseInvoice: ['', Validators.required],

      dateOfInvoice: ['', Validators.required],
    });

    // Disable a specific form control
    // this.uploadinvoice.get('company').disable();
  }

  ngOnChanges() {
    setTimeout(() => {
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

      // this.travelBooking.controls['fromAir'].setValue(this.editData.travel_from);
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

      this.travelBooking.controls['vendor'].setValue(
        this.editData.airline_name
      );

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
    }, 500);
  }

  onChange(value: any, formControl: any) {
    if (formControl === 'company') {
      this.travelBooking.controls[formControl].setValue(value.company_name);
    }
    if (formControl === 'name') {
      this.travelBooking.controls[formControl].setValue(value.emp_name);
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
  invoiceArr: any = [];

  types: any = ['Air', 'Hotel', 'Taxi'];

  invoices: any = [];

  // this.getName();

  getInvoice() {
    this._httpClient
      .get(environment?.apiKey + 'travelbooking/getAll/PendingInvoice')
      .subscribe((res: any) => {
        this.invoiceArr = res.data;
      });
  }

  fileHandler(event: any, invoice: any) {
    let fileDetail = event.target.files[0];
    let fileName = fileDetail.name;
    let fileSize = fileDetail.size;

    let inv = { ...invoice };

    let reader: any = new FileReader();
    let file: any;

    reader.readAsDataURL(fileDetail);

    reader.onload = (element: any) => {
      file = reader?.result?.split(',')[1];
    };

    setTimeout(() => {
      inv.file = file;
      inv.fileName = fileName;
      inv.file_size = fileSize;

      if (this.invoices.findIndex((el: any) => el.id === inv.id) === -1) {
        this.invoices.push(inv);
      } else {
        let index = this.invoices.findIndex((el: any) => el.id === inv.id);
        this.invoices[index] = inv;
        // let sampleArray = [...this.invoiceArr];
        // sampleArray[index] = inv;
        // this.invoiceArr = [...sampleArray];
        // console.log(this.invoiceArr);
        // this.changeDetection.detectChanges();
      }

      if (this.invoiceArr.findIndex((el: any) => el.id === inv.id) !== -1) {
        let index = this.invoiceArr.findIndex((el: any) => el.id === inv.id);
        this.invoiceArr[index] = inv;
        this.changeDetection.detectChanges();
      }
    }, 300);
  }

  // ----------------------browse invoice-----------------------------------
  browsefileHandler(event: any, browseInvoice: any) {
    let fileDetail = event.target.files[0];
    let fileName = fileDetail.name;
    let fileSize = fileDetail.size;

    let inv = { ...browseInvoice };

    let reader: any = new FileReader();
    let file: any;

    reader.readAsDataURL(fileDetail);

    reader.onload = (element: any) => {
      file = reader?.result?.split(',')[1];
    };

    setTimeout(() => {
      inv.file = file;
      inv.fileName = fileName;
      inv.file_size = fileSize;

      if (this.invoices.findIndex((el: any) => el.id === inv.id) === -1) {
        this.invoices.push(inv);
      } else {
        let index = this.invoices.findIndex((el: any) => el.id === inv.id);
        this.invoices[index] = inv;
      }
    }, 1000);
  }

  closeForm() {
    this.closeEvent.emit(this.opens);
  }

  invoicecloseForm() {
    this.closeEvent.emit(this.opens);
  }

  clear(ctrl: any) {
    this.travelBooking.controls[ctrl].setValue('');
  }

  multipleSubmitted = false;

  submit() {
    this.multipleSubmitted = true;

    if (this.invoices.length > 0) {
      let url = environment.apiKey + 'invoice/multiple';
      let payLoad = {
        invoices: this.invoices,
      };
      this._httpClient.post(url, payLoad).subscribe(
        (res) => {
          console.log(res);
          document.getElementById('closeButton')?.click();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  get c() {
    return this.travelBooking.controls;
  }

  invoiceSubmitted: boolean = false;

  selectedFile: File | any;
  selectedFileName;

  onFileSelected(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.selectedFileName = event.target.files[0].name;
  }

  onSubmit() {
    this.invoiceSubmitted = true;

    if (
      this.travelBooking.controls['invoiceRecievedDate'].valid &&
      this.travelBooking.controls['invoiceDate'].valid &&
      this.travelBooking.controls['dateSentToAccounts'].valid &&
      this.travelBooking.controls['creditNote'].valid &&
      this.travelBooking.controls['creditNoteNumber'].valid &&
      this.travelBooking.controls['refundAmount'].valid &&
      this.travelBooking.controls['statement'].valid &&
      this.travelBooking.controls['invoiceNumber'].valid &&
      this.travelBooking.controls['forwardTo'].valid &&
      this.travelBooking.controls['invoiceAmountINR'].valid &&
      this.travelBooking.controls['browseInvoice'].valid
    ) {
      const formData = new FormData();

      formData.append('emp_id', '1');

      formData.append(
        'company_name',
        this.travelBooking.controls['company'].value
      );

      formData.append('emp_name', this.travelBooking.controls['name'].value);

      formData.append(
        'vendor_name',
        this.travelBooking.controls['vendor'].value
      );

      formData.append(
        'inv_rec_date',
        this.travelBooking.controls['invoiceRecievedDate'].value
      );

      console.log(this.travelBooking.controls['vendor'].value);
      // formData.append(
      //   'vendor_name',
      //   this.travelBooking.controls['vendor'].value
      // );

      formData.append(
        'statement',
        this.travelBooking.controls['statement'].value
      );

      formData.append(
        'invoice_number',
        this.travelBooking.controls['invoiceNumber'].value
      );

      // formData.append(
      //   'amount',
      //   this.travelBooking.controls['refundAmount'].value // which amount refund or invoice
      // );

      formData.append(
        'amount',
        this.travelBooking.controls['invoiceAmountINR'].value // which amount refund or invoice
      );

      formData.append(
        'authorized_by',
        this.travelBooking.controls['authorisedBy'].value
      );

      formData.append(
        'debited_to',
        this.travelBooking.controls['debitedTo'].value
      );

      formData.append('remark', 'none');

      formData.append(
        // not specified air, taxi, hotel
        'invoiceType',
        this.travelBooking.controls['debitedTo'].value
      );

      formData.append(
        'file_name',
        this.travelBooking.controls['browseInvoice'].value
      );

      formData.append('bookingId', '6');
      formData.append('created_by', 'Javed');

      // formData.append(
      //   'inv_rec_date',
      //   this.travelBooking.controls['invoiceDate'].value // required
      // );

      // formData.append(
      //   'inv_rec_date',
      //   this.travelBooking.controls['dateSentToAccounts'].value // required
      // );

      // formData.append(
      //   'inv_rec_date',
      //   this.travelBooking.controls['creditNote'].value // required
      // );

      // formData.append(
      //   'inv_rec_date',
      //   this.travelBooking.controls['creditNoteNumber'].value // required
      // );

      // formData.append(
      //   'amount',
      //   this.travelBooking.controls['refundAmount'].value
      // );

      // formData.append(
      //   'forwarded_to',
      //   this.travelBooking.controls['forwardTo'].value
      // );
      // formData.append(
      //   'inv_rec_date',
      //   this.travelBooking.controls['invoiceAmountINR'].value // required
      // );

      //total 10 remaining

      formData.append('invoice', this.selectedFile);
      formData.append('fileName', this.selectedFileName);

      let url = environment.apiKey + 'invoice';

      this._httpClient.post(url, formData).subscribe(
        (response) => {
          // Handle the success response
          console.log('Form submission successful', response);
          this.closeForm();
        },
        (error) => {
          // Handle the error response
          console.error('Error occurred while submitting the form', error);
        }
      );
    }
  }

  triggerFileUpload(index) {
    document.getElementById(index)?.click();
  }

  closefileName(): void {
    //
  }
}
