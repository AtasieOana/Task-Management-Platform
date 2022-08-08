import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../../../model/user';
import { UserBoard } from '../../../model/userboard';
import { UrlService } from '../../../service/url.service';
import { environment } from '../../../../environments/environment.prod';
import { AddEditUserInBoardComponent } from '../add-edit-user-in-board/add-edit-user-in-board.component';
import {UserWorkspace} from "../../../model/userworkspace";

@Component({
  selector: 'app-user-in-board-list',
  templateUrl: './user-in-board-list.component.html',
  styleUrls: ['./user-in-board-list.component.css']
})
export class UserInBoardListComponent implements OnInit {

  alreadyExist:boolean = false;
  loggedInUser = localStorage.getItem('userLogged');
  logUser: User = new User();
  userBoard:UserBoard = new UserBoard();

  users: User[] = [];

  mouseX: any;
  mouseY: any;

  userWorkspaceForLoggedUser: UserWorkspace = new UserWorkspace();


  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router,
              public dialogRef: MatDialogRef<UserInBoardListComponent>,  private dialog:MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {

    this.userBoard = this.data.userBoard;
    this.mouseX = this.data.mouseX;
    this.mouseY = this.data.mouseY;
    this.alreadyExist = this.data.alreadyExist;
    this.userWorkspaceForLoggedUser = this.data.userWorkspace;

    if(this.loggedInUser){
      this.logUser =  JSON.parse(this.loggedInUser);
    }
    else{
      this.router.navigate(['/login']);
    }

    if(this.userWorkspaceForLoggedUser.id == ''){
      this.getUsersFromBoard();
    }
    else{
      this.getUserFromWorkspace();
    }
  }

  getUsersFromBoard(){
    this.httpClient.get<User[]>(environment.baseUrl + environment.getUsersInBoardUrl.replace('{id}', this.userBoard.board.id), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.users = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  getUserFromWorkspace(){
    this.httpClient.get<User[]>(environment.baseUrl + environment.getAllUsersFromWorkspaceUrl.replace('{workspaceId}', this.userWorkspaceForLoggedUser.workspace.id),
      this.urlService.getRequestOptions()).subscribe(
      response => {
        this.users = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  onUsersListChanged() {
    if(this.userWorkspaceForLoggedUser.id == ''){
      this.getUsersFromBoard();
    }
    else{
      this.getUserFromWorkspace();
    }
  }

  close() {
    this.dialogRef.close();
  }

  addUsersOnBoard(){

    const dialogRefAdd = this.dialog.open(AddEditUserInBoardComponent, {
      hasBackdrop: true,
      data: {board: this.userBoard.board, isEditMode:false}});

    this.alreadyExist = true;

    dialogRefAdd.afterClosed().subscribe(() => {
      this.onUsersListChanged();
      this.alreadyExist = false;
    });
  }
}
