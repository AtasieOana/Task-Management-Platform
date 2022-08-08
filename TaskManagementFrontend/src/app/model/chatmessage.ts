import { Board } from "./board";
import { User } from "./user";

export class ChatMessage {
  id: string = '';
  messageContent:string='';
  sendDate: string='';
  board:Board = new Board();
  sender:User = new User();

  constructor(){
  }

}
