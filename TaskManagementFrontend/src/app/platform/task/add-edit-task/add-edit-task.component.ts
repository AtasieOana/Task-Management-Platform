import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignedUsersOnTask } from 'src/app/model/assignedusersontask';
import { Task } from 'src/app/model/task';
import { Tasklist } from 'src/app/model/tasklist';
import { User } from 'src/app/model/user';
import { UserBoard } from 'src/app/model/userboard';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';
import {Inbox} from "../../../model/inbox";

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css']
})
export class AddEditTaskComponent implements OnInit {

  @Input() task:Task = new Task();
  isEditMode: boolean = false;
  userBoard: UserBoard = new UserBoard();
  taskList: Tasklist = new Tasklist();
  emptyName:boolean = false;
  wrongDates:boolean = false;
  users: User[] = [];
  assignedUsers:User[] = [];
  assignedUsersInitial:User[] = [];
  taskAddedOrEdited: Task = new Task();
  lastIndex: number = 0;

  constructor(private httpClient: HttpClient, private urlService: UrlService, public dialogRef: MatDialogRef<AddEditTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {task: Task, isEditMode: boolean, userBoard: UserBoard, taskList: Tasklist, lastIndex:number}) { }

  ngOnInit(): void {
    this.isEditMode = this.data.isEditMode;
    this.userBoard = this.data.userBoard;

    this.taskList = this.data.taskList;
    this.lastIndex =  this.data.lastIndex;

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
    cloneTask.orderInList = this.data.task.orderInList;

    this.task = cloneTask;


    this.getUsersFromBoard();
    if(this.isEditMode) {
      this.getAssignedUsers();
    }
  }

  onSubmit(taskForm: NgForm) {
    if(!taskForm.valid){
      this.emptyName = taskForm.form.value.title == '';
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
      transientTask.createDate = new Date().toISOString();
      transientTask.orderInList = this.lastIndex;
    }

    transientTask.labelColor = taskForm.form.value.labelColor;
    transientTask.ownerUser = this.userBoard.user;
    transientTask.taskList = this.taskList;

    if(this.isEditMode) {
      this.httpClient.put(environment.baseUrl + environment.updateTaskUrl.replace('{id}', this.task.id + ''), transientTask, this.urlService.getRequestOptions())
        .subscribe(
          () => {
            console.log("Task successfully updated.");
            this.taskAddedOrEdited = transientTask;
            this.saveAssignments();
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
          this.taskAddedOrEdited = transientTask;
          console.log("Task successfully saved.");
          this.saveAssignments();
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
    if(!this.findUserSelected(user, this.assignedUsers)) {
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
        for(let i = 0; i<response.length; i++) {
          this.assignedUsersInitial.push(response[i].user);
          this.assignedUsers.push(response[i].user);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  findUserSelected(user:User, list:User[]){
    for(let i = 0; i<list.length; i++){
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

    this.httpClient.post(environment.baseUrl + environment.assignUserOnTaskUrl, transientAsgn, this.urlService.getRequestOptions()).subscribe(
      () => {
        console.log("User assigned successfully.");
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteAssignUsers(user:User){
    this.httpClient.delete(environment.baseUrl + environment.deleteAssignment.replace('{taskId}/{userId}',
      this.task.id.toString().concat("/") + user.id.toString())).subscribe(
      () => {
        console.log("All assigns was deleted")
      },
      error => {
        console.log(error);
      }
    )
  }

  async saveAssignments() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.findUserSelected(this.users[i], this.assignedUsers) && !this.findUserSelected(this.users[i], this.assignedUsersInitial)) {
        this.assignUser(this.users[i]);
        await new Promise(resolve => setTimeout(resolve, 50));
        this.sendMessageToAssignedUser("addAssignment", this.users[i])
      }
      if (!this.findUserSelected(this.users[i], this.assignedUsers) && this.findUserSelected(this.users[i], this.assignedUsersInitial)) {
        this.deleteAssignUsers(this.users[i]);
        await new Promise(resolve => setTimeout(resolve, 300));
        this.sendMessageToAssignedUser("removeAssignment", this.users[i])
      }
      if (this.findUserSelected(this.users[i], this.assignedUsers) && this.findUserSelected(this.users[i], this.assignedUsersInitial)) {
        if (this.isEditMode && (this.task.title != this.taskAddedOrEdited.title || this.task.content != this.taskAddedOrEdited.content ||
          this.task.endDate != this.taskAddedOrEdited.endDate || this.task.startDate != this.taskAddedOrEdited.startDate)) {
          this.sendMessageToAssignedUser("updatedTask", this.users[i])
        }
      }
    }
  }

  sendMessageToAssignedUser(action : string, user:User){
    let message = "";
    if(action == "removeAssignment"){
        message = "User with email " +  this.userBoard.user.email + " removed your assignment from the task " + this.taskAddedOrEdited.title + " from board " + this.userBoard.board.name + ".";
    }
    else{
      if(action == "addAssignment"){
        message = "User with email " +  this.userBoard.user.email + " assigned you to the task " + this.taskAddedOrEdited.title + " from the board " + this.userBoard.board.name + ".";
      }
      else{
        message = "The task " + this.task.title + " from the board " + this.userBoard.board.name + " to which you are assigned was updated.";
      }
    }
    this.sendMessageToInbox(message, user)
  }

  sendMessageToInbox(message: string, user: User){
    const transientInbox = new Inbox();

    transientInbox.user = user;
    transientInbox.sendDate = new Date().toISOString();
    transientInbox.seen = false;
    transientInbox.message = message;

    this.httpClient.post(environment.baseUrl + environment.addInboxMessageUrl, transientInbox, this.urlService.getRequestOptions()).subscribe(
      response => {
        if (response != null) {
          console.log("Inbox message successfully added.");
        } else {
          return;
        }
      },
      error => {
        console.log(error);
      }
    )
  }
}
