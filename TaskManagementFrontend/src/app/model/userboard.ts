import { Board } from "./board";
import { User } from "./user";

export class UserBoard {
  id: string = '';
  user:User = new User();
  board:Board = new Board();
  userType:string='';
  userAdditionDate: string='';

  constructor(){
  }

}
