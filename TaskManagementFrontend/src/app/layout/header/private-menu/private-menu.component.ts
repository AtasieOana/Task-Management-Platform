import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-private-menu',
  templateUrl: './private-menu.component.html',
  styleUrls: ['./private-menu.component.css']
})
export class PrivateMenuComponent implements OnInit {

  userLogged = localStorage.getItem('userLogged');
  userIsLogged:boolean = false;
  user: User = new User();

  numberOfNewMessages: number = 0;
  waitSubs: Subscription = new Subscription();

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router: Router) {
    this.waitSubs = interval(1500).subscribe((func => {
      this.getNumberOfNotReadMessages();
    }))
  }

  ngOnInit(): void {
    if (this.userLogged) {
      this.userIsLogged = true;
      this.user = JSON.parse(this.userLogged);
    } else{
      this.userIsLogged = false;
    }
    this.getNumberOfNotReadMessages();
  }

  goToHome(){
    localStorage.removeItem("tabIndex");
    this.router.navigate(['/home']);
  }

  seeProfile(){
    this.router.navigate(['/profile']);
  }

  logOut(){
    this.router.navigate(['/login']);
  }

  goToInbox(){
    this.router.navigate(['/inbox']);
  }

  getNumberOfNotReadMessages(){
    this.httpClient.get<number>(environment.baseUrl + environment.findNotReadMessagesNumberUrl.replace('{email}', this.user.email), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.numberOfNewMessages = response;
      },
      error => {
        console.log(error)
      }
    )
  }

}
