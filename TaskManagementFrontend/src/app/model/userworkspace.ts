import {User} from "./user";
import {Workspace} from "./workspace";

export class UserWorkspace {
  id: string = '';
  workspace: Workspace = new Workspace();
  user:User = new User();
  userAdditionDate: string='';
  userType:string='';

  constructor(){
  }

}
