import { Board } from "./board";
import { Task } from "./task";
import { User } from "./user";

export class AssignedUsersOnTask {
  id: number = 0;
  user:User = new User();
  task:Task = new Task();

  constructor(){
  }

}
