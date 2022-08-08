import { Board } from "./board";
import { Tasklist } from "./tasklist";
import { User } from "./user";

export class Task {
  id: string = '';
  title: string ='';
  content: string ='';
  createDate: string='';
  startDate: string='';
  endDate: string='';
  labelColor: string='';
  orderInList: number = 0;
  ownerUser:User = new User();
  taskList:Tasklist = new Tasklist();

  constructor(){
  }

}
