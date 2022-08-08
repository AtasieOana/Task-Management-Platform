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

  oldPassword: string = ''
  newPassword: string = ''

  oldName: string = ''

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router) { }

  ngOnInit(): void {
     this.getLoggedUser();
    localStorage.removeItem("searchBoard");
    localStorage.removeItem("searchTemplate");
    localStorage.removeItem("searchWorkspace");
  }

  getLoggedUser(){
    if (this.loggedInUser) {
      this.user = JSON.parse(this.loggedInUser);
      this.oldPassword = this.user.password;
      this.oldName = this.user.name;
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

    this.newPassword = profileForm.form.value.new_password
    this.validationCheck(profileForm);

    if(this.passwordLength || this.nameEmpty ){
      return;
    }

    const transientUser = new User();
    if(this.newPassword != ""){
      transientUser.password = this.newPassword;
    } else {
      transientUser.password = this.oldPassword;
    }
    transientUser.name = profileForm.form.value.name;
    transientUser.email = this.user.email;
    transientUser.registrationDate = this.user.registrationDate;
    transientUser.accountEnabled = true;

    console.log(transientUser)

    this.httpClient.put<User>(environment.baseUrl + environment.updateUserUrl.replace('{id}', this.user.id + ''), transientUser, this.urlService.getRequestOptions())
      .subscribe(
        response => {
          this.isEditMode = false;
          localStorage.setItem('userLogged', JSON.stringify(response));
          this.oldPassword = response.password;
          this.user=transientUser;
          window.location.reload();
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

    if( (profileForm.form.value.new_password).length > 0 &&  (profileForm.form.value.new_password).length < 5){
      this.passwordLength = true;
    }
  }

  back(profileForm: NgForm){
    this.getLoggedUser();
    profileForm.form.value.password = this.oldPassword;
    profileForm.form.value.name = this.user.name;
    this.newPassword = '';
    this.isEditMode = false;
  }

  deleteAccount(){
    this.httpClient.delete(environment.baseUrl + environment.deleteUserUrl.replace('{id}', this.user.id + '')).subscribe(
      () => {
        this.router.navigate(['']);
      },
      error => {
        console.log(error);
      }
    )
  }
}
