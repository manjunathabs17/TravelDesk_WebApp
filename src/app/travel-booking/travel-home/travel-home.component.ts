import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';

import { environment } from '../../../environments/environment';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import * as moment from 'moment';

import { MatDialog } from '@angular/material/dialog';
import { UploadInvoiceComponent } from '../upload-invoice/upload-invoice.component';
import { PdfService } from 'src/app/pdf.service';
@Component({
  selector: 'app-travel-home',
  templateUrl: './travel-home.component.html',
  styleUrls: ['./travel-home.component.scss'],
})
export class TravelHomeComponent implements OnInit {
  pageOpenClicked: boolean = false;
  SearchForm!: FormGroup;
  event!: null;
  public date!: Date;

  constructor(
    private _httpClient: HttpClient,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private pdfService: PdfService
  ) {}
  openDialog() {
    const dialogRef = this.dialog.open(UploadInvoiceComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  tableData: any;
  loading: boolean = false;

  search() {
    let body = {
      com_debited: this.debitedTo?.value?.company_name
        ? this.debitedTo?.value?.company_name
        : '',
      from_date: this.fromDate.value
        ? moment(new Date(this.fromDate.value)).format('YYYY-MM-DD HH:mm:ss')
        : '',

      to_date: this.toDate.value
        ? moment(new Date(this.toDate.value)).format('YYYY-MM-DD HH:mm:ss')
        : '',
      company_name: this.company?.value?.company_name
        ? this.company.value?.company_name
        : '',
      bookingType: this.typeOfBooking?.value
        ? this.typeOfBooking.value === 'Air'
          ? 'AIR'
          : this.typeOfBooking.value === 'Hotel'
          ? 'HOTEL'
          : this.typeOfBooking.value === 'Taxi'
          ? 'ROAD'
          : ''
        : '',
      status: this.status?.value ? this.status.value : '',

      emp_id: this.name?.value?.id ? this.name?.value?.id : '',
      event_id: this.eventsType?.value?.event_id
        ? this.eventsType?.value?.event_id
        : '',
    };
    // let body = {};
    console.log(body, 'ssss', this.name);

    this.loading = true;
    this._httpClient
      .post(environment?.apiKey + 'travelbooking/findByFilter', body)
      .subscribe((res: any) => {
        this.tableData = res.data;
        this.loading = false;
        console.log(this.tableData);
      });
  }

  companies: any = [];
  eventsArr: any = [];
  companiesOption: any;
  companiesOptionC: any;
  eventOptions: any;
  eventOptionsN: any;
  nameArr: any = [];
  fromDateArr: any = [];
  // toDateArr: any = [];

  options: any = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];

  types: any = ['Air', 'Hotel', 'Taxi'];
  typesStatus: any = ['Complete', 'Invoice Pending', 'All'];

  // assignees = new FormControl('');
  filteredOptions!: Observable<any[]>;

  debitedTo = new FormControl();
  company = new FormControl();
  typeOfBooking = new FormControl();
  eventsType = new FormControl();
  status = new FormControl();
  name = new FormControl();
  fromDate = new FormControl();
  toDate = new FormControl();

  ngOnInit(): void {
    this.SearchForm = this.fb.group({
      debitedTo: [''],
      company: [''],
      typeOfBooking: [''],
      events: [''],
      name: [''],
      status: [''],
      fromDate: [''],
      toDate: [''],
    });

    this.companiesOption = this.debitedTo.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.company_name;
        return name ? this._filter(name as string) : this.companies.slice();
      })
    );

    this.companiesOptionC = this.company.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.company_name;
        return name ? this._filter(name as string) : this.companies.slice();
      })
    );

    this.eventOptions = this.eventsType.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.event_name;
        return name
          ? this._filterEvents(name as string)
          : this.eventsArr.slice();
      })
    );

    this.eventOptionsN = this.name.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        console.log(typeof value, value);
        const name = typeof value === 'string' ? value : value?.emp_name;
        return name ? this._filterNames(name as string) : this.nameArr.slice();
      })
    );
    this.fromDateArr = this.name.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.emp_name;
        return name ? this._filter(name as string) : this.fromDateArr.slice();
      })
    );

    this.getTableData();
    this.getCompanyNames();
    this.getEvents();
    this.getName();
  }

  displayFn(company: any): string {
    return company && company.company_name ? company.company_name : '';
  }

  displayFnEvent(event: any) {
    return event && event.event_name ? event.event_name : '';
  }

  displayFnStatic(value: any) {
    return value;
  }

  displayFnName(name: any) {
    return name && name?.emp_name ? name.emp_name + ' ' + name.lastname : '';
  }

  displayFnStatus(value: any) {
    return value;
  }
  displayFnDate(value: any) {
    return value;
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

  private _filterEvents(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.eventsArr.filter((option: any) =>
      option.event_name.toLowerCase().includes(filterValue)
    );
  }

  hederColumns: any = [
    { displayName: 'Debited To', name: 'debit_to' },
    { displayName: 'Company Name', name: 'company_name' },
    { displayName: 'Employee Name', name: 'emp_name' },
    { displayName: 'Event', name: 'event' },
    { displayName: 'Travel', name: 'travel' },
    { displayName: 'From Date', name: 'from_date' },
    { displayName: 'To Date', name: 'to_date' },
    { displayName: 'Authorised By', name: 'authorized_by' },
    { displayName: 'Passed To', name: 'passed_to ' },
    { displayName: 'Status', name: 'status' },
    { displayName: 'Action ', name: 'action' },
  ];

  receivedEvent(event: any) {
    this.pageOpenClicked = false;
  }

  openAdd() {
    this.pageOpenClicked = true;
  }

  getTableData() {
    this.loading = true;
    this._httpClient
      .get(environment?.apiKey + 'travelbooking')
      .subscribe((res: any) => {
        this.tableData = [];
        this.loading = false;
      });
  }

  getCompanyNames() {
    this._httpClient
      .get(environment?.apiKey + 'company')
      .subscribe((res: any) => {
        this.companies = res.data;
      });
  }
  getEvents() {
    this._httpClient
      .get(environment?.apiKey + 'event')
      .subscribe((res: any) => {
        this.eventsArr = res.data;
      });
  }

  getName() {
    this._httpClient
      .get(environment?.apiKey + 'employee')
      .subscribe((res: any) => {
        this.nameArr = res.data;
      });
  }

  clear(ctrl: any) {
    ctrl.setValue(null);
  }

  // -----------------------------------ACTION BUTTONS--------------------------------

  openInvoice: boolean = false;

  upload: boolean = false;

  uploadInvoice(event: any) {
    this.upload = true;
    this.openInvoice = true;
    this.editRowData = event;
  }

  closeInvoice(event: any) {
    this.upload = false;
    this.openInvoice = false;
  }

  edit: boolean = false;
  editRowData: any;

  editInvoice(event: any) {
    this.edit = true;
    this.pageOpenClicked = true;
    this.editRowData = event;
  }

  view: boolean = false;

  viewRowData: any;

  viewInvoice(event: any) {
    this.view = true;
    this.edit = true;
    this.pageOpenClicked = true;
    this.editRowData = event;
  }

  downloadInvoice(event: any) {
    if (event?.invoice?.file_path) {
      let url: any =
        environment.apiKey + 'invoicefile/' + event.invoice.file_path;
      const filename = event.invoice.file_name; // Specify the filename for the downloaded file

      this._httpClient.get(url, { responseType: 'blob' }).subscribe(
        (response: Blob) => {
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(response);
          downloadLink.download = filename;
          downloadLink.click();
        },
        (error) => {
          console.error('Error occurred while downloading the file', error);
        }
      );
    }
  }

  // ----------------------------DownloadPdf-----------------

  html2pdf: any;
  @ViewChild('contentToExport')
  contentToExport: any;

  downloadPdf(): void {
    const options = {
      filename: 'content.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    const content = this.contentToExport.nativeElement;
    html2pdf().set(options).from(content).save();
  }

  // -----------------------------Export Excel-----------------------

  downloadExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tableData);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'table_data');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();
  }
}

// clearDate(): any) {
//   any.stopPropagation();
//   this.date = null;
// }
