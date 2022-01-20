import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {DialogPosition, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/task';
import { Tasklist } from 'src/app/model/tasklist';
import { Userboard } from 'src/app/model/userboard';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  @Input() userBoard:Userboard = new Userboard();
  @Input() taskList:Tasklist = new Tasklist();


  constructor(private dialog:MatDialog,private httpClient: HttpClient, private urlService: UrlService, private router:Router) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {

    this.httpClient.get<Task[]>(environment.baseUrl + environment.getTaskFromTaskListUrl.replace('{idTaskList}', this.taskList.id.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.tasks = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  onTaskListChanged() {
    this.getTasks();
  }


  addTask(event:any){
    const dialogRef = this.dialog.open(AddEditTaskComponent, {
      data: {task: new Task(), isEditMode: false, userBoard: this.userBoard, taskList: this.taskList,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTasks();
    });
  }

}
