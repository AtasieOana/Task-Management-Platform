import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Board } from 'src/app/model/board';
import { User } from 'src/app/model/user';
import { Userboard } from 'src/app/model/userboard';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';
import { CreateBoardComponent } from '../create-board/create-board.component';

@Component({
  selector: 'app-board-tab',
  templateUrl: './board-tab.component.html',
  styleUrls: ['./board-tab.component.css']
})
export class BoardTabComponent implements OnInit {

  userBoards: Userboard[] = [];
  alreadyExist:boolean = false;
  loggedInUser = localStorage.getItem('userLogged');
  user:User = new User();
  
  constructor(private dialog:MatDialog, private httpClient: HttpClient, private urlService: UrlService, private router:Router) { }

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards() {
    if(this.loggedInUser){
      this.user =  JSON.parse(this.loggedInUser);
    }
    else{
      this.router.navigate(['/login']);
    }


    this.httpClient.get<Userboard[]>(environment.baseUrl + environment.getBoardsOfUserUrl.replace('{email}', this.user.email), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.userBoards = response;
      },
      () => {
        console.log("Something went wrong when retrieving the list of boards.")
      }
    )
  }

  onBoardListChanged() {
    this.getBoards();
  }


  createBoard(){
    const dialogRef = this.dialog.open(CreateBoardComponent);

    this.alreadyExist = true;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getBoards();
      this.alreadyExist = false;
    });
  }

  ngOnDestroy(){
    this.dialog.closeAll();
  }

}
