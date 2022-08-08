import {Workspace} from "./workspace";

export class Board {
  id: string = '';
  name:string ='';
  privacy:boolean=true;
  createDate: string='';
  backgroundColor: string='';
  workspace: Workspace = new Workspace();

  constructor(){
  }

}
