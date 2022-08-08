import { Board } from "./board";
import { User } from "./user";

export class Tasklist {
  id: string = '';
  name: string ='';
  createDate: string='';
  user:User = new User();
  board:Board = new Board();

  constructor(){
  }

}
