import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loggedInUser = localStorage.getItem('userLogged');
  user:User = new User();

  nameEmpty :boolean = false;
  passwordLength:boolean = false;

  isEditMode: boolean = false;

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router) { }

  ngOnInit(): void {
     this.getLoggedUser();
  }

  getLoggedUser(){
    if (this.loggedInUser) {
      this.user = JSON.parse(this.loggedInUser);
    } else {
      this.router.navigate(['/login']);
    }
  }

  editUser(){
    this.isEditMode = true;
  }

  onSubmit(profileForm: NgForm) {
    if (!profileForm.valid) {
      return;
    }

    this.validationCheck(profileForm);

    if(this.passwordLength || this.nameEmpty ){
      return;
    }

    //console.log(this.user.name + "aaa")

    const transientUser = new User();
    transientUser.password = profileForm.form.value.password;
    transientUser.name = profileForm.form.value.name;
    transientUser.email = this.user.email;
    transientUser.registrationDate = this.user.registrationDate;


    this.httpClient.put<User>(environment.baseUrl + environment.updateUserUrl.replace('{id}', this.user.id + ''), transientUser, this.urlService.getRequestOptions())
      .subscribe(
        response => {
          console.log(response)
          this.isEditMode = false;
          localStorage.setItem('userLogged', JSON.stringify(response));
        },
        error => {
          console.log(error);
        }
      );

  }

  validationCheck(profileForm: NgForm)
  {
    this.nameEmpty = false;
    this.passwordLength = false;

    if(profileForm.form.value.name == ""){
      this.nameEmpty = true;
    }
    if((profileForm.form.value.password).length < 5){
      this.passwordLength = true;
    }
  }

  back(profileForm: NgForm){
    this.getLoggedUser();
    profileForm.form.value.password = this.user.password;
    profileForm.form.value.name = this.user.name;
    this.isEditMode = false;
  }

  deleteAccount(){
    this.httpClient.delete(environment.baseUrl + environment.deleteUserUrl.replace('{id}', this.user.id + '')).subscribe(
      response => {
        this.router.navigate(['']);
      },
      error => {
        console.log(error);
      }
    )
  }
}
