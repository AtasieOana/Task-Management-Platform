import { HttpClient } from '@angular/common/http';
import {Component, HostListener, Inject, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Board } from 'src/app/model/board';
import { User } from 'src/app/model/user';
import { UserBoard } from 'src/app/model/userboard';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';
import {Workspace} from "../../../model/workspace";

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {

  loggedInUser = localStorage.getItem('userLogged');
  emptyName:boolean = false;
  user:User = new User();
  userBoard:UserBoard = new UserBoard();
  privacyType: boolean = true;
  workspaceId: string = '';
  color: string = "#ffffff"

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router,
              public dialogRef: MatDialogRef<CreateBoardComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.workspaceId = this.data.workspaceId;
  }

  onSubmit(createBoardForm: NgForm) {
    if (!createBoardForm.valid) {
      if(createBoardForm.form.value.name == ''){
        console.log("ici")
        this.emptyName = true;
        return;
      }
      else{
        this.emptyName = false;
      }
    }

    const transientBoard = new Board();
    transientBoard.name = createBoardForm.form.value.name;
    transientBoard.privacy = this.privacyType;
    transientBoard.createDate = new Date().toISOString();

    if (createBoardForm.form.value.color != '') {
      transientBoard.backgroundColor = createBoardForm.form.value.color;
    }
    else {
      transientBoard.backgroundColor = '#FFFFFF';
    }

    if (this.loggedInUser) {
      this.user = JSON.parse(this.loggedInUser);
    } else {
      this.router.navigate(['/login']);
    }

    this.userBoard.user = this.user;
    this.userBoard.board = transientBoard;
    this.userBoard.userType = "admin";
    this.userBoard.userAdditionDate = new Date().toISOString();
    this.userBoard.board.workspace = new Workspace();
    this.userBoard.board.workspace.id = this.workspaceId

    this.saveBoard();
  }

  saveBoard(){
    this.httpClient.post(environment.baseUrl + environment.saveBoardUrl,  this.userBoard, this.urlService.getRequestOptions()).subscribe(
      response => {
        if (response != null) {
          console.log("Board successfully saved.");
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

  onPrivacyChanged(privacyType:boolean){
    this.privacyType = privacyType;
    console.log(this.privacyType)
  }


}
