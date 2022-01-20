import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignedUsersOnTask } from 'src/app/model/assignedusersontask';
import { Task } from 'src/app/model/task';
import { Tasklist } from 'src/app/model/tasklist';
import { User } from 'src/app/model/user';
import { Userboard } from 'src/app/model/userboard';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css']
})
export class AddEditTaskComponent implements OnInit {

  @Input() task:Task = new Task();
  isEditMode: boolean = false;
  userBoard: Userboard = new Userboard();
  taskList: Tasklist = new Tasklist();
  emptyName:boolean = false;
  wrongDates:boolean = false;
  users: User[] = [];
  assignedUsers:User[] = [];
  assignedUsersIntial:User[] = [];

  constructor(private httpClient: HttpClient, private urlService: UrlService, public dialogRef: MatDialogRef<AddEditTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {task: Task, isEditMode: boolean, userBoard: Userboard, taskList: Tasklist}) { }

  ngOnInit(): void {
    this.isEditMode = this.data.isEditMode;
    this.userBoard = this.data.userBoard;
    this.taskList = this.data.taskList;

    const cloneTask = new Task();
    cloneTask.id = this.data.task.id;
    cloneTask.title = this.data.task.title;
    cloneTask.content = this.data.task.content;
    cloneTask.startDate = this.data.task.startDate;
    cloneTask.endDate = this.data.task.endDate;
    cloneTask.createDate = this.data.task.createDate;
    cloneTask.labelColor = this.data.task.labelColor;
    cloneTask.ownerUser = this.data.task.ownerUser;
    cloneTask.taskList = this.data.task.taskList;
    this.task = cloneTask;

    this.getUsersFromBoard();
    this.getAssignedUsers();
  }

  onSubmit(taskForm: NgForm) {
    if(!taskForm.valid){
      if(taskForm.form.value.title == ''){
        this.emptyName = true;
      }
      else{
        this.emptyName = false;
      }
      return;
    }

    this.compareDates(taskForm);
    if(this.wrongDates){
      return;
    }

    const transientTask = new Task();
    transientTask.title = taskForm.form.value.title;
    transientTask.content = taskForm.form.value.content;
    transientTask.startDate = taskForm.form.value.startDate;
    transientTask.endDate = taskForm.form.value.endDate;
    if(this.isEditMode) {
      transientTask.createDate = this.task.createDate;
    }
    else{
      transientTask.createDate = new Date().toISOString().slice(0, 10);
    }

    transientTask.labelColor = taskForm.form.value.labelColor;
    transientTask.ownerUser = this.userBoard.user;
    transientTask.taskList = this.taskList;

    console.log(transientTask);

    if(this.isEditMode) {
      this.httpClient.put(environment.baseUrl + environment.updateTaskUrl.replace('{id}', this.task.id + ''), transientTask, this.urlService.getRequestOptions())
        .subscribe(
          response => {
            console.log("Task successfully updated.");
            this.saveAssigments();
            this.close();
          },
          error => {
            console.log(error);
          }
          )
    } else {
      this.httpClient.post<Task>(environment.baseUrl + environment.saveTaskUrl, transientTask, this.urlService.getRequestOptions()).subscribe(
        response => {
          this.task = response;
          console.log("Task successfully saved.");
          this.saveAssigments();
          this.close();
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  close() {
    this.dialogRef.close();
  }


  compareDates(taskForm: NgForm) {
    let startDate = taskForm.form.value.startDate;
    let endDate = taskForm.form.value.endDate;
    if(startDate >= endDate && startDate && endDate) {
      this.wrongDates = true;
      return;
    }
    else {
      this.wrongDates = false;
      return;
    }
  }

  checkValues(user:User){
    if(this.findUserSelected(user, this.assignedUsers) == false) {
      this.assignedUsers.push(user);
    }
    else{
      this.assignedUsers = this.assignedUsers.filter(item => item.email !== user.email);
    }
  }

  getUsersFromBoard(){
    this.httpClient.get<User[]>(environment.baseUrl + environment.getUsersInBoardUrl.replace('{id}', this.userBoard.board.id.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.users = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  getAssignedUsers(){
    this.httpClient.get<AssignedUsersOnTask[]>(environment.baseUrl + environment.getAssignedUsersUrl.replace('{taskId}', this.task.id.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        for(var i = 0;i<response.length;i++) {
          this.assignedUsersIntial.push(response[i].user);
          this.assignedUsers.push(response[i].user);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  findUserSelected(user:User, list:User[]){
    for(var i = 0;i<list.length;i++){
      if (list[i].email == user.email){
        return true
      }
    }
    return false;
  }


  assignUser(user:User){
    let transientAsgn = new AssignedUsersOnTask();
    transientAsgn.task = this.task;
    transientAsgn.user = user;

    console.log(transientAsgn)

    this.httpClient.post(environment.baseUrl + environment.assignUserOnTaskUrl, transientAsgn, this.urlService.getRequestOptions()).subscribe(
      response => {
        console.log("User assigned succesfully.");
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteAssignUsers(user:User){
    this.httpClient.delete(environment.baseUrl + environment.deleteAssignment.replace('{taskId}/{userId}',
      this.task.id.toString().concat("/") + user.id.toString())).subscribe(
      response => {
        console.log("All assigns was deleted")
      },
      error => {
        console.log(error);
      }
    )
  }

  saveAssigments(){
    for(var i=0; i<this.users.length;i++){
      if(this.findUserSelected(this.users[i], this.assignedUsers) == true &&
        this.findUserSelected(this.users[i], this.assignedUsersIntial) == false){
        this.assignUser(this.users[i]);
      }
      if(this.findUserSelected(this.users[i], this.assignedUsers) == false &&
        this.findUserSelected(this.users[i], this.assignedUsersIntial) == true){
        this.deleteAssignUsers(this.users[i]);
      }
    }
  }
}
