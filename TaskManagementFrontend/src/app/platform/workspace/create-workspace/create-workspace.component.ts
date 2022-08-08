import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/user";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../service/url.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {environment} from "../../../../environments/environment.prod";
import {UserWorkspace} from "../../../model/userworkspace";
import {Workspace} from "../../../model/workspace";

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.css']
})
export class CreateWorkspaceComponent implements OnInit {

  loggedInUser = localStorage.getItem('userLogged');
  emptyName:boolean = false;
  user:User = new User();
  userWorkspace:UserWorkspace = new UserWorkspace();
  privacyType: boolean = true;
  color: string = "#ffffff"

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router,
              public dialogRef: MatDialogRef<CreateWorkspaceComponent>) {
  }

  ngOnInit(): void {
    if (this.loggedInUser) {
      this.user = JSON.parse(this.loggedInUser);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(createWorkspaceForm: NgForm) {

    if (!createWorkspaceForm.valid) {
      if(createWorkspaceForm.form.value.name == ''){
        this.emptyName = true;
        return;
      }
      else{
        this.emptyName = false;
      }
    }

    const newWorkspace = new Workspace();
    newWorkspace.name = createWorkspaceForm.form.value.name;
    newWorkspace.createDate = new Date().toISOString().slice(0, 10);

    if (createWorkspaceForm.form.value.color != '') {
      newWorkspace.backgroundColor = createWorkspaceForm.form.value.color;
    }
    else {
      newWorkspace.backgroundColor = '#FFFFFF';
    }

    const transientUserWorkspace = new UserWorkspace();
    transientUserWorkspace.user = this.user;
    transientUserWorkspace.userAdditionDate = new Date().toISOString().slice(0, 10);
    transientUserWorkspace.workspace = newWorkspace;
    transientUserWorkspace.userType = "admin";

    this.userWorkspace = transientUserWorkspace;

    this.httpClient.post(environment.baseUrl + environment.saveWorkspaceUrl,  this.userWorkspace, this.urlService.getRequestOptions()).subscribe(
      response => {
        console.log(this.userWorkspace)
        if (response != null) {
          console.log("Workspace successfully saved.");
          this.close();
        } else {
          return;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  close() {
    this.dialogRef.close();
  }

}
