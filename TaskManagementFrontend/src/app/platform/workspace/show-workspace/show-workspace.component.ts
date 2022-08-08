import {Component, ElementRef, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../service/url.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserWorkspace} from "../../../model/userworkspace";
import {environment} from "../../../../environments/environment.prod";
import {MatDialog} from "@angular/material/dialog";
import {AddUsersWorkspaceComponent} from "../user-workspace/add-users-workspace/add-users-workspace.component";
import {CreateBoardComponent} from "../../board/create-board/create-board.component";
import {UserBoard} from "../../../model/userboard";

@Component({
  selector: 'app-show-workspace',
  templateUrl: './show-workspace.component.html',
  styleUrls: ['./show-workspace.component.css']
})
export class ShowWorkspaceComponent implements OnInit {

  userWorkspace: UserWorkspace = new UserWorkspace();
  userWorkspaceId: string = "";
  workspaceName: string ="";
  workspaceId: string = "";
  alreadyExist: boolean = false;
  boardsFromWorkspace: UserBoard[] = []

  constructor(private httpClient: HttpClient, private urlService: UrlService,
              private router:Router, private route: ActivatedRoute,
              private dialog:MatDialog, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userWorkspaceId = JSON.parse(params["userWorkspaceId"]);
      this.workspaceId = JSON.parse(params["workspaceId"]);
    });
    this.getUserWorkspace();

  }

  getUserWorkspace(){
    this.httpClient.get<UserWorkspace>(environment.baseUrl + environment.getUserWorkspaceByIdUrl.replace('{id}', this.userWorkspaceId), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.userWorkspace = response;
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.userWorkspace.workspace.backgroundColor;
        this.workspaceName = this.userWorkspace.workspace.name;
        this.getBoardsFromWorkspace();
      },
      error => {
        console.log(error);
      }
    )
  }

  createBoard(){
    const dialogRef = this.dialog.open(CreateBoardComponent, {
      hasBackdrop: true,
      data: {workspaceId: this.workspaceId}});

    this.alreadyExist = true;

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.getBoardsFromWorkspace();
      this.alreadyExist = false;
    });
  }


  getBoardsFromWorkspace() {
    this.httpClient.get<UserBoard[]>(environment.baseUrl + environment.getAllBoardsOfUserFromWorkspace.replace('{email}/{workspaceId}', this.userWorkspace.user.email + "/" + this.userWorkspace.workspace.id),
      this.urlService.getRequestOptions()).subscribe(
      response => {
        this.boardsFromWorkspace = response;
        console.log(this.boardsFromWorkspace)
      },
      () => {
        console.log("Something went wrong when retrieving the list of boards.")
      }
    )
  }

  changeWorkspaceName(event:any){
    if (event.target.value == "") {
      this.workspaceName = this.userWorkspace.workspace.name
      return
    }

    const transientWorkspace = this.userWorkspace.workspace;
    transientWorkspace.name = event.target.value ;

    this.httpClient.post(environment.baseUrl + environment.updateWorkspaceUrl, transientWorkspace, this.urlService.getRequestOptions()).subscribe(
      () => {
        console.log("Workspace name changed.");
        this.userWorkspace.workspace.name = event.target.value;
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteWorkspace(){
    this.httpClient.delete(environment.baseUrl + environment.deleteWorkspaceUrl.replace('{id}', this.userWorkspace.workspace.id)).subscribe(
      () => {
        console.log("Board was deleted")
        this.router.navigate(["/home"]);
      },
      error => {
        console.log(error);
      }
    )
  }

  leaveWorkspace(){
    this.httpClient.delete(environment.baseUrl + environment.deleteUserWorkspaceUrl.replace('{userWorkspaceId}', this.userWorkspace.id)).subscribe(
      () => {
        console.log("User left the workspace")
        this.router.navigate(["/home"]);
      },
      error => {
        console.log(error);
      }
    )
  }

  seeUsers(){
    const dialogRefAdd = this.dialog.open(AddUsersWorkspaceComponent, {
      hasBackdrop: true,
      data: {userWorkspaceForCurrentUser: this.userWorkspace}});

    this.alreadyExist = true;

    dialogRefAdd.afterClosed().subscribe(() => {
      this.alreadyExist = false;
    });
  }

  ngOnDestroy(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgb(255,255,255)';
    this.dialog.closeAll();
  }


}
