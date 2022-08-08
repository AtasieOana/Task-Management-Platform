import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tasklist } from 'src/app/model/tasklist';
import { UserBoard } from 'src/app/model/userboard';
import { environment } from 'src/environments/environment.prod';
import { CreateEditTaskListComponent } from '../create-edit-task-list/create-edit-task-list.component';

@Component({
  selector: 'app-show-task-list',
  templateUrl: './show-task-list.component.html',
  styleUrls: ['./show-task-list.component.css']
})
export class ShowTaskListComponent implements OnInit {

  @Input() taskList:Tasklist = new Tasklist();
  @Input() userBoard:UserBoard = new UserBoard();
  @Input() alreadyExist:boolean = false;
  @Output() tasksListChanged = new EventEmitter();

  constructor(public httpClient:HttpClient, private dialog:MatDialog) { }

  ngOnInit(): void {
  }


  deleteTaskList() {
    if(!this.alreadyExist) {
      this.httpClient.delete(environment.baseUrl + environment.deleteTaskListUrl.replace('{id}', this.taskList.id + '')).subscribe(
        () => {
          this.tasksListChanged.next();
          this.alreadyExist = true;
          console.log("Task list was deleted")
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  editTaskList() {
    if (!this.alreadyExist) {

      const dialogRef = this.dialog.open(CreateEditTaskListComponent, {
        hasBackdrop: true,
        data: {taskList: this.taskList, isEditMode: true}
      });

      this.alreadyExist = true;

      dialogRef.afterClosed().subscribe(() => {
        this.alreadyExist = false;
        this.tasksListChanged.next();
      });
    }
  }

}
