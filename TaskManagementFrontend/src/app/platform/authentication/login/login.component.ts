import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  incorrectLogin:boolean = false;
  user: User = new User();

  showPassword: boolean = false;

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router) {
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  onSubmit(userForm: NgForm) {
    if(!userForm.valid){
      this.incorrectLogin = true;
      return;
    }

    this.incorrectLogin = false;

    this.httpClient.get<User>(environment.baseUrl + environment.loginUrl.replace('{email}/{password}', userForm.form.value.email + "/" + userForm.form.value.password), this.urlService.getRequestOptions()).subscribe(
      response => {
          this.user = response;
        if (this.user == null) {
          this.incorrectLogin = true;
          return;
        } else {
            this.incorrectLogin = false;
            console.log("Login was successfully");
            localStorage.setItem('userLogged', JSON.stringify(response));
            this.router.navigate(['/home']);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  changePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

}
