import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { EventsAddComponent } from '../events-add/events-add.component';

@Component({
  selector: 'app-events-home',
  templateUrl: './events-home.component.html',
  styleUrls: ['./events-home.component.scss'],
})
export class EventsHomeComponent {
  pageOpenClicked: boolean = false;
  dialog: any;
  row: any;

  constructor(private _httpClient: HttpClient, private fb: FormBuilder) {}

  receivedEvent(event: any) {
    this.pageOpenClicked = false;
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(EventsAddComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  openEvent() {
    this.pageOpenClicked = true;
  }

  ngOnInit(): void {
    this.getTableData();
  }

  tableData: any;
  loading: boolean = false;

  hederColumns: any = [
    { displayName: 'Event Name', name: 'event_name' },
    { displayName: 'Description', name: 'event_description' },
    { displayName: 'Action ', name: 'eventAction' },
  ];

  getTableData() {
    this.loading = true;
    this._httpClient
      .get(environment?.apiKey + 'event/')
      .subscribe((res: any) => {
        this.tableData = res.data;
        this.loading = false;
      });
  }

  deleteEvent: boolean = false;
  deleteEventData: any;

  updateEvent: boolean = false;
  updateEventData: any;

  updateEVENTS(event: any) {
    this.updateEvent = true;
    this.pageOpenClicked = true;
    this.updateEventData = event;
  }

  deleteEVENTS(event: any) {
    this.deleteEvent = true;
    this.deleteEventData = event;
  }

  // deleteRow(row: any) {
  //   var delBtn = confirm(' Do you want to delete ?');
  //   if (delBtn == true) {
  //     this.row.splice(row);
  //   }
  // }
}
