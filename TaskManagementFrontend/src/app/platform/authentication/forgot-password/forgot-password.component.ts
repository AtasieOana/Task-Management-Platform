import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../service/url.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {User} from "../../../model/user";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  user: User= new User();
  wrongEmailContent: boolean = false;
  emailSend: boolean = false;

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router) {
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  onSubmit(userRecover: NgForm) {

    this.validationCheck(userRecover);

    if(this.wrongEmailContent){
      return;
    }

    this.httpClient.get<User>(environment.baseUrl + environment.sendRecoverMailUrl.replace("{email}", userRecover.form.value.email), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.user = response;
        this.emailSend = true;
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
    this.wrongEmailContent = !this.validateEmail(userForm.form.value.email);
  }

}
