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
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.scss'],
})
export class CompanyAddComponent implements OnInit, OnChanges {
  newCompany!: FormGroup;
  submitted = false;
  @Output() closeEvent = new EventEmitter();
  @Input() edit_company: boolean = false;
  @Input() editData: any;

  @Input() view: boolean = false;
  @Input() viewData: any;

  @Input() opens: boolean = false;
  constructor(
    private _httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['opens']);

    if (changes['opens'].currentValue && !this.edit_company) {
      this.newCompany?.reset();
    }

    if (this.edit_company) {
      console.log(this.editData);

      this.newCompany.controls['companyName'].setValue(
        this.editData.company_name
      );

      this.newCompany.controls['cin'].setValue(this.editData.cin);
      // this.newCompany.controls['url'].setValue(this.editData.cin);
      // this.newCompany.controls['contactNumber'].setValue(this.editData.cin);
      this.newCompany.controls['companyAddress'].setValue(
        this.editData.company_address
      );
      this.newCompany.controls['gstin'].setValue(this.editData.gstin);
      this.newCompany.controls['pan'].setValue(this.editData.pan);
      this.newCompany.controls['tan'].setValue(this.editData.tan);
      this.newCompany.controls['companyLogo'].setValue(
        this.editData.company_logo
      );
      this.newCompany.controls['companyPhone'].setValue(this.editData.phone);
      this.newCompany.controls['companyWeb'].setValue(this.editData.website);
      // this.newCompany.controls['companyLocation'].setValue(this.editData.company_logo);
    }

    if (this.view) {
      this.newCompany.disable();
    }
  }

  ngOnInit(): void {
    this.newCompany = this.formBuilder.group({
      companyName: ['', Validators.required],
      cin: ['', Validators.required],
      url: ['', Validators.required],
      contactNumber: ['', Validators.required],
      companyAddress: ['', Validators.required],
      gstin: ['', Validators.required],
      pan: ['', Validators.required],
      tan: ['', Validators.required],
      // company information
      companyLogo: ['', Validators.required],
      companyPhone: ['', Validators.required],
      companyWeb: ['', Validators.required],
      companyLocation: ['', Validators.required],
    });

    if (this.edit_company) {
      console.log(this.editData);
    }

    if (this.view) {
      console.log(this.viewData);
    }
  }

  clear(ctrl: any) {
    this.newCompany.controls[ctrl].setValue('');
  }

  closeCompany() {
    this.closeEvent.emit(this.opens);
    this.newCompany.reset();
    this.opens = false;
    this.submitted = false;
  }

  get c() {
    return this.newCompany.controls;
  }

  onSubmit() {
    this.submitted = true;

    let body = {};

    body = {
      company_id: 36,
      parent_id: 1,
      parent_company_name: '',
      company_name: this.newCompany.controls['companyName'].value,
      company_address: this.newCompany.controls['companyAddress'].value,
      registered_add: '',
      company_logo: this.newCompany.controls['companyLogo'].value,
      company_registration: '',
      gstin: this.newCompany.controls['gstin'].value,
      pan: this.newCompany.controls['pan'].value,
      tan: this.newCompany.controls['tan'].value,
      cin: this.newCompany.controls['cin'].value,
      phone: this.newCompany.controls['companyPhone'].value,
      website: this.newCompany.controls['companyWeb'].value,
    };

    this._httpClient
      .post(environment?.apiKey + 'company', body)
      .subscribe((res) => {
        console.log('successfull', res);
        this.newCompany.reset();
        this.submitted = false;
        this.closeCompany();
      });
  }

  editRowData(ctrl: any) {
    this.newCompany.controls[ctrl].setValue('');
  }
}
