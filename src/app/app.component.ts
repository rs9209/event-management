import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventCardComponent } from './event-card/event-card.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddEventComponent } from './add-event/add-event.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,EventCardComponent,SidebarComponent,AddEventComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  selected_event : {title : string; description : string; startdate : string; enddate : string; ticketOrdered : number;} = {title : '',description : '',startdate : '',enddate : '', ticketOrdered : 0};
  Updated_list_of_events : Array<{title : string; description : string; startdate : string; enddate : string; ticketOrdered : number;}> = Array();
  adding : boolean = false;
  current_index : number = -1;
  title = 'Event_Management';
  list_of_events : Array<{title : string; description : string; startdate : string; enddate : string; ticketOrdered : number;}> = Array();
  heading : string = "All Events";
  defaultside : string = 'all';
  constructor(){
    let list = localStorage.getItem('listOfEvents');
    if(list != null){
      this.list_of_events = JSON.parse(list);
    }else{
    this.list_of_events=[
      {
        title : "Howdy Modi!!",
        description : "Modi & Trump together on Stage. Let's Celebrate this Event with joy",
        startdate : "31-05-2024",
        enddate : "05-06-2024",
        ticketOrdered : 54
      },
      {
        title : "La Union Sangam!!",
        description : "Sangam Students performs together on Stage. Let's Celebrate this Event with joy",
        startdate : "28-04-2024",
        enddate : "05-05-2024",
        ticketOrdered : 123
      },
      {
        title : "Hidden Campaign!!",
        description : "Programmers from Hidden Talent performs together on Stage. Let's Celebrate this Event with joy",
        startdate : "31-03-2024",
        enddate : "05-04-2024",
        ticketOrdered : 89
      }
    ];
  }
    this.Updated_list_of_events = this.list_of_events;
  }
  onStatusChanged(name: string) {
    if(name == "ongoing"){
      this.heading = "Ongoing Events";
    }else if(name == "upcoming"){
      this.heading = "Upcoming Events";
    }else if(name == "past"){
      this.heading = "Past Events";
    }else if(name == "all"){
      this.heading = "All Events";
    }
    this.Updated_list_of_events  = Array();
    let today = new Date();
    this.list_of_events.forEach(element => {
      let startdateParts = element.startdate.split("-");
      // month is 0-based, that's why we need dataParts[1] - 1
      let startdate = new Date(+startdateParts[2], +startdateParts[1] - 1, +startdateParts[0]);
      let enddateParts = element.enddate.split("-");
      // month is 0-based, that's why we need dataParts[1] - 1
      let enddate = new Date(+enddateParts[2], +enddateParts[1] - 1, +enddateParts[0]);
      if(name=="all"){
        this.Updated_list_of_events.push(element); 
      }
      if(name=="ongoing"){
        
        if(startdate<today){
          if(enddate>today){
            this.Updated_list_of_events.push(element); 
          }
        }
      }
      if(name=="upcoming"){
        if(startdate>today){
          if(enddate>today){
            this.Updated_list_of_events.push(element); 
          }
        }
      }
      if(name=="past"){
        if(startdate<today){
          if(enddate<today){
            this.Updated_list_of_events.push(element); 
          }
        }
      }
    });
    }
  editIndex(i:number){
    this.selected_event = this.Updated_list_of_events[i];
    this.current_index = i;
    console.log(this.selected_event);
    this.adding = true;
  }
  ham_click : boolean = true;
  on_click(){
    
    this.ham_click = !this.ham_click;
    console.log(this.ham_click);
  }
  backHome(){
    this.adding = false;
    this.current_index = -1;
    
    this.defaultside = this.heading.split(" ")[0].toLowerCase();
  }
  AddEvent(){
    this.adding = true;
    this.current_index = -1;
    this.selected_event = {title : '',description : '',startdate : '',enddate : '', ticketOrdered : 0};
  }
  addEventWithData(e){
    if(this.current_index == -1){
    this.list_of_events.push(e);
    }else{
      this.list_of_events[this.list_of_events.indexOf(this.Updated_list_of_events[this.current_index])] = e;
    }
    this.defaultside = this.heading.split(" ")[0].toLowerCase();
    localStorage.setItem('listOfEvents',JSON.stringify(this.list_of_events));
    this.backHome();
  }
  compareObjects(obj1: any, obj2: any): boolean {
    for (const key in obj1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  
    return true;
  }  
  cancelEvent(i:number){
    const name = prompt("Are You Sure? Type Yes to Confirm Cancelling Event");
    if(name=="Yes"){
      alert("Confirmation Successful. Event with Title"+this.list_of_events[i].title+"Cancelled");
      this.list_of_events = this.list_of_events.filter(obj => !this.compareObjects(obj,this.Updated_list_of_events[i]));
      console.log(this.Updated_list_of_events[i]);
      
      localStorage.setItem('listOfEvents',JSON.stringify(this.list_of_events));
      this.onStatusChanged(this.heading.split(" ")[0].toLowerCase());
    }else{
      alert("Confirmation Unsuccessful");
    }
  }
}
