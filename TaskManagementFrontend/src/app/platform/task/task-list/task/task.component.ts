import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignedUsersOnTask } from 'src/app/model/assignedusersontask';
import { Task } from 'src/app/model/task';
import { Tasklist } from 'src/app/model/tasklist';
import { User } from 'src/app/model/user';
import { UserBoard } from 'src/app/model/userboard';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';
import { AddEditTaskComponent } from '../../add-edit-task/add-edit-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task:Task = new Task();
  @Output() taskListChanged = new EventEmitter();
  @Input() userBoard:UserBoard = new UserBoard();
  @Input() taskList:Tasklist = new Tasklist();
  users: User[] = [];
  dateMessage:string = '';

  constructor(public httpClient:HttpClient, private dialog:MatDialog, private urlService: UrlService) { }

  ngOnInit(): void {
    this.getAssignedUsers()

    let currentDate = new Date(new Date().toISOString().slice(0, 10));

    let diffMs, diffDays, diffHrs;

    if(this.task.endDate != null){

      let endDate = new Date(this.task.endDate);

      if(currentDate < endDate){
        diffMs = endDate.valueOf() - currentDate.valueOf();
        diffDays = Math.floor(diffMs / 86400000);
        diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        this.dateMessage = "There are " + diffDays + " days, " + diffHrs + " hours left until the end date."
      }
      else{
        diffMs = currentDate.valueOf() - endDate.valueOf();
        diffDays = Math.floor(diffMs / 86400000);
        diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        this.dateMessage = "The end date has been reached for " + diffDays + " days, " + diffHrs + " hours.";
      }
    }

    if(this.task.startDate != null){

      let startDate = new Date(this.task.startDate);
      if(currentDate < startDate) {
        diffMs = startDate.valueOf() - currentDate.valueOf();
        diffDays = Math.floor(diffMs / 86400000);
        diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        this.dateMessage = "There are " + diffDays + " days, " + diffHrs + " hours left until the start date."
      }
    }
  }

  deleteTask() {
    this.httpClient.delete(environment.baseUrl + environment.deleteTaskUrl.replace('{id}', this.task.id + '')).subscribe(
      () => {
        this.taskListChanged.next();
      },
      error => {
        console.log(error);
      }
    )
  }

  editTask(event:any) {
    const dialogRef = this.dialog.open(AddEditTaskComponent, {
      hasBackdrop: true,
      data: {task: this.task, isEditMode: true, userBoard: this.userBoard, taskList: this.taskList,
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.taskListChanged.next();
    });
  }

  getAssignedUsers(){
    this.httpClient.get<AssignedUsersOnTask[]>(environment.baseUrl + environment.getAssignedUsersUrl.replace('{taskId}', this.task.id.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        for(let i = 0; i < response.length; i++) {
          this.users.push(response[i].user);
        }
      },
      error => {
        console.log(error);
      }
    )
  }
}
