import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../../service/url.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {User} from "../../../../model/user";
import {environment} from "../../../../../environments/environment.prod";

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  invalidToken :boolean = false;
  signUpUser = localStorage.getItem('userSignUp');
  user:User = new User();


  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router) { }

  ngOnInit(): void {
    if(this.signUpUser){
      this.user =  JSON.parse(this.signUpUser);
    }
    else{
      this.router.navigate(['']);
    }
  }


  onSubmit(userToken: NgForm) {
    if (!userToken.valid) {
      if (userToken.form.value.token == '') {
        this.invalidToken = true;
        return;
      } else {
        this.invalidToken = false;
      }
    }

    this.httpClient.get<User>(environment.baseUrl + environment.checkToken.replace("{email}/{token}", this.user.email.concat("/") +
      userToken.form.value.token), this.urlService.getRequestOptions()).subscribe(
      response => {
        if (response != null) {
          console.log("User successfully login.");
          localStorage.setItem('userLogged', JSON.stringify(response));
          this.router.navigate(['/home']);
        } else {
          this.invalidToken = true;
          return;
        }
      },
      error => {
        console.log(error);
      }
    )
  }
}
