import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Board } from '../../../../model/board';
import { Tasklist } from '../../../../model/tasklist';
import { UserBoard } from '../../../../model/userboard';
import { UrlService } from '../../../../service/url.service';
import { environment } from '../../../../../environments/environment.prod';
import { CreateEditTaskListComponent } from 'src/app/platform/task-list/create-edit-task-list/create-edit-task-list.component';
import { UserInBoardListComponent } from 'src/app/platform/user-board/user-in-board-list/user-in-board-list.component';
import {UserWorkspace} from "../../../../model/userworkspace";
import {User} from "../../../../model/user";
import {SortTaskComponent} from "../../../task/sort-task/sort-task.component";
import {TaskSchedulingComponent} from "../../../task/task-scheduling/task-scheduling.component";

@Component({
  selector: 'app-show-board',
  templateUrl: './show-board.component.html',
  styleUrls: ['./show-board.component.css']
})
export class ShowBoardComponent implements OnInit {

  userBoardForPossibleUser: UserBoard = new UserBoard();
  board: Board = new Board();
  boardId :string = '';
  userBoardId :string = '';
  userId :string = '';
  userBoard: UserBoard = new UserBoard();
  loggedInUser = localStorage.getItem('userLogged');
  user:User = new User();

  taskLists: Tasklist[] = [];
  alreadyExist:boolean = false;

  userWorkspace: UserWorkspace = new UserWorkspace();

  showOptions: boolean = false;

  config = {
    itemsPerPage: 2,
    currentPage: 1,
    totalItems: this.taskLists.length
  };

  chatAppear:boolean = false;
  numberOfUnreadMessages:number = 0;

  initialPrivacy:boolean = true;
  boardName: string = "";

  workspaceId: string = "";

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

    if (this.loggedInUser) {
      this.user = JSON.parse(this.loggedInUser);
    } else {
      this.router.navigate(['/login']);
    }

    this.getCurrentBoard();

  }


  getCurrentBoard() {
    this.httpClient.get<UserBoard>(environment.baseUrl + environment.getUserBoardUrl.replace('{id}', this.userBoardId.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        if (response == null) {
          this.router.navigate(["/home"]);
        }
        this.userBoardForPossibleUser = response;

        if(this.userBoardForPossibleUser.user.id != this.user.id){
          this.getCurrentBoardForCurrentUser();
        }
        else{
          this.userBoard = this.userBoardForPossibleUser;
          this.initialiseElements();
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getCurrentBoardForCurrentUser(){
    this.httpClient.get<UserBoard>(environment.baseUrl + environment.getOrCreateUserBoardUrl.replace('{userId}/{boardId}', this.user.id + '/'
      + this.userBoardForPossibleUser.board.id), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.userBoard = response;
        this.initialiseElements();
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

  getNumberOfNotChatReadMessages(){
    this.httpClient.get<number>(environment.baseUrl + environment.findNotReadChatMessagesNumberUrl.replace("{idBoard}/{email}",  this.boardId.toString().concat("/")+
      this.userId.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.numberOfUnreadMessages = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  initialiseElements(){
    this.board = this.userBoard.board;
    if(this.userBoard.board.workspace != null){
      this.workspaceId = this.userBoard.board.workspace.id;
      this.getUserWorkspaceForCurrentUser();
    }
    else{
      this.workspaceId = '';
    }
    this.boardName = this.board.name;
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.userBoard.board.backgroundColor;
    this.initialPrivacy = this.board.privacy;
    this.getTaskLists();
    this.userBoardId = this.userBoard.id;
    this.boardId = this.board.id;
    this.userId = this.userBoard.user.id;
    this.getNumberOfNotChatReadMessages();
  }

  updateElements(event:any){
    this.getNumberOfNotChatReadMessages();
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

  showOptionsFunction(){
    this.showOptions = !this.showOptions;
  }

  createTaskList(){

    const dialogRef = this.dialog.open(CreateEditTaskListComponent, {
      hasBackdrop: true,
      data: {isEditMode: false, user: this.userBoard.user, board: this.board}}
    );

    this.alreadyExist = true;

    dialogRef.afterClosed().subscribe(() => {
      this.onTaskListChanged();
      this.alreadyExist = false;
    });
  }

  changeBoardName(event:any){
    if (event.target.value == "") {
      this.boardName = this.board.name
      return
    }

    this.board.name = event.target.value ;

    this.httpClient.post(environment.baseUrl + environment.updateBoardNameUrl, this.board, this.urlService.getRequestOptions()).subscribe(
      () => {
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
        data: {userWorkspace: this.userWorkspace, userBoard: this.userBoard, mouseX: event.clientX,
          mouseY: event.clientY, alreadyExist:this.alreadyExist}});

      this.alreadyExist = true;

      dialogRef.afterClosed().subscribe(() => {
        this.alreadyExist = false;
        document.body.classList.remove("cdk-global-scrollblock");
      });
    }
  }

  removeBoard(){
    this.httpClient.delete(environment.baseUrl + environment.deleteBoardUrl.replace('{id}', this.board.id + '')).subscribe(
      () => {
        this.alreadyExist = true;
        console.log("Board was deleted")

        if(this.workspaceId == ''){
          this.router.navigate(["/home"]);
        }
        else {
          this.returnToWorkspace();
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  leaveBoard(){
    this.httpClient.delete(environment.baseUrl + environment.deleteUserBoardUrl.replace('{id}', this.userBoard.id + '')).subscribe(
      () => {
        this.alreadyExist = true;
        console.log("User left the board")
        if(this.workspaceId == ''){
          this.router.navigate(["/home"]);
        }
        else {
          this.returnToWorkspace();
        }
        },
      error => {
        console.log(error);
      }
    )
  }

  getUserWorkspaceForCurrentUser(){
    this.httpClient.get<UserWorkspace>(environment.baseUrl + environment.getUserWorkspaceForCurrentUserAndWorkspaceUrl.replace('{userId}/{workspaceId}', this.userBoard.user.id + '/' + this.workspaceId),
      this.urlService.getRequestOptions()).subscribe(
      response => {
        this.userWorkspace = response;

      },
      error => {
        console.log(error);
      }
    )
  }

  returnToWorkspace(){
      let navigationExtras: NavigationExtras = {
          queryParams: {
            "userWorkspaceId": JSON.stringify(this.userWorkspace.id),
            "workspaceId": JSON.stringify(this.userWorkspace.workspace.id),
          }
        };
      this.router.navigate(["/showWorkspace"],  navigationExtras);
  }



  useTemplate(){
    const transientBoard = new Board();
    transientBoard.name = this.board.name;
    transientBoard.privacy = true;
    transientBoard.createDate = new Date().toISOString().slice(0, 10);
    transientBoard.backgroundColor = this.board.backgroundColor;

    const transientUserBoard = new UserBoard();
    transientUserBoard.user = this.userBoard.user;
    transientUserBoard.board = transientBoard;
    transientUserBoard.userType = "admin";
    transientUserBoard.userAdditionDate = new Date().toISOString().slice(0, 10);

    this.httpClient.post<UserBoard>(environment.baseUrl + environment.saveBoardUrl,  transientUserBoard, this.urlService.getRequestOptions()).subscribe(
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

  copyTask(userBoard :UserBoard){
    let newBoard = userBoard.board;
    let user = userBoard.user
    this.httpClient.post(environment.baseUrl + environment.copyBoardElementsUrl.replace("{idOldBoard}/{idNewBoard}", this.board.id.toString().concat("/")+
    newBoard.id), user, this.urlService.getRequestOptions()).subscribe(
      () => {
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

  showChat(){
    this.chatAppear = !this.chatAppear;
  }


  sortTasksByStartDate(){
    if(!this.alreadyExist){

      const dialogRef = this.dialog.open(SortTaskComponent, {
        data: {board: this.userBoard.board, sortWay: "startDate"},  hasBackdrop: true, width: '60%', height: '80%',
      });

      this.alreadyExist = true;

      dialogRef.afterClosed().subscribe(() => {
        this.alreadyExist = false;
      });
    }
  }

  sortTasksByEndDate(){
    if(!this.alreadyExist){

      const dialogRef = this.dialog.open(SortTaskComponent, {
        data: {board: this.userBoard.board, sortWay: "endDate"},  hasBackdrop: true, width: '60%', height: '80%',
      });

      this.alreadyExist = true;

      dialogRef.afterClosed().subscribe(() => {
        this.alreadyExist = false;
      });
    }
  }

  schedulingTasks(){
    if(!this.alreadyExist){

      const dialogRef = this.dialog.open(TaskSchedulingComponent, {
        data: {board: this.userBoard.board, user: this.userBoard.user},  hasBackdrop: true, width: '60%', height: '80%',
      });

      this.alreadyExist = true;

      dialogRef.afterClosed().subscribe(() => {
        this.alreadyExist = false;
      });
    }
  }
}
