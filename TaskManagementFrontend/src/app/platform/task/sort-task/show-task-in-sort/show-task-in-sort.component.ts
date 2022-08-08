import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../../../model/task";

@Component({
  selector: 'app-show-task-in-sort',
  templateUrl: './show-task-in-sort.component.html',
  styleUrls: ['./show-task-in-sort.component.css']
})
export class ShowTaskInSortComponent implements OnInit {

  @Input() taskShow: Task = new Task();
  constructor() { }

  ngOnInit(): void {
  }

}
