import {Component, Input, OnInit} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";
import {UserWorkspace} from "../../../../model/userworkspace";

@Component({
  selector: 'app-workspace-in-list',
  templateUrl: './workspace-in-list.component.html',
  styleUrls: ['./workspace-in-list.component.css']
})
export class WorkspaceInListComponent implements OnInit {

  @Input() userWorkspace:UserWorkspace= new UserWorkspace();


  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  getBackgroundColor(){
    return this.userWorkspace.workspace.backgroundColor;
  }

  openWorkspace(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "userWorkspaceId": JSON.stringify(this.userWorkspace.id),
        "workspaceId": JSON.stringify(this.userWorkspace.workspace.id),
      }
    };
    this.router.navigate(["/showWorkspace"],  navigationExtras);
  }

}
