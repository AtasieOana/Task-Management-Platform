import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Board } from '../../../../model/board';
import { Tasklist } from '../../../../model/tasklist';
import { Userboard } from '../../../../model/userboard';
import { UrlService } from '../../../../service/url.service';
import { environment } from '../../../../../environments/environment.prod';
import { CreateEditTaskListComponent } from 'src/app/platform/task-list/create-edit-task-list/create-edit-task-list.component';
import { User } from 'src/app/model/user';
import { UserInBoardListComponent } from 'src/app/platform/user-board/user-in-board-list/user-in-board-list.component';
import { Color } from '@angular-material-components/color-picker';

@Component({
  selector: 'app-show-board',
  templateUrl: './show-board.component.html',
  styleUrls: ['./show-board.component.css']
})
export class ShowBoardComponent implements OnInit {

  userBoard: Userboard = new Userboard();
  board: Board = new Board();
  boardId :number = -1;
  userBoardId :number = -1;
  userId :number = -1;

  taskLists: Tasklist[] = [];
  alreadyExist:boolean = false;

  config = {
    itemsPerPage: 2,
    currentPage: 1,
    totalItems: this.taskLists.length
  };

  initialPrivacy:boolean = true;

  changeText: boolean = false;


  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private httpClient: HttpClient,
              private urlService: UrlService, private router:Router, private dialog:MatDialog) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userBoardId = JSON.parse(params["userBoardId"]);
      this.boardId = JSON.parse(params["boardId"]);
      this.userId = JSON.parse(params["userId"]);
    });


    this.httpClient.get<Userboard>(environment.baseUrl + environment.getUserBoardUrl.replace('{id}', this.userBoardId.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        if(response == null){
          this.router.navigate(["/home"]);
        }
        this.userBoard = response;
        this.board = this.userBoard.board;

        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.userBoard.board.backgroundColor;

        this.initialPrivacy = this.board.privacy;
        this.getTaskLists();

        if (this.board == null) {
          console.log("Error when retriving the board")
          this.router.navigate(['/login']);
        }
      },
      error => {
        console.log(error);
      }
    )
  }


  ngOnDestroy(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgb(255,255,255)';
    this.dialog.closeAll();
  }

  getTaskLists() {

    this.httpClient.get<Tasklist[]>(environment.baseUrl + environment.getTaskListsFromBoardUrl.replace('{idBoard}', this.boardId.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.taskLists = response;
        this.config.totalItems = this.taskLists.length;
        this.config.currentPage = 1;
      },
      () => {
        console.log("Something went wrong when retrieving the task lists.")
      }
    )
  }

  onTaskListChanged() {
    this.getTaskLists();
  }

  pageChanged(event:any){
    this.config.currentPage = event;
  }

  selectOption(){
    this.userBoard.board.privacy = this.initialPrivacy;
    console.log(this.userBoard.board.privacy)
    this.httpClient.post(environment.baseUrl + environment.updateBoardPrivacyUrl,  this.userBoard.board, this.urlService.getRequestOptions()).subscribe(
      response => {
        if (response != null) {
          console.log("Privacy become " + this.userBoard.board.privacy);
        } else {
          return;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  createTaskList(){

    const dialogRef = this.dialog.open(CreateEditTaskListComponent, {
      data: {isEditMode: false, user: this.userBoard.user, board: this.board}}
    );

    this.alreadyExist = true;

    dialogRef.afterClosed().subscribe(result => {
      this.onTaskListChanged();
      this.alreadyExist = false;
    });
  }

  changeBoardName(event:any){
      if (event.target.value == " ") {
        return
      }

    this.board.name = event.target.value ;

    console.log(this.board);

    this.httpClient.post(environment.baseUrl + environment.updateBoardNameUrl, this.board, this.urlService.getRequestOptions()).subscribe(
      response => {
        console.log("Board name changed.");
      },
      error => {
        console.log(error);
      }
    )
  }

  seeUsers(event:any){
    if(!this.alreadyExist){

      const dialogRef = this.dialog.open(UserInBoardListComponent, {
        data: {board: this.board, mouseX: event.clientX, mouseY: event.clientY, alreadyExits:this.alreadyExist}});

      this.alreadyExist = true;

      dialogRef.afterClosed().subscribe(result => {
        this.alreadyExist = false;
        document.body.classList.remove("cdk-global-scrollblock");
      });
    }
  }

  removeBoard(){
    this.httpClient.delete(environment.baseUrl + environment.deleteBoardUrl.replace('{id}', this.board.id + '')).subscribe(
      response => {
        this.alreadyExist = true;
        console.log("Board was deleted")

        this.router.navigate(["/home"]);
      },
      error => {
        console.log(error);
      }
    )
  }

  leaveBoard(){
    this.httpClient.delete(environment.baseUrl + environment.deleteUserBoardUrl.replace('{id}', this.userBoard.id + '')).subscribe(
      response => {
        this.alreadyExist = true;
        console.log("User leaved the board")
        this.router.navigate(["/home"]);
      },
      error => {
        console.log(error);
      }
    )
  }

  useTemplate(){
    const transientBoard = new Board();
    transientBoard.name = this.board.name;
    transientBoard.privacy = true;
    transientBoard.createDate = new Date().toISOString().slice(0, 10);
    transientBoard.backgroundColor = this.board.backgroundColor;

    const transientUserBoard = new Userboard();
    transientUserBoard.user = this.userBoard.user;
    transientUserBoard.board = transientBoard;
    transientUserBoard.userType = "admin";
    transientUserBoard.userAdditionDate = new Date().toISOString().slice(0, 10);

    this.httpClient.post<Userboard>(environment.baseUrl + environment.saveBoardUrl,  transientUserBoard, this.urlService.getRequestOptions()).subscribe(
      response => {
        console.log(response)

        if (response != null) {
          console.log("Board successfully saved.");
          this.copyTask(response)
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

  copyTask(userBoard :Userboard){
    let newBoard = userBoard.board;
    let user = userBoard.user
    this.httpClient.post(environment.baseUrl + environment.copyBoardElementsUrl.replace("{idOldBoard}/{idNewBoard}", this.board.id.toString().concat("/")+
    newBoard.id), user, this.urlService.getRequestOptions()).subscribe(
      response => {
        console.log("Tasks and task lists copied.")
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "userBoardId": JSON.stringify(userBoard.id),
            "boardId": JSON.stringify(userBoard.board.id),
            "userId": JSON.stringify(userBoard.user.id)
          }
        };
        this.router.navigate(["/showBoard"],  navigationExtras);
      },
      error => {
        console.log(error);
      }
    )
  }


}
