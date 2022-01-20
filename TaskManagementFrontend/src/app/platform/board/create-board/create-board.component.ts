import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Board } from 'src/app/model/board';
import { User } from 'src/app/model/user';
import { Userboard } from 'src/app/model/userboard';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {

  loggedInUser = localStorage.getItem('userLogged');
  emptyName:boolean = false;
  user:User = new User();
  userBoard:Userboard = new Userboard();
  privacyType: boolean = true;
  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router,
              public dialogRef: MatDialogRef<CreateBoardComponent>) {
  }

  ngOnInit(): void {
  }

  onSubmit(createBoardForm: NgForm) {
    if (!createBoardForm.valid) {
      if(createBoardForm.form.value.name == ''){
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
    transientBoard.createDate = new Date().toISOString().slice(0, 10);
    if (createBoardForm.form.value.color != '') {
      transientBoard.backgroundColor = createBoardForm.form.value.color;
    }
    else {
      transientBoard.backgroundColor = '#000000';
    }

    if (this.loggedInUser) {
      this.user = JSON.parse(this.loggedInUser);
    } else {
      this.router.navigate(['/login']);
    }

    this.userBoard.user = this.user;
    this.userBoard.board = transientBoard;
    this.userBoard.userType = "admin";
    this.userBoard.userAdditionDate = new Date().toISOString().slice(0, 10);

    this.httpClient.post(environment.baseUrl + environment.saveBoardUrl,  this.userBoard, this.urlService.getRequestOptions()).subscribe(
      response => {
        console.log(this.userBoard)
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
