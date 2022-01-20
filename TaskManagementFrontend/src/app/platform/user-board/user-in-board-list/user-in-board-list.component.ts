import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Board } from '../../../model/board';
import { User } from '../../../model/user';
import { Userboard } from '../../../model/userboard';
import { UrlService } from '../../../service/url.service';
import { environment } from '../../../../environments/environment.prod';
import { AddEditUserInBoardComponent } from '../add-edit-user-in-board/add-edit-user-in-board.component';

@Component({
  selector: 'app-user-in-board-list',
  templateUrl: './user-in-board-list.component.html',
  styleUrls: ['./user-in-board-list.component.css']
})
export class UserInBoardListComponent implements OnInit {

  alreadyExist:boolean = false;
  loggedInUser = localStorage.getItem('userLogged');
  logUser: User = new User();
  userBoard:Userboard = new Userboard();

  users: User[] = [];
  board:Board = new Board();

  mouseX: any;
  mouseY: any;

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router,
              public dialogRef: MatDialogRef<UserInBoardListComponent>,  private dialog:MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {

    this.board = this.data.board;
    this.mouseX = this.data.mouseX;
    this.mouseY = this.data.mouseY;
    this.alreadyExist = this.data.alreadyExist;

    if(this.loggedInUser){
      this.logUser =  JSON.parse(this.loggedInUser);
    }
    else{
      this.router.navigate(['/login']);
    }

    this.getBoardForLoggedUser();
    this.getUsersFromBoard();
  }

  getBoardForLoggedUser(){
    this.httpClient.get<Userboard>(environment.baseUrl + environment.checkExistenceUserInBoardUrl.replace('{userId}/{boardId}', this.logUser.id.toString().concat("/")
      + this.board.id.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.userBoard = response;
      },
      error => {
        console.log(error);
      }
    )
  }


  getUsersFromBoard(){

    this.httpClient.get<User[]>(environment.baseUrl + environment.getUsersInBoardUrl.replace('{id}', this.board.id.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.users = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  onUsersListChanged() {
    this.getUsersFromBoard();
  }

  close() {
    this.dialogRef.close();
  }


  addUsersOnBoard(){

    const dialogRefAdd = this.dialog.open(AddEditUserInBoardComponent, {
      data: {board: this.board, isEditMode:false}});

    this.alreadyExist = true;

    dialogRefAdd.afterClosed().subscribe(result => {
      this.onUsersListChanged();
      this.alreadyExist = false;
    });
  }
}
