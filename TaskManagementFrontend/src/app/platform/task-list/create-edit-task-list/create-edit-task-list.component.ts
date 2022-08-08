import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Board } from 'src/app/model/board';
import { Tasklist } from 'src/app/model/tasklist';
import { User } from 'src/app/model/user';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-create-edit-task-list',
  templateUrl: './create-edit-task-list.component.html',
  styleUrls: ['./create-edit-task-list.component.css']
})
export class CreateEditTaskListComponent implements OnInit {

  taskList: Tasklist = new Tasklist();
  isEditMode: boolean = false;

  user:User = new User();
  board:Board = new Board();

  emptyName:boolean = false;

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router,
              public dialogRef: MatDialogRef<CreateEditTaskListComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.isEditMode = this.data.isEditMode;
    if(!this.isEditMode) {
      this.user = this.data.user;
      this.board = this.data.board;
    }
    else{
      this.taskList = this.data.taskList;
    }
  }

  onSubmit(createEditTaskListForm : NgForm) {
    if (!createEditTaskListForm.valid) {
      if (createEditTaskListForm.form.value.new == '') {
        this.emptyName = true;
      }
      return;
    }

    if (!this.isEditMode) {
      this.addList(createEditTaskListForm);
    } else {
      this.editList(createEditTaskListForm);
    }
  }

  addList(createEditTaskListForm : NgForm) {

      const transientTaskList = new Tasklist();
      transientTaskList.name = createEditTaskListForm.form.value.new;
      transientTaskList.createDate = new Date().toISOString();
      transientTaskList.user = this.user;
      transientTaskList.board = this.board;

      this.httpClient.post(environment.baseUrl + environment.saveTaskListUrl, transientTaskList, this.urlService.getRequestOptions()).subscribe(
        response => {
          console.log("Task list successfully saved.");
          this.close();
        },
        error => {
          console.log(error);
        }
      )
  }

  editList(createEditTaskListForm : NgForm){
      const transientTaskList = new Tasklist();
      transientTaskList.name = createEditTaskListForm.form.value.new;
      transientTaskList.createDate = this.taskList.createDate;
      transientTaskList.user = this.taskList.user;
      transientTaskList.board = this.taskList.board;

      this.httpClient.put(environment.baseUrl + environment.updateTaskListUrl.replace('{id}', this.taskList.id + ''), transientTaskList,
        this.urlService.getRequestOptions())
        .subscribe(
          response => {
            console.log("Task list successfully updated.");
            this.close();
          },
          error => {
            console.log(error);
          })
    }

  close() {
    this.dialogRef.close();
  }

}
