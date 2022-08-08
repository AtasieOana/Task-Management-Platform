import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/user";
import {UserWorkspace} from "../../../model/userworkspace";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../service/url.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment.prod";
import {CreateWorkspaceComponent} from "../create-workspace/create-workspace.component";
import {CreateBoardComponent} from "../../board/create-board/create-board.component";

@Component({
  selector: 'app-workspace-tab',
  templateUrl: './workspace-tab.component.html',
  styleUrls: ['./workspace-tab.component.css']
})
export class WorkspaceTabComponent implements OnInit {

  userWorkspaces: UserWorkspace[] = [];
  alreadyExist:boolean = false;
  loggedInUser = localStorage.getItem('userLogged');
  user:User = new User();
  searchText: string = "";

  constructor(private dialog:MatDialog, private httpClient: HttpClient, private urlService: UrlService, private router:Router) { }

  ngOnInit(): void {
    if(this.loggedInUser){
      this.user =  JSON.parse(this.loggedInUser);
    }
    else{
      this.router.navigate(['/login']);
    }
    this.reloadSearch();
    this.getWorkspaces();
  }

  getWorkspaces() {
    this.httpClient.get<UserWorkspace[]>(environment.baseUrl + environment.getWorkspaceForUserUrl.replace('{email}', this.user.email), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.userWorkspaces = response;
      },
      error => {
        console.log(error)
      }
    )
  }

  createWorkspace(){
    const dialogRef = this.dialog.open(CreateWorkspaceComponent, {
      hasBackdrop: true
      });
    this.alreadyExist = true;

    dialogRef.afterClosed().subscribe(() => {
      this.getWorkspaces();
      this.alreadyExist = false;
    });
  }

  ngOnDestroy(){
    this.dialog.closeAll();
    localStorage.setItem("searchWorkspace", this.searchText)
  }


  reloadSearch(){
    if(localStorage.getItem("searchWorkspace") != null){
      this.searchText = <string>localStorage.getItem("searchWorkspace");
    }
    else{
      this.searchText = '';
    }
  }
}
