// import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ViewChild,
  AfterViewInit,
  Input,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatSort,
  MatSortModule,
  Sort,
  SortDirection,
} from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-custom-mat-table',
  templateUrl: './custom-mat-table.component.html',
  styleUrls: ['./custom-mat-table.component.scss'],
})
export class CustomMatTableComponent implements OnInit {
  data: any = new MatTableDataSource<Element>();
  columnNames: any = [];

  @Input()
  headerCols!: any;

  @Input() tabelData = [];

  @Output() uploadInvoice = new EventEmitter();
  @Output() editInvoice = new EventEmitter();
  @Output() viewInvoice = new EventEmitter();
  @Output() downloadInvoice = new EventEmitter();

  @Output() updateForex = new EventEmitter();

  @Output() updateAccessControle = new EventEmitter();

  @Output() updateEVENTS = new EventEmitter();
  @Output() deleteEVENTS = new EventEmitter();

  @Output() editPassenger = new EventEmitter();
  @Output() viewPassenger = new EventEmitter();

  @Output() editCompany = new EventEmitter();
  @Output() viewCompany = new EventEmitter();

  @Output() editVisa = new EventEmitter();
  @Output() viewVisa = new EventEmitter();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;
  row: any;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.data.data = this.tabelData;
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
  }

  ngOnInit() {
    for (const column of this.headerCols) {
      this.columnNames.push(column.name);
    }
  }

  upload_invoice(row: any) {
    this.uploadInvoice.emit(row);
  }

  edit_invoice(row: any) {
    this.editInvoice.emit(row);
  }

  view_invoice(row: any) {
    this.viewInvoice.emit(row);
  }

  download_invoice(row: any) {
    this.downloadInvoice.emit(row);
  }

  update_forex(row: any) {
    this.updateForex.emit(row);
  }

  update_Access(row: any) {
    this.updateAccessControle.emit(row);
  }

  update_Event(row: any) {
    this.updateEVENTS.emit(row);
  }

  deleteRow(row: any) {
    var delBtn = confirm(' Do you want to delete ?');
    if (delBtn == true) {
      this.row.splice(row);
    }
  }

  edit_passport(row: any) {
    this.editPassenger.emit(row);
  }

  view_passenger(row: any) {
    this.viewPassenger.emit(row);
  }

  edit_visa(row: any) {
    this.editVisa.emit(row);
  }

  view_visa(row: any) {
    this.viewVisa.emit(row);
  }
  // dummyData = [
  //   {
  //     debit_to: 'Diabos',
  //     company_name: 'CMT',
  //     emp_name: 'Faraz Khan',
  //     event: 'Official Visit',
  //     travel: 'MUM-DXB',
  //     from_date: '05-02-2023',
  //     to_date: '09-02-2023',
  //     authorized_by: 'Javed',
  //     passed_to: 'Firoz',
  //   },
  //   {
  //     debit_to: 'Ciabos',
  //     company_name: 'BMT',
  //     emp_name: 'Earaz Khan',
  //     event: 'Mfficial Visit',
  //     travel: 'OUM-DXB',
  //     from_date: '04-02-2023',
  //     to_date: '07-02-2023',
  //     authorized_by: 'Faved',
  //     passed_to: 'Giroz',
  //   },
  //   {
  //     debit_to: 'Biabos',
  //     company_name: 'AMT',
  //     emp_name: 'Daraz Khan',
  //     event: 'Official Visit',
  //     travel: 'KUM-DXB',
  //     from_date: '02-02-2023',
  //     to_date: '05-02-2023',
  //     authorized_by: 'Gaved',
  //     passed_to: 'Iiroz',
  //   },
  //   {
  //     debit_to: 'Aiabos',
  //     company_name: 'CMT',
  //     emp_name: 'Caraz Khan',
  //     event: 'Nfficial Visit',
  //     travel: 'JUM-DXB',
  //     from_date: '01-02-2023',
  //     to_date: '04-02-2023',
  //     authorized_by: 'Faved',
  //     passed_to: 'Hiroz',
  //   },
  //   {
  //     debit_to: 'Eiabos',
  //     company_name: 'EMT',
  //     emp_name: 'Baraz Khan',
  //     event: 'Pfficial Visit',
  //     travel: 'FUM-DXB',
  //     from_date: '06-02-2023',
  //     to_date: '03-02-2023',
  //     authorized_by: 'Javed',
  //     passed_to: 'kiroz',
  //   },
  //   {
  //     debit_to: 'Diabos',
  //     company_name: 'CMT',
  //     emp_name: 'Faraz Khan',
  //     event: 'Official Visit',
  //     travel: 'MUM-DXB',
  //     from_date: '05-02-2023',
  //     to_date: '09-02-2023',
  //     authorized_by: 'Javed',
  //     passed_to: 'Firoz',
  //   },
  //   {
  //     debit_to: 'Ciabos',
  //     company_name: 'BMT',
  //     emp_name: 'Earaz Khan',
  //     event: 'Mfficial Visit',
  //     travel: 'OUM-DXB',
  //     from_date: '04-02-2023',
  //     to_date: '07-02-2023',
  //     authorized_by: 'Faved',
  //     passed_to: 'Giroz',
  //   },
  //   {
  //     debit_to: 'Biabos',
  //     company_name: 'AMT',
  //     emp_name: 'Daraz Khan',
  //     event: 'Official Visit',
  //     travel: 'KUM-DXB',
  //     from_date: '02-02-2023',
  //     to_date: '05-02-2023',
  //     authorized_by: 'Gaved',
  //     passed_to: 'Iiroz',
  //   },
  //   {
  //     debit_to: 'Aiabos',
  //     company_name: 'CMT',
  //     emp_name: 'Caraz Khan',
  //     event: 'Nfficial Visit',
  //     travel: 'JUM-DXB',
  //     from_date: '01-02-2023',
  //     to_date: '04-02-2023',
  //     authorized_by: 'Faved',
  //     passed_to: 'Hiroz',
  //   },
  //   {
  //     debit_to: 'Eiabos',
  //     company_name: 'EMT',
  //     emp_name: 'Baraz Khan',
  //     event: 'Pfficial Visit',
  //     travel: 'FUM-DXB',
  //     from_date: '06-02-2023',
  //     to_date: '03-02-2023',
  //     authorized_by: 'Javed',
  //     passed_to: 'kiroz',
  //   },
  //   {
  //     debit_to: 'Diabos',
  //     company_name: 'CMT',
  //     emp_name: 'Faraz Khan',
  //     event: 'Official Visit',
  //     travel: 'MUM-DXB',
  //     from_date: '05-02-2023',
  //     to_date: '09-02-2023',
  //     authorized_by: 'Javed',
  //     passed_to: 'Firoz',
  //   },
  //   {
  //     debit_to: 'Ciabos',
  //     company_name: 'BMT',
  //     emp_name: 'Earaz Khan',
  //     event: 'Mfficial Visit',
  //     travel: 'OUM-DXB',
  //     from_date: '04-02-2023',
  //     to_date: '07-02-2023',
  //     authorized_by: 'Faved',
  //     passed_to: 'Giroz',
  //   },
  //   {
  //     debit_to: 'Biabos',
  //     company_name: 'AMT',
  //     emp_name: 'Daraz Khan',
  //     event: 'Official Visit',
  //     travel: 'KUM-DXB',
  //     from_date: '02-02-2023',
  //     to_date: '05-02-2023',
  //     authorized_by: 'Gaved',
  //     passed_to: 'Iiroz',
  //   },
  //   {
  //     debit_to: 'Aiabos',
  //     company_name: 'CMT',
  //     emp_name: 'Caraz Khan',
  //     event: 'Nfficial Visit',
  //     travel: 'JUM-DXB',
  //     from_date: '01-02-2023',
  //     to_date: '04-02-2023',
  //     authorized_by: 'Faved',
  //     passed_to: 'Hiroz',
  //   },
  //   {
  //     debit_to: 'Eiabos',
  //     company_name: 'EMT',
  //     emp_name: 'Baraz Khan',
  //     event: 'Pfficial Visit',
  //     travel: 'FUM-DXB',
  //     from_date: '06-02-2023',
  //     to_date: '03-02-2023',
  //     authorized_by: 'Javed',
  //     passed_to: 'kiroz',
  //   },
  // ];
}
