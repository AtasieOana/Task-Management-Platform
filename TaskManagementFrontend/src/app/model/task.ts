import { Board } from "./board";
import { Tasklist } from "./tasklist";
import { User } from "./user";

export class Task {
  id: number = 0;
  title: string ='';
  content: string ='';
  createDate: string='';
  startDate: string='';
  endDate: string='';
  labelColor: string='';
  ownerUser:User = new User();
  taskList:Tasklist = new Tasklist();

  constructor(){
  }

}
