import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {NavigationExtras, Router } from '@angular/router';
import { Board } from 'src/app/model/board';
import { User } from 'src/app/model/user';
import { UserBoard } from 'src/app/model/userboard';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-show-template-in-list',
  templateUrl: './show-template-in-list.component.html',
  styleUrls: ['./show-template-in-list.component.css']
})
export class ShowTemplateInListComponent implements OnInit {

  @Input() board:Board= new Board();

  loggedInUser = localStorage.getItem('userLogged');
  user:User = new User();

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router) { }

  ngOnInit(): void {
    if(this.loggedInUser){
      this.user =  JSON.parse(this.loggedInUser);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  getBackgroundColor(){
    return this.board.backgroundColor;
  }

  openBoard() {

    const transientUserBoard = new UserBoard();

    transientUserBoard.user = this.user;
    transientUserBoard.board = this.board;
    transientUserBoard.userType = "viewer";
    transientUserBoard.userAdditionDate = new Date().toISOString().slice(0, 10);


    this.httpClient.post<UserBoard>(environment.baseUrl + environment.saveUserBoardIfNotExistsUrl,  transientUserBoard, this.urlService.getRequestOptions()).subscribe(
      response => {
        if (response != null) {
          let userBoard = response;

          let navigationExtras: NavigationExtras = {
            queryParams: {
              "userBoardId": JSON.stringify(userBoard.id),
              "boardId": JSON.stringify(userBoard.board.id),
              "userId": JSON.stringify(userBoard.user.id)
            }
          };
          this.router.navigate(["/showBoard"],  navigationExtras);
        }
        else {
          return;
        }
        },
      error => {
        console.log(error);
      }
      )
  }
}
