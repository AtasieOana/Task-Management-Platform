import {User} from "./user";
import {Board} from "./board";

export class Rating {
  id: string = '';
  user:User = new User();
  template:Board = new Board();
  ratingValue: number = 0;

  constructor(){
  }

}
