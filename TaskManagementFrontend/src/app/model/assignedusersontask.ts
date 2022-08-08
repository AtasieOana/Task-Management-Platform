import { Task } from "./task";
import { User } from "./user";

export class AssignedUsersOnTask {
  id: string = '';
  user:User = new User();
  task:Task = new Task();

  constructor(){
  }

}
