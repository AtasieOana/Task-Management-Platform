import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  nameEmpty :boolean = false;
  passwordLength:boolean = false;
  notUniqueEmail :boolean = false;
  wrongEmailContent: boolean = false;
  notMatchPassword : boolean = false;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router) {
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  onSubmit(userForm: NgForm) {

    this.validationCheck(userForm);

    if(this.wrongEmailContent || this.passwordLength || this.nameEmpty || this.notMatchPassword){
      return;
    }

    const transientUser = new User();
    transientUser.email = userForm.form.value.email;
    transientUser.password = userForm.form.value.password;
    transientUser.name = userForm.form.value.name;
    transientUser.registrationDate =  new Date().toISOString().slice(0, 10);
    transientUser.accountEnabled = false;


    this.httpClient.post<User>(environment.baseUrl + environment.signUpUrl, transientUser, this.urlService.getRequestOptions()).subscribe(
      response => {
          this.notUniqueEmail = false;
          console.log("User successfully saved.");
          localStorage.setItem('userSignUp', JSON.stringify(response));
          this.router.navigate(['/validation']);
        }
      ,
      error => {
        console.log(error);
      }
    )
  }

  validateEmail(email:string) {
    const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }


  validationCheck(userForm: NgForm)
  {
    this.nameEmpty = false;
    this.passwordLength = false;
    this.wrongEmailContent = false;
    this.notUniqueEmail = false;
    this.notMatchPassword = false;

    if(userForm.form.value.name == ""){
      this.nameEmpty = true;
    }
    if(!this.validateEmail(userForm.form.value.email)){
      this.wrongEmailContent = true;
    }
    if((userForm.form.value.password).length < 5){
      this.passwordLength = true;
    }

    if((userForm.form.value.confirmPassword) != (userForm.form.value.password)){
      this.notMatchPassword = true;
    }
  }

  changePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  changeConfirmPassVisibility(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }


}


