import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() StatusChange = new EventEmitter<string>();
  @Input() default : string = 'all';
  ongoing(){
    this.StatusChange.emit("ongoing");
    this.default = "ongoing";
  }
  upcoming(){
    this.StatusChange.emit("upcoming");
    this.default = "upcoming";
  }
  past(){
    this.StatusChange.emit("past");
    this.default = "past";
  }
  all(){
    this.StatusChange.emit("all");
    this.default = "all";
  }
}
