import {Component, OnInit} from '@angular/core';
import { CalendarView} from 'angular-calendar';
import {AssignedUsersOnTask} from "../../model/assignedusersontask";
import {environment} from "../../../environments/environment.prod";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../service/url.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";
import {CalendarEventKeys} from "../../model/calendareventkeys";
import {CalendarTaskComponent} from "./calendar-task/calendar-task.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentMonth: string = ''
  assignedUsersOnTasks: AssignedUsersOnTask[] = [];
  events: CalendarEventKeys[] = []
  loggedInUser = localStorage.getItem('userLogged');
  user:User = new User();

  constructor(private dialog:MatDialog, private httpClient: HttpClient, private router:Router,
              private urlService: UrlService) { }

  ngOnInit(): void {
    if(this.loggedInUser){
      this.user =  JSON.parse(this.loggedInUser);
    }
    else{
      this.router.navigate(['/login']);
    }
    this.currentMonth = this.months[Number(this.viewDate.toISOString().slice(5,7) )-1]
    this.getTasks();
  }

  getNewMonth(){
    this.currentMonth = this.months[Number(this.viewDate.toISOString().slice(5,7) )-1]
  }

  getTasks() {
    this.httpClient.get<AssignedUsersOnTask[]>(environment.baseUrl + environment.getTasksForUserUrl.replace('{idUser}', this.user.id),
      this.urlService.getRequestOptions()).subscribe(
      response => {
        this.assignedUsersOnTasks = response;
        this.createEvents();
      },
      error => {
        console.log(error);
      }
    )
  }


  createEvents(){
    for(let x of this.assignedUsersOnTasks)
    {
      let startDate, endDate;
      if(x.task.startDate == null){
        startDate = endDate = new Date(x.task.endDate)
      }
      else{
        startDate = new Date(x.task.startDate)
        endDate = new Date(x.task.endDate)
      }
      this.events = [
        ...this.events,
        {
          start: startDate, end: endDate, title:x.task.title,  assignedUsersOnTask: x
        }
      ]
    }
  }

  eventClicked(event:any): void {
    this.dialog.open(CalendarTaskComponent, {
      hasBackdrop: true,
      data: {showingEvent: event}});
  }

}
