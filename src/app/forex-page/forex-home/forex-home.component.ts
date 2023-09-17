import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forex-home',
  templateUrl: './forex-home.component.html',
  styleUrls: ['./forex-home.component.scss'],
})
export class ForexHomeComponent {
  pageOpenClicked: boolean = false;
  searchForex!: FormGroup;

  constructor(private _httpClient: HttpClient, private fb: FormBuilder) {}

  openForex() {
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

  hederColumns: any = [
    { displayName: 'Vendor Name', name: 'vendor_name' },
    { displayName: 'Name', name: 'traveler_name' },
    { displayName: 'Visiting Country', name: 'country' },
    { displayName: 'Exchange Date', name: 'exchange_date' },
    { displayName: 'Bank Name', name: 'bank_name' },
    { displayName: 'Action ', name: 'forexaction' },
  ];

  getTableData() {
    this.loading = true;
    this._httpClient
      .get(environment?.apiKey + 'forex')
      .subscribe((res: any) => {
        this.tableData = res.data;
        this.loading = false;
      });
  }

  update: boolean = false;
  updateRowData: any;

  updateForex(event: any) {
    this.update = true;
    this.pageOpenClicked = true;
    this.updateRowData = event;
  }

  // applyFilter() {
  //   this.tableData.filter = this.hederColumns.trim().toLowerCase();
  // }
}
