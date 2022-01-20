import { Board } from "./board";
import { User } from "./user";

export class Userboard {
  id: number = 0;
  user:User = new User();
  board:Board = new Board();
  userType:string='';
  userAdditionDate: string='';

  constructor(){
  }

}
