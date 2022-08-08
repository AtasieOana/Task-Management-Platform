import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../../service/url.service";
import {UserWorkspace} from "../../../../model/userworkspace";
import {environment} from "../../../../../environments/environment.prod";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-add-users-workspace',
  templateUrl: './add-users-workspace.component.html',
  styleUrls: ['./add-users-workspace.component.css']
})
export class AddUsersWorkspaceComponent implements OnInit {

  usersOnWorkspace: UserWorkspace[] = [];
  userWorkspaceForCurrentUser:UserWorkspace = new UserWorkspace();
  emptyEmail:boolean = false;
  userNotExist: boolean = false;
  userRole: string = "simpleUser";
  userIsAdmin: boolean = false;

  constructor(private httpClient: HttpClient, private urlService: UrlService,
              public dialogRef: MatDialogRef<AddUsersWorkspaceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userWorkspaceForCurrentUser = this.data.userWorkspaceForCurrentUser;
    this.userIsAdmin = this.userWorkspaceForCurrentUser.userType == 'admin';
    this.getUsersOnWorkspace();
  }

  getUsersOnWorkspace(){
    this.httpClient.get<UserWorkspace[]>(environment.baseUrl + environment.getUserWorkspacesFromWorkspace.replace('{workspaceId}', this.userWorkspaceForCurrentUser.workspace.id), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.usersOnWorkspace = response;
      },
      error => {
        console.log(error);
      }
    )
  }


  close() {
    this.dialogRef.close();
  }

  onSubmit(addUserForm : NgForm) {
    if (!addUserForm.valid) {
      if (addUserForm.form.value.email == '') {
        this.emptyEmail = true;
      }
      return;
    }

    this.httpClient.post(environment.baseUrl + environment.addNewUserOnWorkspaceUrl.replace('{email}/{userType}', addUserForm.form.value.email + "/" + this.userRole),
      this.userWorkspaceForCurrentUser.workspace, this.urlService.getRequestOptions()).subscribe(
      response => {
        if(response!=null){
          this.getUsersOnWorkspace();
          this.userNotExist = false;
          addUserForm.resetForm();
        }
        else{
          this.userNotExist = true;
          return;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  onUserRoleChange(userRole:string){
    this.userRole = userRole;
  }


}
