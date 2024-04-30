import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule, CommonModule,NgClass],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  @Output() EventAdd = new EventEmitter<object>();
  @Input() event : {title : string; description : string; startdate : string; enddate : string; ticketOrdered : number;} = {title : '',description : '',startdate : '',enddate : '', ticketOrdered : 0};
  @Input() index : number = -1;
  error : string = "";
  onsubmit(f : NgForm,start : NgModel,end : NgModel){
    this.error = '';
    if(f.value.title.length < 10|| f.value.description.length < 20){
      this.error = "Maintain Minimum Length";
    }
    console.log(f.value.ticketOrdered);
  if(f.value.title == ''|| f.value.description == '' || f.value.ticketOrdered.length == 0){
    this.error = "All Fields are Required";
  }
    if(start.valid && end.valid ){
    let startdateParts = f.value.startdate.split("-");
    // month is 0-based, that's why we need dataParts[1] - 1
    let startdate = new Date(+startdateParts[2], +startdateParts[1] - 1, +startdateParts[0]);
    let enddateParts = f.value.enddate.split("-");
    // month is 0-based, that's why we need dataParts[1] - 1
    let enddate = new Date(+enddateParts[2], +enddateParts[1] - 1, +enddateParts[0]); 
    if((startdate.getFullYear() == startdateParts[2] && startdate.getMonth() == (startdateParts[1]-1) && startdate.getDate() == startdateParts[0])&&(enddate.getFullYear() == enddateParts[2] && enddate.getMonth() == (enddateParts[1]-1) && enddate.getDate() == enddateParts[0])&&(startdate<enddate)){
    if(this.error == ''){  
    let eventOrg : {title : string; description : string; startdate : string; enddate : string; ticketOrdered : number;} = {title : f.value.title,
      description : f.value.description,
      startdate : f.value.startdate,
      enddate : f.value.enddate,
      ticketOrdered : f.value.ticketOrdered
    };
    this.EventAdd.emit(eventOrg);
  }
  }else{
    this.error = "Start Date or End Date not Exist";
  }
    }else{
      this.error = "Start Date and End Date must be in the format dd-mm-yyyy"
    }
    
  }
}
