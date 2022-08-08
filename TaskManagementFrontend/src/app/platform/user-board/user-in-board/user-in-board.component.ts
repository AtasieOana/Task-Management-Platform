import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../../../model/user';
import { UserBoard } from '../../../model/userboard';
import { UrlService } from '../../../service/url.service';
import { environment } from '../../../../environments/environment.prod';
import { AddEditUserInBoardComponent } from '../add-edit-user-in-board/add-edit-user-in-board.component';
import { Inbox } from 'src/app/model/inbox';
import {UserWorkspace} from "../../../model/userworkspace";

@Component({
  selector: 'app-user-in-board',
  templateUrl: './user-in-board.component.html',
  styleUrls: ['./user-in-board.component.css']
})
export class UserInBoardComponent implements OnInit {

  userBoardForShowUser: UserBoard = new UserBoard();

  @Input() userShow: User = new User();
  @Input() alreadyExist: boolean = false;
  @Input() userBoardLoggedUser: UserBoard = new UserBoard();
  @Input() userWorkspaceForLoggedUser: UserWorkspace = new UserWorkspace();

  @Output() userListChanged = new EventEmitter();

  userIsAdmin: boolean = false;
  isInBoard: boolean = false;

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if(this.userBoardLoggedUser.userType == 'admin' && this.userBoardLoggedUser.user.email != this.userShow.email)
      this.userIsAdmin = true;

    this.getUserBoardForEditedUser();
  }

  deleteUser() {
    this.httpClient.delete(environment.baseUrl + environment.deleteUserBoardUrl.replace('{id}', this.userBoardForShowUser.id + '')).subscribe(
      () => {
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
    this.httpClient.get<UserBoard>(environment.baseUrl + environment.checkExistenceUserInBoardUrl.replace('{userId}/{boardId}', this.userShow.id + '/'
      + this.userBoardLoggedUser.board.id), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.userBoardForShowUser = response;
        this.isInBoard = this.userBoardForShowUser != null;
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

      dialogRefAdd.afterClosed().subscribe(() => {
        this.userListChanged.next();
        this.alreadyExist = false;
      });
    }
  }

  addUser() {
    this.httpClient.get<UserBoard>(environment.baseUrl + environment.getOrCreateUserBoardUrl.replace('{userId}/{boardId}', this.userShow.id + '/' + this.userBoardLoggedUser.board.id),
      this.urlService.getRequestOptions()).subscribe(
      response => {
          this.userShow = response.user;
          this.userBoardForShowUser = response;
          this.isInBoard = this.userShow != null;
      },
      error => {
        console.log(error);
      }
    )
  }

  sendMessageToDeletedUser(userDeleted:User) {

    const transientInbox = new Inbox();

    transientInbox.user = userDeleted;
    transientInbox.sendDate = new Date().toISOString();
    transientInbox.seen = false;
    transientInbox.message = "User " + this.userBoardLoggedUser.user.name + " with email " + this.userBoardLoggedUser.user.email + " removed you from board " + this.userBoardLoggedUser.board.name + ".";

    this.httpClient.post(environment.baseUrl + environment.addInboxMessageUrl, transientInbox, this.urlService.getRequestOptions()).subscribe(
      response => {
        console.log(this.userBoardLoggedUser)
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
