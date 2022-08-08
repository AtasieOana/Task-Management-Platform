import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../../service/url.service";
import {NgForm} from "@angular/forms";
import {User} from "../../../../model/user";
import {environment} from "../../../../../environments/environment.prod";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  userId: string = '';
  passwordLength:boolean = false;
  notMatchPassword : boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private urlService: UrlService, private router:Router) { }

  ngOnInit() {
    localStorage.clear();
    this.userId = this.route.snapshot.url.toString().replace('newPassword,','');
    console.log(this.userId)
  }


  onSubmit(userRecover: NgForm) {

    this.validationCheck(userRecover);

    if(this.passwordLength || this.notMatchPassword){
      return;
    }


    this.httpClient.put<User>(environment.baseUrl + environment.updateUserPasswordUrl.replace("{id}/{password}",
      this.userId + "/" + userRecover.form.value.password), this.urlService.getRequestOptions()).subscribe(
      () => {
        this.router.navigate(['/login']);
      }
      ,
      error => {
        console.log(error);
      }
    )
  }

  validationCheck(userForm: NgForm)
  {
    this.passwordLength = false;
    this.notMatchPassword = false;

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
