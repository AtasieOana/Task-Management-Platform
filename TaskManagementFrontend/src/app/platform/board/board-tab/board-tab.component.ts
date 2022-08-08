import { HttpClient } from '@angular/common/http';
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserBoard } from 'src/app/model/userboard';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';
import { CreateBoardComponent } from '../create-board/create-board.component';

@Component({
  selector: 'app-board-tab',
  templateUrl: './board-tab.component.html',
  styleUrls: ['./board-tab.component.css']
})
export class BoardTabComponent implements OnInit, OnChanges {

  userBoards: UserBoard[] = [];
  alreadyExist:boolean = false;
  loggedInUser = localStorage.getItem('userLogged');
  user:User = new User();
  searchText: string = "";
  @Input() workspaceId: string = '';
  @Input() userBoardsFromWorkspace: UserBoard[] = [];

  constructor(private dialog:MatDialog, private httpClient: HttpClient,
              private urlService: UrlService, private router:Router) { }

  ngOnInit(): void {
    localStorage.removeItem("userSignUp")
    if(this.loggedInUser){
      this.user =  JSON.parse(this.loggedInUser);
    }
    else{
      this.router.navigate(['/login']);
    }
    this.getBoards();
    this.reloadSearch();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.userBoardsFromWorkspace && changes.userBoardsFromWorkspace.currentValue) {
      this.userBoards = changes.userBoardsFromWorkspace.currentValue;
    }
  }

  getBoards(){
    if(this.workspaceId == ''){
      this.getBoardsWithoutWorkspace();
    }
    else{
      this.getBoardsFromWorkspace();
    }
  }

  getBoardsWithoutWorkspace() {
    this.httpClient.get<UserBoard[]>(environment.baseUrl + environment.getAllBoardsOfUserWithoutWorkspace.replace('{email}', this.user.email), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.userBoards = response;
      },
      () => {
        console.log("Something went wrong when retrieving the list of boards.")
      }
    )
  }

  getBoardsFromWorkspace() {
    console.log("get boards: ")
    console.log(this.userBoardsFromWorkspace)
    this.userBoards = this.userBoardsFromWorkspace;
  }

 ngOnDestroy(){
    localStorage.setItem("searchBoard", this.searchText)
  }

  reloadSearch(){
    if(localStorage.getItem("searchBoard") != null){
      this.searchText = <string>localStorage.getItem("searchBoard");
    }
    else{
      this.searchText = '';
    }
  }

  createBoard(){
    const dialogRef = this.dialog.open(CreateBoardComponent, {
      hasBackdrop: true,
      data: {workspaceId: this.workspaceId}});

    this.alreadyExist = true;

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.getBoards();
      this.alreadyExist = false;
    });
  }

}
