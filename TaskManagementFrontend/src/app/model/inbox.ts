import { User } from "./user";

export class Inbox {
  id: string = '';
  sendDate: string='';
  message:string ='';
  seen:boolean=true;
  user:User = new User();

  constructor(){
  }

}
