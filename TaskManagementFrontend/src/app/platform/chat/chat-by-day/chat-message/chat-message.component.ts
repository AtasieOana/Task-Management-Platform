import {Component, Input, OnInit} from '@angular/core';
import {UserMessage} from "../../../../model/usermessage";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../../service/url.service";
import {User} from "../../../../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() userMessage: UserMessage = new UserMessage();
  loggedInUser = localStorage.getItem('userLogged');
  logUser: User = new User();

  isSender: boolean = false;
  isSeen: boolean = false;

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router) { }

  ngOnInit(): void {
    if(this.loggedInUser){
      this.logUser =  JSON.parse(this.loggedInUser);
    }
    else{
      this.router.navigate(['/login']);
    }

    this.isSender = this.logUser.email == this.userMessage.chatMessage.sender.email;
    this.isSeen = this.userMessage.seen;
  }

}
