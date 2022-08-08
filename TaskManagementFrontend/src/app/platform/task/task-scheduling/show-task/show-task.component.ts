import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../../../model/task";

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent implements OnInit {

  @Input() taskShow: Task = new Task();
  @Input() realStartDate: Date = new Date();
  @Input() realEndDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
