import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss'],
  // standalone: true,
  // imports: [MatCardModule, MatButtonModule],
})
export class CompanyHomeComponent {
  pageOpenClicked: boolean = false;
  p: number = 1;

  constructor(private _httpClient: HttpClient) {}

  openCompany() {
    this.pageOpenClicked = true;
  }
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  searchText;
  tableData: any;
  loading: boolean = false;

  companyData: any = [];

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    this.loading = true;
    this._httpClient
      .get(environment?.apiKey + 'company')
      .subscribe((res: any) => {
        this.companyData = res.data;
        this.loading = false;
      });
  }

  edit_company: boolean = false;
  editRowData: any;

  editVisa(event: any) {
    this.edit_company = true;
    this.pageOpenClicked = true;
    this.editRowData = event;
  }

  view: boolean = false;

  viewRowData: any;

  viewVisa(event: any) {
    this.view = true;
    this.edit_company = true;
    this.pageOpenClicked = true;
    this.editRowData = event;
  }
}
