import { Pipe, PipeTransform } from '@angular/core';
import {Board} from "../model/board";

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(list: [Board, number][], filterRating: number): any {
    if (filterRating == 0) return list;
    if (!list) return null;

    return (list as Array<[Board, number]>).filter(
      element => {
        return element[1] >= filterRating

      });
  }

}
