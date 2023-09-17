import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.scss'],
})
export class PassengerHomeComponent implements OnInit {
  data: any = new MatTableDataSource<Element>();
  pageOpenClicked: boolean = false;

  p: number = 1;

  constructor(private _httpClient: HttpClient) {}

  @Output() editPassenger = new EventEmitter();

  isLoading = false;
  openPassenger() {
    this.pageOpenClicked = true;
  }

  // ngAfterViewInit() {
  //   this.employeeData.paginator = this.paginator;
  // }

  ngOnInit(): void {
    this.getTableData();
  }

  ngOnDestroy() {
    if (this.employeeData) {
      this.employeeData.disconnect();
    }
  }

  edit_Passenger(employee: any) {
    this.editPassenger.emit(employee);
  }
  tableData: any;
  loading: boolean = false;

  searchText;
  employeeData: any = [];

  getTableData() {
    this.loading = true;
    this._httpClient
      .get(environment?.apiKey + 'employee')
      .subscribe((res: any) => {
        this.employeeData = res.data;
        this.loading = false;
      });
  }

  edit_passenger: boolean = false;
  editRowData: any;

  editVisa(event: any) {
    this.edit_passenger = true;
    this.pageOpenClicked = true;
    this.editRowData = event;
  }

  // view_visa(row: any) {
  //   this.editPassenger.emit(row);
  // }
}
