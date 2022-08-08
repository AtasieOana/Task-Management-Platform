import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inbox } from 'src/app/model/inbox';
import { User } from 'src/app/model/user';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  loggedInUser = localStorage.getItem('userLogged');
  user:User = new User();

  inboxMessages: Inbox[] = [];


  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router) { }

  ngOnInit(): void {
    if (this.loggedInUser) {
      this.user = JSON.parse(this.loggedInUser);
    } else {
      this.router.navigate(['/login']);
    }
    localStorage.removeItem("searchBoard");
    localStorage.removeItem("searchTemplate");
    localStorage.removeItem("searchWorkspace");
    this.getInboxMessages();
  }

  getInboxMessages() {
    this.httpClient.get<Inbox[]>(environment.baseUrl + environment.getInboxForUserUrl.replace('{email}', this.user.email), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.inboxMessages = response;
      },
      error => {
        console.log(error)
      }
    )
  }
}
