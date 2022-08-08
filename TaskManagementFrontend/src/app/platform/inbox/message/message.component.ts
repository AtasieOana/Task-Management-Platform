import { HttpClient } from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Inbox } from 'src/app/model/inbox';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() inboxMessage:Inbox= new Inbox();
  @Output() inboxModified = new EventEmitter();

  sendDate: string = '';

  constructor(private httpClient: HttpClient, private urlService: UrlService) { }

  ngOnInit(): void {
    this.sendDate = this.inboxMessage.sendDate.slice(0, 10)
  }

  markAsRead(){
    this.inboxMessage.seen = true;

    this.httpClient.post(environment.baseUrl + environment.readMessageUrl, this.inboxMessage, this.urlService.getRequestOptions()).subscribe(
      response => {
        if (response != null) {
          console.log("Message was read");
          this.inboxModified.emit();
        } else {
          return;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
