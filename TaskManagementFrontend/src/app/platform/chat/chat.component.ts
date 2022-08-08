import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../service/url.service";
import {ChatMessage} from "../../model/chatmessage";
import {UserBoard} from "../../model/userboard";
import {UserMessage} from "../../model/usermessage";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() userBoard:UserBoard = new UserBoard();
  @Output() updateBadge = new EventEmitter<any>();

  chatMessages: UserMessage[] = [];
  chatMessagesMatrix: UserMessage[][] = [];
  waitSubs: Subscription = new Subscription();

  constructor(private httpClient: HttpClient, private urlService: UrlService) {
    this.waitSubs = interval(8000).subscribe((func => {
         this.callElements();
    }))
  }

  ngOnInit(): void {
    this.getMessagesByBoardAndUser();
  }

  callElements(){
    this.getMessagesByBoardAndUser()
  }

  onSubmit(sendMessageForm: NgForm) {
    if(sendMessageForm.form.value.newMessage == null){
      return;
    }

    const transientChatMessage = new ChatMessage();
    transientChatMessage.messageContent = sendMessageForm.form.value.newMessage;
    transientChatMessage.sendDate = new Date().toISOString();
    transientChatMessage.board = this.userBoard.board;
    transientChatMessage.sender = this.userBoard.user;

    this.httpClient.post(environment.baseUrl + environment.sendChatMessageUrl, transientChatMessage, this.urlService.getRequestOptions()).subscribe(
      response => {
        if (response != null) {
          console.log("Chat message successfully send.");
          sendMessageForm.resetForm();
          this.callElements();
        } else {
          return;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getMessagesByBoardAndUser(){
    this.httpClient.get<UserMessage[]>(environment.baseUrl + environment.getMessagesOfBoardAndUserUrl.replace("{idBoard}/{email}", this.userBoard.board.id.toString().concat("/")+
      this.userBoard.user.email), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.chatMessages = response;
        this.chatMessagesMatrix = this.orderMessagesByDay(this.chatMessages)
      },
      error => {
        console.log(error);
      }
    )
  }

  orderMessagesByDay(listMessages : UserMessage[]):UserMessage[][] {
    let transientList: UserMessage[] = [];
    let transientMatrix : UserMessage[][]= [];
    if(listMessages.length > 0){
      let oldDate = listMessages[0].chatMessage.sendDate.slice(0, 10);
      for(let i = 0; i<listMessages.length; i++) {
        if (listMessages[i].chatMessage.sendDate.slice(0, 10) == oldDate)
          transientList.push(listMessages[i]);
        else {
          transientMatrix.unshift(transientList);
          oldDate = listMessages[i].chatMessage.sendDate.slice(0, 10);
          transientList = [listMessages[i]];
        }
      }
      transientMatrix.unshift(transientList);
    }
    return transientMatrix;
  }

  markAsSeenAllMessages(){
    this.httpClient.get<UserMessage[]>(environment.baseUrl + environment.markReadAllMessagesUrl.replace("{idBoard}/{email}", this.userBoard.board.id.toString().concat("/")+
      this.userBoard.user.email), this.urlService.getRequestOptions()).subscribe(
      () => {
        this.callElements();
        this.updateBadge.next('update');
      },
      error => {
        console.log(error);
      }
    )
  }



}
