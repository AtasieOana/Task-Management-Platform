import {Component, Input, OnInit} from '@angular/core';
import {UserMessage} from "../../../model/usermessage";
import {UserBoard} from "../../../model/userboard";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../service/url.service";

@Component({
  selector: 'app-chat-by-day',
  templateUrl: './chat-by-day.component.html',
  styleUrls: ['./chat-by-day.component.css']
})
export class ChatByDayComponent implements OnInit {

  @Input() chatMessageList: UserMessage[] = [];
  messageDate: String = '';

  constructor(private httpClient: HttpClient, private urlService: UrlService) {
  }

  ngOnInit(): void {
    if(this.chatMessageList.length > 0){
      this.messageDate = this.chatMessageList[0].chatMessage.sendDate.slice(0, 10);
    }
  }

}
