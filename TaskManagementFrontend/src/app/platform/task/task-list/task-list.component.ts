import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/model/task';
import { Tasklist } from 'src/app/model/tasklist';
import { UserBoard } from 'src/app/model/userboard';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';
import {DragDropShared} from "../../../service/drag-drop-shared.service";
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  @Input() userBoard:UserBoard = new UserBoard();
  @Input() taskList:Tasklist = new Tasklist();

  allTaskListsId: string[] = [];

  constructor(private dragDropService: DragDropShared, private dialog:MatDialog,private httpClient: HttpClient, private urlService: UrlService) { }

  ngOnInit(): void {
    this.getTasks();
    this.getTaskLists();
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
      hasBackdrop: true,
      data: {task: new Task(), isEditMode: false, userBoard: this.userBoard, taskList: this.taskList, lastIndex: this.tasks.length
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getTasks();
    });
  }

  onDrop(event: CdkDragDrop<Task[]>) {
    this.dragDropService.drop(event);
    this.updateTaskOrder(event.currentIndex, event.previousIndex, event.container.id);
  }

  private updateTaskOrder(currentIndex: number, previousIndex: number, taskListId: string){
     if(currentIndex != previousIndex || this.tasks[currentIndex].taskList.id != taskListId ){
        const transientTask = this.tasks[currentIndex];
        transientTask.orderInList = currentIndex;

        this.httpClient.put(environment.baseUrl + environment.changeTaskPositionUrl.replace("{taskList}", taskListId), transientTask, this.urlService.getRequestOptions())
          .subscribe(
            () => {
              this.getTasks();
            },
            error => {
              console.log(error);
            }
          )
      }
  }


  getTaskLists() {

    this.httpClient.get<Tasklist[]>(environment.baseUrl + environment.getTaskListsFromBoardUrl.replace('{idBoard}', this.userBoard.board.id), this.urlService.getRequestOptions()).subscribe(
      response => {
        for(let i = 0; i<response.length; i++){
          if(response[i].id != this.taskList.id)
            this.allTaskListsId.push(response[i].id);
        }
      },
      () => {
        console.log("Something went wrong when retrieving the task lists.")
      }
    )
  }


}
