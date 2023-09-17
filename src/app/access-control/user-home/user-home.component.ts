import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent {
  pageOpenClicked: boolean = false;

  constructor(
    private _httpClient: HttpClient,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAccess() {
    this.pageOpenClicked = true;
  }
  receivedEvent(event: any) {
    this.pageOpenClicked = false;
  }

  ngOnInit(): void {
    this.getTableData();
  }
  tableData: any;
  loading: boolean = false;

  searchText;

  hederColumns: any[] = [
    { displayName: 'User Name', name: 'username' },
    { displayName: 'Email Address', name: 'email_id' },
    { displayName: 'Company Name', name: 'company_name' },
    { displayName: 'Action ', name: 'accessaction' },
  ];

  getTableData() {
    this.loading = true;
    this._httpClient.get(environment?.apiKey + 'user').subscribe((res: any) => {
      this.tableData = res.data;
      this.loading = false;
    });
  }

  updateAccess: boolean = false;
  updateAccessData: any;

  updateAccessControle(event: any) {
    this.updateAccess = true;
    this.pageOpenClicked = true;
    this.updateAccessData = event;
  }
}
