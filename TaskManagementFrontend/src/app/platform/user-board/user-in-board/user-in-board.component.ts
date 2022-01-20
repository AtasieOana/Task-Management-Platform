import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Board } from '../../../model/board';
import { User } from '../../../model/user';
import { Userboard } from '../../../model/userboard';
import { UrlService } from '../../../service/url.service';
import { environment } from '../../../../environments/environment.prod';
import { AddEditUserInBoardComponent } from '../add-edit-user-in-board/add-edit-user-in-board.component';
import { Inbox } from 'src/app/model/inbox';

@Component({
  selector: 'app-user-in-board',
  templateUrl: './user-in-board.component.html',
  styleUrls: ['./user-in-board.component.css']
})
export class UserInBoardComponent implements OnInit {

  userBoardForShowUser: Userboard = new Userboard();

  @Input() userShow: User = new User();
  @Input() alreadyExist: boolean = false;
  @Input() userBoard: Userboard = new Userboard();

  @Output() userListChanged = new EventEmitter();

  userIsAdmin: boolean = false;
  editMode: boolean = false;
  initialUserType: string = "";


  constructor(private httpClient: HttpClient, private urlService: UrlService, private router: Router,
              private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    if(this.userBoard.userType == 'admin' && this.userBoard.user.email != this.userShow.email)
      this.userIsAdmin = true;
    this.getUserBoardForEditedUser();
  }

  deleteUser() {
    this.httpClient.delete(environment.baseUrl + environment.deleteUserBoardUrl.replace('{id}', this.userBoardForShowUser.id + '')).subscribe(
      response => {
        console.log("User "+ this.userBoardForShowUser.user.name + " was eliminated")
        this.sendMessageToDeletedUser(this.userBoardForShowUser.user);
        this.userListChanged.next();
      },
      error => {
        console.log(error);
      }
    )
  }

  getUserBoardForEditedUser(){
    this.httpClient.get<Userboard>(environment.baseUrl + environment.checkExistenceUserInBoardUrl.replace('{userId}/{boardId}', this.userShow.id.toString().concat("/")
      + this.userBoard.board.id.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.userBoardForShowUser = response;
      },
      error => {
        console.log(error);
      }
    )

  }

  editUserRole() {
    if (!this.alreadyExist) {
      const dialogRefAdd = this.dialog.open(AddEditUserInBoardComponent, {
        data: {user:this.userShow, board:this.userBoardForShowUser.board, isEditMode: true}
      });

      this.alreadyExist = true;

      dialogRefAdd.afterClosed().subscribe(result => {
        this.userListChanged.next();
        this.alreadyExist = false;
      });
    }
  }

  sendMessageToDeletedUser(userDeleted:User) {

    const transientInbox = new Inbox();

    transientInbox.user = userDeleted;
    transientInbox.sendDate = new Date().toISOString().slice(0, 10);
    transientInbox.seen = false;
    transientInbox.message = "User " + this.userBoard.user.name + " with email " + this.userBoard.user.email + " removed you from board " + this.userBoard.board.name + ".";

    console.log(transientInbox)

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

}
