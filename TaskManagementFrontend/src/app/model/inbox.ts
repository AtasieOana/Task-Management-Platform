import { User } from "./user";

export class Inbox {
  id: number  = 0;
  sendDate: string='';
  message:string ='';
  seen:boolean=true;
  user:User = new User();

  constructor(){
  }

}
