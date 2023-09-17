import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { map, startWith } from 'rxjs/operators';
import { PdfService } from 'src/app/pdf.service';
import { environment } from 'src/environments/environment';

import * as html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-visa-home',
  templateUrl: './visa-home.component.html',
  styleUrls: ['./visa-home.component.scss'],
})
export class VisaHomeComponent implements OnInit {
  pageOpenClicked: boolean = false;
  VisaForm!: FormGroup;

  constructor(
    private _httpClient: HttpClient,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private pdfService: PdfService
  ) {}

  tableData: any;
  loading: boolean = false;

  search() {
    let body = {
      com_debited: this.debitedTo?.value?.company_name
        ? this.debitedTo?.value?.company_name
        : '',
      company_name: this.company?.value?.company_name
        ? this.company.value?.company_name
        : '',
      emp_name: this.name?.value?.id ? this.name?.value?.id : '',

      status: this.status?.value ? this.status.value : '',

      applied_date: this.dateOfApplication.value
        ? moment(new Date(this.dateOfApplication.value)).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        : '',

      validity: this.dateOfExpiry.value
        ? moment(new Date(this.dateOfExpiry.value)).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        : '',

      issue_date: this.dateOfIssue.value
        ? moment(new Date(this.dateOfIssue.value)).format('YYYY-MM-DD HH:mm:ss')
        : '',

      visa_type: this.name?.value?.id ? this.name?.value?.id : '',
    };
    // let body = {};
    console.log(body, 'ssss', this.name);

    this.loading = true;
    this._httpClient
      .post(environment?.apiKey + 'employeevisa/findByFilter', body)
      .subscribe((res: any) => {
        this.tableData = res.data;
        this.loading = false;
        console.log(this.tableData);
      });
  }

  ispageopen: boolean = false;

  debitedTo = new FormControl();
  company = new FormControl();
  name = new FormControl();
  country = new FormControl();
  status = new FormControl();
  dateOfApplication = new FormControl();
  dateOfIssue = new FormControl();
  dateOfExpiry = new FormControl();

  companiesOption: any;
  companies: any = [];
  companiesOptionC: any;
  eventOptionsN: any;
  nameArr: any = [];

  countryOptions: any;
  countryArr: any = [];

  typesStatus: any = ['Expired', 'Active', 'All'];

  ngOnInit(): void {
    this.VisaForm = this.fb.group({
      debitedTo: [''],
      company: [''],
      name: [''],
      country: [''],
      status: [''],
      dateOfApplication: [''],
      dateOfIssue: [''],
      dateOfExpiry: [''],
    });

    this.getCompanyNames();
    this.getName();
    this.getCountry();

    // this.getTableData();

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

    this.eventOptionsN = this.name.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        console.log(typeof value, value);
        const name = typeof value === 'string' ? value : value?.emp_name;
        return name ? this._filterNames(name as string) : this.nameArr.slice();
      })
    );

    this.countryOptions = this.name.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        console.log(typeof value, value);
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this._filterCountry(name as string)
          : this.countryArr.slice();
      })
    );
  }

  displayFn(company: any): string {
    return company && company.company_name ? company.company_name : '';
  }

  displayFnName(name: any) {
    return name && name?.emp_name ? name.emp_name + ' ' + name.lastname : '';
  }

  displayCountry(name: any) {
    return name && name?.name ? name.name : '';
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

  private _filterCountry(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.countryArr.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  getCompanyNames() {
    this._httpClient
      .get(environment?.apiKey + 'company')
      .subscribe((res: any) => {
        this.companies = res.data;
      });
  }

  getName() {
    this._httpClient
      .get(environment?.apiKey + 'employee')
      .subscribe((res: any) => {
        this.nameArr = res.data;
      });
  }

  getCountry() {
    this._httpClient
      .get(environment?.apiKey + 'location')
      .subscribe((res: any) => {
        this.countryArr = res.data;
      });
  }

  openClose() {
    this.ispageopen = true;
  }

  outputData(event: any) {
    this.ispageopen = false;
  }

  clear(ctrl: any) {
    ctrl.setValue(null);
  }

  hederColumns: any = [
    { displayName: 'Debited To', name: 'com_debited' },
    { displayName: 'Company Name', name: 'company_name' },
    { displayName: 'Employee Name', name: 'emp_name' },
    { displayName: ' Date Of Application', name: 'applied_date' },
    { displayName: ' Date Of Issue', name: 'issue_date' },
    { displayName: ' Date Of Expiry', name: 'validity' },
    { displayName: ' Type Of Visa', name: 'visa_type' },
    { displayName: ' No Of Entries', name: 'no_of_entries' },
    { displayName: 'Status', name: 'status' },
    { displayName: 'Action ', name: 'visa' },
  ];

  // ------------------------------------ACTION BUTTONS--------------------------------

  openVisa() {
    this.pageOpenClicked = true;
  }

  edit_visa: boolean = false;
  editRowData: any;

  editVisa(event: any) {
    this.edit_visa = true;
    this.pageOpenClicked = true;
    this.editRowData = event;
  }

  view: boolean = false;

  viewRowData: any;

  viewVisa(event: any) {
    this.view = true;
    this.edit_visa = true;
    this.pageOpenClicked = true;
    this.editRowData = event;
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
}
