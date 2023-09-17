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
  selector: 'app-events-add',
  templateUrl: './events-add.component.html',
  styleUrls: ['./events-add.component.scss'],
})
export class EventsAddComponent implements OnInit, OnChanges {
  @Input() opens: boolean = false;
  event!: FormGroup;
  submitted = false;

  @Output() closeEvent = new EventEmitter();

  @Input() updateEvent: boolean = false;
  @Input() updateData: any;

  constructor(
    private _httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['opens']);

    if (this.updateEvent) {
      console.log(this.updateData);

      // add forex
      this.event.controls['eventName'].setValue(this.updateData.event_name);
      this.event.controls['description'].setValue(
        this.updateData.event_description
      );
    }
  }

  ngOnInit(): void {
    this.event = this.formBuilder.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get c() {
    return this.event.controls;
  }

  clear(ctrl: any) {
    this.event.controls[ctrl].setValue('');
  }

  closeForm() {
    this.closeEvent.emit(this.opens);
    this.event.reset();
    this.opens = false;
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;

    let body = {};

    body = {
      created_at: '2023-06-28T05:42:12.780Z',
      is_active: 1,
      event_id: 6,
      event_name: this.event.controls['eventName'].value,
      event_description: this.event.controls['description'].value,
      created_by: 'Sahil',
    };

    this._httpClient
      .post(environment?.apiKey + 'event', body)
      .subscribe((res) => {
        console.log('successfull', res);
        this.event.reset();
        this.submitted = false;
        this.closeForm();
      });
  }
}
