import { User } from "./user";
import {ChatMessage} from "./chatmessage";

export class UserMessage {
  id: string = '';
  chatMessage:ChatMessage = new ChatMessage();
  user:User = new User();
  seen:boolean=true;

  constructor(){
  }

}
