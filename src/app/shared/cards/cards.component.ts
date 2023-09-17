import {
  Component,
  ViewChild,
  AfterViewInit,
  Input,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class CardsComponent {
  constructor(private _httpClient: HttpClient) {}

  @Input()
  cards!: any;
}
