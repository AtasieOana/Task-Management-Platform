import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../service/url.service";
import {NavigationExtras, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CalendarEventKeys} from "../../../model/calendareventkeys";
import {AssignedUsersOnTask} from "../../../model/assignedusersontask";
import {Task} from "../../../model/task";
import {UserBoard} from "../../../model/userboard";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-calendar-task',
  templateUrl: './calendar-task.component.html',
  styleUrls: ['./calendar-task.component.css']
})
export class CalendarTaskComponent implements OnInit {

  event: CalendarEventKeys = {
    start: new Date(),
    end: new Date(),
    title:'',
    assignedUsersOnTask: new AssignedUsersOnTask()
  }
  assignedUsersOnTask: AssignedUsersOnTask = new AssignedUsersOnTask();
  task: Task = new Task();
  userBoard: UserBoard = new UserBoard();


  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router,
              public dialogRef: MatDialogRef<CalendarTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.event = this.data.showingEvent.event;
    this.assignedUsersOnTask = this.event['assignedUsersOnTask'];
    this.task = this.assignedUsersOnTask.task;
  }


  goToBoard(){
    this.httpClient.get<UserBoard>(environment.baseUrl + environment.getOrCreateUserBoardUrl.replace('{userId}/{boardId}', this.assignedUsersOnTask.user.id + '/' + this.task.taskList.board.id),
      this.urlService.getRequestOptions()).subscribe(
      response => {
        this.userBoard = response;
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "userBoardId": JSON.stringify(this.userBoard.id),
            "boardId": JSON.stringify(this.userBoard.board.id),
            "userId": JSON.stringify(this.userBoard.user.id)
          }
        };
        this.router.navigate(["/showBoard"],  navigationExtras);
      },
      error => {
        console.log(error);
      }
    )
  }

}
