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
  selector: 'app-passport-add',
  templateUrl: './passport-add.component.html',
  styleUrls: ['./passport-add.component.scss'],
})
export class PassportAddComponent implements OnInit, OnChanges {
  addPassenger!: FormGroup;
  submitted = false;

  @Input() opens: boolean = false;
  @Input() edit_ps: boolean = false;
  @Input() editData: any;

  @Input() view: boolean = false;
  @Input() viewData: any;

  @Output() closeEvent = new EventEmitter();
  companyId: any;
  // edit: any;

  constructor(
    private _httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['opens']);

    if (changes['opens'].currentValue && !this.edit_ps) {
      this.addPassenger?.reset();
    }

    if (this.edit_ps) {
      console.log(this.editData);

      this.addPassenger.controls['companyPassenger'].setValue(
        this.editData.company_name
      );

      this.addPassenger.controls['passengerName'].setValue(
        this.editData.emp_name
      );

      this.addPassenger.controls['passengerAddress'].setValue(
        this.editData.emp_address
      );
      this.addPassenger.controls['fatherName'].setValue(
        this.editData.spouse_father
      );
      this.addPassenger.controls['passportNum'].setValue(
        this.editData.passport_no
      );
      this.addPassenger.controls['nationality'].setValue(
        this.editData.nationality
      );
      this.addPassenger.controls['dateOfIssue'].setValue(
        this.editData.issue_date
      );
      this.addPassenger.controls['dateOfExpiry'].setValue(
        this.editData.expire_date
      );
    }
    if (this.view) {
      this.addPassenger.disable();
    }
  }
  onChange(value: any, formControl: any) {
    console.log(value);
    if (formControl === 'companyPassenger') {
      this.addPassenger.controls[formControl].setValue(value.company_name);
      // this.companyId = value.company_id;
    }

    if (formControl === 'passengerName') {
      this.addPassenger.controls[formControl].setValue(
        value.emp_name + ' ' + value?.lastname
      );
    }
  }

  companyoptions: any;
  compannyArray: any = [];

  passengeroptions: any;
  passengerArray: any = [];

  ngOnInit(): void {
    this.addPassenger = this.formBuilder.group({
      companyPassenger: ['', Validators.required],
      passengerName: ['', Validators.required],
      dateOfbirth: ['', Validators.required],
      passengerAddress: ['', Validators.required],
      fatherName: ['', Validators.required],
      passportNum: ['', Validators.required],
      nationality: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      dateOfExpiry: ['', Validators.required],
      uploadPassport: ['', Validators.required],
    });

    if (this.edit_ps) {
      console.log(this.editData);
    }

    if (this.view) {
      console.log(this.viewData);
    }

    this.companyoptions = this.addPassenger.controls[
      'companyPassenger'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.company_name;
        return name ? this._filter(name as string) : this.compannyArray.slice();
      })
    );

    this.passengeroptions = this.addPassenger.controls[
      'passengerName'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.company_name;
        return name
          ? this._filterNames(name as string)
          : this.passengerArray.slice();
      })
    );

    this.getCompany();
    this.getName();
  }

  getCompany() {
    this._httpClient
      .get(environment?.apiKey + 'company')
      .subscribe((res: any) => {
        this.compannyArray = res.data;
      });
  }

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
          this.passengerArray = res.data;
        });
    }

    if (this.view) {
      console.log(this.viewData);
    }
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.compannyArray.filter((option: any) =>
      option.company_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterNames(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.passengerArray.filter((option: any) =>
      option.emp_name.toLowerCase().includes(filterValue)
    );
  }
  clear(ctrl: any) {
    this.addPassenger.controls[ctrl].setValue('');
  }

  get c() {
    return this.addPassenger.controls;
  }

  closeForm() {
    this.closeEvent.emit(this.opens);
    this.addPassenger.reset();
    this.opens = false;
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;

    let body = {};
    body = {
      id: 8,
      emp_id: 3049,
      passport_no: this.addPassenger.controls['passportNum'].value,
      issue_date: this.addPassenger.controls['dateOfIssue'].value,
      expire_date: this.addPassenger.controls['dateOfExpiry'].value,
      emp_address: this.addPassenger.controls['passengerAddress'].value,
      nationality: this.addPassenger.controls['nationality'].value,
      spouse_father: this.addPassenger.controls['fatherName'].value,
      company_name: this.addPassenger.controls['companyPassenger'].value,
      file_path: this.addPassenger.controls['uploadPassport'].value,
      employee: this.addPassenger.controls['passengerName'].value,
      // {
      //   emp_name: 'vrushali',
      //   lastname: 'testing',
      // },
      is_expired: false,
    };

    this._httpClient
      .post(environment?.apiKey + 'employeepassport', body)
      .subscribe((res) => {
        console.log('successfull', res);
        this.addPassenger.reset();
        this.submitted = false;
        this.closeForm();
      });
  }
  editRowData(ctrl: any) {
    this.addPassenger.controls[ctrl].setValue('');
  }
}
