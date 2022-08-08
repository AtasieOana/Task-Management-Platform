import { Component, Input, OnInit } from '@angular/core';
import {NavigationExtras, Router } from '@angular/router';
import { UserBoard } from 'src/app/model/userboard';

@Component({
  selector: 'app-show-board-in-list',
  templateUrl: './show-board-in-list.component.html',
  styleUrls: ['./show-board-in-list.component.css']
})
export class ShowBoardInListComponent implements OnInit {

  @Input() userBoard:UserBoard= new UserBoard();


  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  getBackgroundColor(){
    return this.userBoard.board.backgroundColor;
  }

  openBoard(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "userBoardId": JSON.stringify(this.userBoard.id),
        "boardId": JSON.stringify(this.userBoard.board.id),
        "userId": JSON.stringify(this.userBoard.user.id)
      }
    };
    this.router.navigate(["/showBoard"],  navigationExtras);
  }

}
