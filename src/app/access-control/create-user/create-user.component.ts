import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  ɵFormControlCtor,
} from '@angular/forms';
import { EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit, OnChanges {
  createUser!: FormGroup;
  submitted = false;

  @Input() opens: boolean = false;
  @Output() closeEvent = new EventEmitter();

  @Input() updateAccess: boolean = false;
  @Input() updateData: any;

  constructor(
    private _httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes['opens']);

    if (this.updateAccess) {
      console.log(this.updateData);

      this.createUser.controls['userName'].setValue(this.updateData.username);

      this.createUser.controls['emailAddress'].setValue(
        this.updateData.email_id
      );
      this.createUser.controls['password'].setValue(this.updateData.password);
      this.createUser.controls['companyAccess'].setValue(
        this.updateData.company_name
      );
    }
  }
  onChange(value: any, formControl: any) {
    if (formControl === 'companyAccess') {
      console.log(value);
      this.createUser.controls[formControl].setValue(value.company_name);
    }
  }

  companyAccessOptions: any;
  companyAccessArr: any = [];

  ngOnInit(): void {
    this.createUser = this.formBuilder.group({
      userName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      companyAccess: ['', Validators.required],
      selector: ['', Validators.required],
      admin: ['', Validators.required],
      user: ['', Validators.required],
    });

    if (this.updateAccess) {
      console.log(this.updateData);
    }
    this.getcompanyAccess();

    this.companyAccessOptions = this.createUser.controls[
      'companyAccess'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.company_name;
        return name
          ? this._filterNames(name as string)
          : this.companyAccessArr.slice();
      })
    );
  }

  private _filterNames(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.companyAccessArr.filter((option: any) =>
      option.company_name.toLowerCase().includes(filterValue)
    );
  }

  getcompanyAccess() {
    this._httpClient
      .get(environment?.apiKey + 'company')
      .subscribe((res: any) => {
        this.companyAccessArr = res.data;
      });
  }

  get c() {
    return this.createUser.controls;
  }

  onSubmit() {
    this.submitted = true;
    let body = {};
    body = {
      userid: 3,
      username: this.createUser.controls['userName'].value,
      password: this.createUser.controls['password'].value,
      email_id: this.createUser.controls['emailAddress'].value,
      company_name: this.createUser.controls['companyAccess'].value,
      role_id: 1,
      company_id: 1,
      created_by: 'DEV',
      modified_at: null,
      modified_by: null,
      deleted_by: null,
      is_active: 1,
      is_admin: 0,
      created_at: '2023-05-19T10:18:35.000Z',
    };

    this._httpClient
      .post(environment?.apiKey + 'user/bulkCreate', body)
      .subscribe((res) => {
        console.log('successfull', res);
        this.createUser.reset();
        this.submitted = false;
        this.closeForm();
      });
    console.log(this.submitted);
  }

  clear(ctrl: any) {
    this.createUser.controls[ctrl].setValue('');
  }

  closeForm() {
    this.closeEvent.emit(this.opens);
    this.createUser.reset();
    this.opens = false;
    this.submitted = false;
  }

  updateAccessData(ctrl: any) {
    this.createUser.controls[ctrl].setValue('');
  }
}
