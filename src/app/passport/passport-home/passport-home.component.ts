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
  selector: 'app-passport-home',
  templateUrl: './passport-home.component.html',
  styleUrls: ['./passport-home.component.scss'],
})
export class PassportHomeComponent implements OnInit {
  pageOpenClicked: boolean = false;
  PassportForm!: FormGroup;

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
      company_name: this.company?.value?.company_name
        ? this.company.value?.company_name
        : '',
      emp_id: this.name?.value?.id ? this.name?.value?.id : '',
      passport_no: this.passportNumber?.value?.id
        ? this.passportNumber?.value?.id
        : '',
      issue_date: this.dateOfIssue.value
        ? moment(new Date(this.dateOfIssue.value)).format('YYYY-MM-DD HH:mm:ss')
        : '',

      expire_date: this.dateOfExpiry.value
        ? moment(new Date(this.dateOfExpiry.value)).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        : '',

      status: this.passportStatus?.value ? this.passportStatus.value : '',
    };
    // let body = {};
    console.log(body, 'ssss', this.name);

    this.loading = true;
    this._httpClient
      .post(environment?.apiKey + 'employeepassport/findByFilter', body)
      .subscribe((res: any) => {
        this.tableData = res.data;
        this.loading = false;
        console.log(this.tableData);
      });
  }
  openPassenger() {
    this.pageOpenClicked = true;
  }

  company = new FormControl();
  name = new FormControl();
  passportNumber = new FormControl();
  passportStatus = new FormControl();
  dateOfIssue = new FormControl();
  dateOfExpiry = new FormControl();

  companiesOptionC: any;
  companyArr: any = [];

  nameOption: any;
  nameArr: any = [];

  typesStatus: any = ['Complete', 'Invoice Pending', 'All'];

  ngOnInit(): void {
    this.PassportForm = this.fb.group({
      company: [''],
      name: [''],
      passportNumber: [''],
      passportStatus: [''],
      dateOfIssue: [''],
      dateOfExpiry: [''],
    });

    this.getCompanyNames();
    this.getNames();

    this.companiesOptionC = this.company.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.company_name;
        return name ? this._filter(name as string) : this.companyArr.slice();
      })
    );

    this.nameOption = this.name.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        console.log(typeof value, value);
        const name = typeof value === 'string' ? value : value?.emp_name;
        return name ? this._filterName(name as string) : this.nameArr.slice();
      })
    );
  }

  displayFn(company: any): string {
    return company && company.company_name ? company.company_name : '';
  }

  displayNames(name: any) {
    return name && name?.emp_name ? name.emp_name + ' ' + name.lastname : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.companyArr.filter((option: any) =>
      option.company_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterName(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.nameArr.filter((option: any) =>
      option.emp_name.toLowerCase().includes(filterValue)
    );
  }

  getCompanyNames() {
    this._httpClient
      .get(environment?.apiKey + 'company')
      .subscribe((res: any) => {
        this.companyArr = res.data;
      });
  }

  getNames() {
    this._httpClient
      .get(environment?.apiKey + 'employee')
      .subscribe((res: any) => {
        this.nameArr = res.data;
      });
  }

  clear(ctrl: any) {
    ctrl.setValue(null);
  }

  hederColumns: any = [
    { displayName: 'Company Name', name: 'company_name' },
    { displayName: 'Employee Name', name: 'emp_name' },
    { displayName: 'Passport Number', name: 'passport_no' },

    { displayName: ' Date Of Issue', name: 'issue_date' },
    { displayName: ' Date Of Expiry', name: 'expire_date' },

    { displayName: 'Status', name: 'status' },
    { displayName: 'Action ', name: 'passport' },
  ];

  // --------------------------------ACTION BUTTON--------------------
  edit_ps: boolean = false;
  editRowData: any;

  editPassenger(event: any) {
    this.edit_ps = true;
    this.pageOpenClicked = true;
    this.editRowData = event;
  }

  view: boolean = false;

  viewRowData: any;

  viewPassenger(event: any) {
    this.view = true;
    this.edit_ps = true;
    this.pageOpenClicked = true;
    this.editRowData = event;
  }

  // -----------------------ACTION BUTTONS--------------------------------
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
