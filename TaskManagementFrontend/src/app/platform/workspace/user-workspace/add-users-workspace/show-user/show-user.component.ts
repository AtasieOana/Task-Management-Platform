import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../../../service/url.service";
import {Router} from "@angular/router";
import {UserWorkspace} from "../../../../../model/userworkspace";
import {environment} from "../../../../../../environments/environment.prod";

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  @Input() userWorkspace: UserWorkspace = new UserWorkspace();
  @Input() userWorkspaceForCurrentUser: UserWorkspace = new UserWorkspace();
  userIsAdmin: boolean = false;
  @Output() usersUpdate: EventEmitter<string> = new EventEmitter();
  userIsCurrent: boolean = false;
  userRoleOpposite: string = '';
  newUserRole: string = '';
  isEditing: boolean = false;

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router) { }

  ngOnInit(): void {
    this.userIsAdmin = this.userWorkspaceForCurrentUser.userType == 'admin';
    this.userIsCurrent = this.userWorkspaceForCurrentUser.user.id == this.userWorkspace.user.id;
    this.getUserRoleOpposite();
  }

  showButton(){
    this.isEditing = !this.isEditing;
  }

  deleteUser(){
    this.httpClient.delete(environment.baseUrl + environment.deleteUserWorkspaceUrl.replace('{userWorkspaceId}', this.userWorkspace.id)).subscribe(
      () => {
        console.log("User "+ this.userWorkspace.user.name + " was eliminated")
        this.usersUpdate.emit("update");
      },
      error => {
        console.log(error);
      }
    )
  }

  updateUser(){

    const transientUserWorkspace = this.userWorkspace;
    this.getUserRoleForOpposite();
    transientUserWorkspace.userType = this.newUserRole;

    this.httpClient.post(environment.baseUrl + environment.updateUserWorkspaceUrl, transientUserWorkspace, this.urlService.getRequestOptions()).subscribe(
      () => {
        console.log("User updated.");
        this.userWorkspace.userType = this.newUserRole;
        this.getUserRoleOpposite();
        this.isEditing = !this.isEditing;
      },
      error => {
        console.log(error);
      }
    )
  }

  getUserRoleOpposite(){
    if(this.userWorkspace.userType == 'admin'){
      this.userRoleOpposite = 'simple user'
    }
    else{
      this.userRoleOpposite = 'admin'
    }
  }

  getUserRoleForOpposite(){
    if(this.userRoleOpposite == 'simple user'){
      this.newUserRole = 'simpleUser'
    }
    else{
      this.newUserRole = 'admin'
    }
  }
}
