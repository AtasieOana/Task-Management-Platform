import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../service/url.service";
import {Board} from "../../../model/board";
import {environment} from "../../../../environments/environment.prod";
import {Task} from "../../../model/task";

@Component({
  selector: 'app-sort-task',
  templateUrl: './sort-task.component.html',
  styleUrls: ['./sort-task.component.css']
})
export class SortTaskComponent implements OnInit {

  board: Board = new Board();
  sortWay: string = '';
  tasks: Task[] = [];
  tasksAfterSort: Task[] = [];
  showWords: string = '';

  constructor(private httpClient: HttpClient, private urlService: UrlService,
              public dialogRef: MatDialogRef<SortTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.board = this.data.board;
    this.sortWay = this.data.sortWay;

    if (this.sortWay == 'startDate') {
      this.sortByStartDate();
      this.getTaskWithoutStartDate();
      this.showWords = "start date"
    }
    else if (this.sortWay == 'endDate') {
      this.sortByEndDate();
      this.getTaskWithoutEndDate();
      this.showWords = "end date"
    }

  }

  getTaskWithoutStartDate() {
    this.httpClient.get<Task[]>(environment.baseUrl + environment.getAllTaskFromBoardWithoutStartDateUrl.replace('{boardId}', this.board.id), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.tasksAfterSort = response;
      },
      error => {
        console.log(error)
      }
    )
  }

  sortByStartDate() {
    this.httpClient.get<Task[]>(environment.baseUrl + environment.getAllTaskFromBoardOrderByStartDateUrl.replace('{boardId}', this.board.id), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.tasks = response;
      },
      error => {
        console.log(error)
      }
    )
  }

  getTaskWithoutEndDate() {
    this.httpClient.get<Task[]>(environment.baseUrl + environment.getAllTaskFromBoardWithoutEndDateUrl.replace('{boardId}', this.board.id), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.tasksAfterSort = response;
      },
      error => {
        console.log(error)
      }
    )
  }

  sortByEndDate() {
    this.httpClient.get<Task[]>(environment.baseUrl + environment.getAllTaskFromBoardOrderByEndDateUrl.replace('{boardId}', this.board.id), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.tasks = response;
      },
      error => {
        console.log(error)
      }
    )
  }

}
