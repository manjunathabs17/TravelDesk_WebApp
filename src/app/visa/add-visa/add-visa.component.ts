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
  selector: 'app-add-visa',
  templateUrl: './add-visa.component.html',
  styleUrls: ['./add-visa.component.scss'],
})
export class AddVisaComponent implements OnInit, OnChanges {
  addVisa!: FormGroup;
  submitted = false;

  @Input() opens: boolean = false;
  @Input() edit_visa: boolean = false;
  @Input() editData: any;

  @Input() view: boolean = false;
  @Input() viewData: any;

  @Output() closeEvent = new EventEmitter();
  companyId: any;

  constructor(
    private _httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['opens']);

    if (changes['opens'].currentValue && !this.edit_visa) {
      this.addVisa?.reset();
    }

    if (this.edit_visa) {
      console.log(this.editData);

      this.addVisa.controls['companyName'].setValue(this.editData.company_name);

      this.addVisa.controls['visaName'].setValue(this.editData.emp_name);

      this.addVisa.controls['debitedTo'].setValue(this.editData.com_debited);

      this.addVisa.controls['authorisedBy'].setValue(
        this.editData.authorized_by
      );

      this.addVisa.controls['passedTo'].setValue(this.editData.passed_to);

      this.addVisa.controls['country'].setValue(this.editData.country);

      this.addVisa.controls['dateOfApplication'].setValue(
        this.editData.applied_date
      );

      this.addVisa.controls['dateOfIssue'].setValue(this.editData.issue_date);

      this.addVisa.controls['dateOfExpiry'].setValue(this.editData.validity);

      this.addVisa.controls['visaType'].setValue(this.editData.visa_type);

      this.addVisa.controls['noOfEntries'].setValue(
        this.editData.no_of_entries
      );

      this.addVisa.controls['invitationFrom'].setValue(
        this.editData.invitation_from
      );

      this.addVisa.controls['ticketGiven'].setValue(this.editData.ticket);

      this.addVisa.controls['insurance'].setValue(this.editData.insurance);

      this.addVisa.controls['finacialPapers'].setValue(this.editData.fin_paper);

      this.addVisa.controls['remark'].setValue(this.editData.remark);
    }
    if (this.view) {
      this.addVisa.disable();
    }
  }

  onChange(value: any, formControl: any) {
    if (formControl === 'companyName') {
      console.log(value);
      this.addVisa.controls[formControl].setValue(value.company_name);
    }

    if (formControl === 'visaName') {
      console.log(value);
      this.addVisa.controls[formControl].setValue(
        value.emp_name + ' ' + value?.lastname
      );
    }

    if (formControl === 'debitedTo') {
      console.log(value);
      this.addVisa.controls[formControl].setValue(value.company_name);
    }
    if (formControl === 'country') {
      console.log(value);
      this.addVisa.controls[formControl].setValue(value.name);
    }
  }

  companyOptions: any;
  companyArr: any = [];
  nameOptions: any;
  nameArr: any = [];
  debitedToOptions: any;
  debitedToArr: any = [];

  countryOptions: any;
  countryArr: any = [];

  ngOnInit(): void {
    this.addVisa = this.formBuilder.group({
      companyName: ['', Validators.required],
      visaName: ['', Validators.required],
      debitedTo: ['', Validators.required],
      authorisedBy: ['', Validators.required],
      passedTo: ['', Validators.required],
      country: ['', Validators.required],
      dateOfApplication: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      dateOfExpiry: ['', Validators.required],
      visaType: ['', Validators.required],
      noOfEntries: ['', Validators.required],
      invitationFrom: ['', Validators.required],
      ticketGiven: ['', Validators.required],
      insurance: ['', Validators.required],
      finacialPapers: ['', Validators.required],
      remark: ['', Validators.required],
      uploadVisa: ['', Validators.required],
    });

    if (this.edit_visa) {
      console.log(this.editData);
    }

    if (this.view) {
      console.log(this.viewData);
    }

    this.companyOptions = this.addVisa.controls[
      'companyName'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.company_name;
        return name
          ? this._filterCompany(name as string)
          : this.companyArr.slice();
      })
    );

    this.nameOptions = this.addVisa.controls['visaName'].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.emp_name;
        return name ? this._filterName(name as string) : this.nameArr.slice();
      })
    );

    // this.debitedToOptions = this.addVisa.controls[
    //   'debitedTo'
    // ].valueChanges.pipe(
    //   startWith(''),
    //   map((value: any) => {
    //     const name = typeof value === 'string' ? value : value?.company_name;
    //     return name
    //       ? this._filterDebited(name as string)
    //       : this.debitedToArr.slice();
    //   })
    // );

    this.countryOptions = this.addVisa.controls['country'].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this._filtercountry(name as string)
          : this.countryArr.slice();
      })
    );

    this.getCompany();
    this.getvisaName();
    this.getCountry();
    // this.getDebited();
  }

  private _filterCompany(name: string): any[] {
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

  // private _filterDebited(name: string): any[] {
  //   const filterValue = name.toLowerCase();

  //   return this.debitedToArr.filter((option: any) =>
  //     option.company_name.toLowerCase().includes(filterValue)
  //   );
  // }

  private _filtercountry(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.countryArr.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  getCompany() {
    this._httpClient
      .get(environment?.apiKey + 'company')
      .subscribe((res: any) => {
        this.companyArr = res.data;
      });
  }

  getvisaName() {
    this._httpClient
      .get(environment?.apiKey + 'employee')
      .subscribe((res: any) => {
        this.nameArr = res.data;
      });
  }

  // getDebited() {
  //   this._httpClient
  //     .get(environment?.apiKey + 'company')
  //     .subscribe((res: any) => {
  //       this.debitedToArr = res.data;
  //     });
  // }

  getCountry() {
    this._httpClient
      .get(environment?.apiKey + 'location')
      .subscribe((res: any) => {
        this.countryArr = res.data;
      });
  }

  // @Input() check: boolean = false;
  // @Output() send_data = new EventEmitter<any>();

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes['check'].currentValue);
  //   this.check = changes['check'].currentValue;
  // }
  // close_form() {
  //   // this.isopen = false
  //   this.send_data.emit(this.check);
  // }
  closeForm() {
    this.closeEvent.emit(this.opens);
    this.addVisa.reset();
    this.opens = false;
    this.submitted = false;
  }

  get c() {
    return this.addVisa.controls;
  }

  clear(ctrl: any) {
    this.addVisa.controls[ctrl].setValue('');
  }

  onSubmit() {
    this.submitted = true;

    let body = {};
    body = {
      is_active: 1,
      created_at: '2023-06-28T05:42:12.732Z',
      id: 22,
      emp_id: '2',
      company_id: '1',
      com_debited: this.addVisa.controls['debitedTo'].value,
      visa_type: this.addVisa.controls['visaType'].value,
      applied_date: this.addVisa.controls['dateOfApplication'].value,
      issue_date: this.addVisa.controls['dateOfIssue'].value,
      validity: this.addVisa.controls['dateOfExpiry'].value,
      country: this.addVisa.controls['country'].value,
      fe_card: 'test',
      ticket: this.addVisa.controls['ticketGiven'].value,
      insurance: this.addVisa.controls['insurance'].value,
      fin_paper: this.addVisa.controls['finacialPapers'].value,
      remark: this.addVisa.controls['remark'].value,
      authorized_by: this.addVisa.controls['authorisedBy'].value,
      passed_to: this.addVisa.controls['passedTo'].value,
      no_of_entries: this.addVisa.controls['noOfEntries'].value,
      invitation_from: this.addVisa.controls['invitationFrom'].value,
      created_by: 'test',
    };

    this._httpClient
      .post(environment?.apiKey + 'employeevisa', body)
      .subscribe((res) => {
        console.log('successfull', res);
        this.addVisa.reset();
        this.submitted = false;
        this.closeForm();
      });
  }
  editRowData(ctrl: any) {
    this.addVisa.controls[ctrl].setValue('');
  }
}
