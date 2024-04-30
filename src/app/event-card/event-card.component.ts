import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule} from '@angular/common';
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  
  constructor(){
}
@Input() index: number = 0;
@Input() title: string = "";
@Input() desc: string = "";
@Input() startdate: string = "";
@Input() enddate: string = "";
@Input() ticketOrdered: number = 0;
@Output() EditIndex = new EventEmitter<number>();
@Output() CancelIndex = new EventEmitter<number>();
edit(){
  this.EditIndex.emit(this.index);
}
cancel(){
  this.CancelIndex.emit(this.index);
}
}
