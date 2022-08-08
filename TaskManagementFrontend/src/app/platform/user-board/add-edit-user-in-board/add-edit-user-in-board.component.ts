import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Board } from '../../../model/board';
import { User } from '../../../model/user';
import { UserBoard } from '../../../model/userboard';
import { UrlService } from '../../../service/url.service';
import { environment } from '../../../../environments/environment.prod';
import { Inbox } from 'src/app/model/inbox';

@Component({
  selector: 'app-add-edit-user-in-board',
  templateUrl: './add-edit-user-in-board.component.html',
  styleUrls: ['./add-edit-user-in-board.component.css']
})
export class AddEditUserInBoardComponent implements OnInit {

  isEditMode: boolean = false;
  board:Board = new Board();
  userBoard:UserBoard = new UserBoard();
  emptyEmail:boolean = false;
  user:User = new User();
  userRole:string = 'simpleUser';
  userNotExist: boolean = false;

  oldRole: string = ' ';

  loggedInUser = localStorage.getItem('userLogged');
  logUser: User = new User();

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router,
              public dialogRef: MatDialogRef<AddEditUserInBoardComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.isEditMode = this.data.isEditMode;
    if(!this.isEditMode) {
      this.board = this.data.board;
    }
    else{
      this.board = this.data.board;
      this.user = this.data.user;
      this.getUserBoardForEditedUser();
    }
    if(this.loggedInUser){
      this.logUser =  JSON.parse(this.loggedInUser);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  onSubmit(addEditUserForm : NgForm) {
    if (!addEditUserForm.valid) {
      if (addEditUserForm.form.value.email == '') {
        this.emptyEmail = true;
      }
      return;
    }

    if (!this.isEditMode) {
      this.addUser(addEditUserForm);
    } else {
      this.editUser(addEditUserForm);
    }
  }

  addUser(addEditUserForm : NgForm) {

    this.httpClient.get<User>(environment.baseUrl + environment.checkIfUserExistAndIsInBoard.replace('{email}/{boardId}', addEditUserForm.form.value.email.concat("/") + this.board.id.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        console.log(addEditUserForm.form.value.email.concat("/") + this.board.id.toString())
        if(response!=null){
          this.user = response;
          this.createUserBoard()
          this.userNotExist = false;
        }
        else{
          this.userNotExist = true;
          return;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  createUserBoard(){
    this.userBoard.user = this.user;
    this.userBoard.board = this.board;
    this.userBoard.userType = this.userRole;
    this.userBoard.userAdditionDate = new Date().toISOString().slice(0, 10);

    this.httpClient.post(environment.baseUrl + environment.saveBoardUrl,  this.userBoard, this.urlService.getRequestOptions()).subscribe(
      response => {
        if (response != null) {
          console.log("User successfully added.");
          this.sendMessageToAddUser(this.user)
          this.close();
        } else {
          return;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  editUser(addEditUserForm : NgForm){
    this.oldRole = this.userBoard.userType;
    this.userBoard.userType = this.userRole;
    this.httpClient.put(environment.baseUrl + environment.updateUserRoleUrl, this.userBoard,
      this.urlService.getRequestOptions())
      .subscribe(
        () => {
          this.sendMessageToEditUser();
          console.log("User successfully updated.");
          this.close();
        },
        error => {
          console.log(error);
        })
  }

  getUserBoardForEditedUser(){
    console.log(this.board.id.toString())
    this.httpClient.get<UserBoard>(environment.baseUrl + environment.checkExistenceUserInBoardUrl.replace('{userId}/{boardId}', this.user.id.toString().concat("/")
      + this.board.id.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.userBoard = response;
        this.userRole = this.userBoard.userType;
      },
      error => {
        console.log(error);
      }
    )

  }

  close() {
    this.dialogRef.close();
  }

  onUserRoleChange(userRole:string){
    this.userRole = userRole;
  }

  sendMessageToAddUser(userAdded:User) {
    const transientInbox = new Inbox();

    transientInbox.user = userAdded;
    transientInbox.sendDate = new Date().toISOString();
    transientInbox.seen = false;
    transientInbox.message = "User " + this.logUser.name + " with email " + this.logUser.email + " added you on board " + this.board.name + ".";

    this.httpClient.post(environment.baseUrl + environment.addInboxMessageUrl, transientInbox, this.urlService.getRequestOptions()).subscribe(
      response => {
        console.log(this.userBoard)
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

  sendMessageToEditUser() {
    const transientInbox = new Inbox();

    transientInbox.user = this.user;
    transientInbox.sendDate = new Date().toISOString();
    transientInbox.seen = false;
    transientInbox.message = "Your role in the board " + this.board.name + " has changed from " + this.oldRole + " to " + this.userBoard.userType + ".";

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
