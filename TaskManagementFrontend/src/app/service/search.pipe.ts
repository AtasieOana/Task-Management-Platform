import { Pipe, PipeTransform } from '@angular/core';
import {UserBoard} from "../model/userboard";
import {UserWorkspace} from "../model/userworkspace";
import {Board} from "../model/board";

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  isUserBoard(element: UserBoard | UserWorkspace | [Board, number]){
    return (<UserBoard>element) !== undefined && (<UserBoard>element).board !== undefined;
  }

  isUserWorkspace(element: UserBoard | UserWorkspace | [Board, number]){
    return (<UserWorkspace>element)!==undefined && (<UserWorkspace>element).workspace !== null && (<UserWorkspace>element).workspace !== undefined;
  }


  transform(list: UserBoard[] | UserWorkspace[] | [Board, number][], filterText: string): any {
    if(!filterText) return list;
    if(!list) return null;

    if(this.isUserBoard(list[0])){
      return (list as Array<UserBoard>).filter(
        element => element.board.name.toLowerCase().includes(filterText.toLowerCase()));
    }

    if(this.isUserWorkspace(list[0])){
      return (list as Array<UserWorkspace>).filter(
        element => element.workspace.name.toLowerCase().includes(filterText.toLowerCase()));
    }

    return (list as Array<[Board, number]>).filter(
        element => {
          return element[0].name.toLowerCase().includes(filterText.toLowerCase())
        });

  }

}
