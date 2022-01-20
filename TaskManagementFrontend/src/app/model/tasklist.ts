import { Board } from "./board";
import { User } from "./user";

export class Tasklist {
  id: number = 0;
  name: string ='';
  createDate: string='';
  user:User = new User();
  board:Board = new Board();
  
  constructor(){
  }

}
