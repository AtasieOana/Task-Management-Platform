import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../service/url.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../../model/task";
import {Board} from "../../../model/board";
import {User} from "../../../model/user";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-task-scheduling',
  templateUrl: './task-scheduling.component.html',
  styleUrls: ['./task-scheduling.component.css']
})
export class TaskSchedulingComponent implements OnInit {

  tasks: Task[] = [];
  board: Board = new Board();
  user: User = new User();
  maximumDate = new Date(0);
  minimumDate = new Date(new Date().getTime() + (1000 * 60 * 60 * 1000));
  max_lateness:number = 0;
  t = new Date(0); // the time it has reached so far
  realStartDates: Date[] = [];
  realEndDates: Date[] = [];
  maxLatenessFormat: string = '';
  minDateCopy = this.minimumDate;

  constructor(private httpClient: HttpClient, private urlService: UrlService,
              public dialogRef: MatDialogRef<TaskSchedulingComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.board = this.data.board;
    this.user = this.data.user;
    this.getTasks();
  }

  getTasks(){
    this.httpClient.get<Task[]>(environment.baseUrl + environment.getAllTaskForUserFromBoardUrl.replace('{userId}/{boardId}', this.user.id.concat("/")
      + this.board.id), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.tasks = response;
        let endDate, startDate
        for(let i = 0; i < this.tasks.length; i++){
          if(this.tasks[i].endDate != null) {
            endDate = new Date(this.tasks[i].endDate);
            if(endDate > this.maximumDate){
              this.maximumDate = endDate;
            }
          }
          if(this.tasks[i].startDate != null) {
            startDate = new Date(this.tasks[i].startDate);
            if(startDate < this.minimumDate){
              this.minimumDate = startDate;
            }
          }
        }
        if(this.maximumDate.getTime() == new Date(0).getTime()){
          this.maximumDate = new Date(new Date().getTime() + (1000 * 60 * 60 * 24));
        }
        else{
          this.maximumDate = new Date(this.maximumDate.getTime() + (1000 * 60 * 60 * 24));
        }
        if(this.minimumDate.getTime() == this.minDateCopy.getTime()){
          this.minimumDate = new Date();
        }
        else{
          this.minimumDate = new Date(this.minimumDate.getTime() - (1000 * 60 * 60 * 24));
        }
        this.schedulingTask();
      },
      error => {
        console.log(error)
      }
    )
  }

  schedulingTask() {
    if(this.tasks.length){
      this.sortTasksByDeadlines();
      for(let i = 0; i <= this.tasks.length - 2 ; i++){
        this.seeLatenessForEveryTask(this.tasks[i])
      }
      this.seeLatenessForEveryTask(this.tasks[this.tasks.length - 1])
      this.turnMaximLatenessToHours()
    }
  }


  sortTasksByDeadlines(){
    this.tasks.sort((a, b) => {
      if (a.endDate == null) {
        if (b.endDate == null) {
          return 0
        } else {
          return this.maximumDate.toISOString().localeCompare(b.endDate)
        }
      } else {
        if (b.endDate == null) {
          return a.endDate.localeCompare(this.maximumDate.toISOString())
        } else {
          return a.endDate.localeCompare(b.endDate)
        }
      }
    })
    // console.log(this.tasks)
  }

  seeLatenessForEveryTask(task: Task){
    let startDate, taskStartTime, taskFinishTime, endDate;
    if(task.startDate == null){
      startDate = this.minimumDate.toISOString();
    } else{
      startDate = task.startDate;
    }
    if(task.endDate == null){
      endDate = this.maximumDate.toISOString();
    } else{
      endDate = task.endDate;
    }
    if(this.t.toISOString().localeCompare(startDate) <= 0 ){
      taskStartTime = startDate; // the task has a start date after the date when the previous task was completed
    } else{
      taskStartTime = this.t.toISOString(); // the task has a start date before the date when the previous task was completed
    }

    if(task.endDate == null){
      if(this.t.getTime() == new Date(0).getTime()){
        taskFinishTime = new Date(new Date(taskStartTime).getTime() + (1000 * 60 * 60 * 24));
      }
      else{
        taskFinishTime = new Date(new Date(taskStartTime).getTime() + (1000 * 60 * 60 * 24));
      }
    }
    else{
      if(task.startDate == null){
          taskFinishTime = new Date(this.t.getTime() + (1000 * 60 * 60 * 24));
      }
        else {
          taskFinishTime = new Date(new Date(taskStartTime).getTime() + (new Date(endDate).getTime() - new Date(startDate).getTime()))
        }
      }

    this.t = taskFinishTime;
    this.realStartDates.push(new Date(taskStartTime));
    this.realEndDates.push(taskFinishTime);
    if(taskFinishTime.getTime() > new Date(endDate).getTime() && task.endDate != null){// if task ended later
      if(this.max_lateness < taskFinishTime.getTime() - new Date(endDate).getTime()){
        this.max_lateness = taskFinishTime.getTime() - new Date(endDate).getTime()
      }
    }
  }

  turnMaximLatenessToHours(){

    console.log(this.max_lateness)

    const msInDays = 1000 * 24 * 60 * 60;
    const days = Math.trunc(this.max_lateness / msInDays);
    if (days > 0) {
      this.maxLatenessFormat += (days + ' days ');
      this.max_lateness = this.max_lateness - (days * msInDays);
    }

    const msInHour = 1000 * 60 * 60;
    const hours = Math.trunc(this.max_lateness / msInHour);
    if (hours > 0) {
      this.maxLatenessFormat += (hours + ' hours ');
      this.max_lateness = this.max_lateness - (hours * msInHour);
    }

    const msInMinute = 1000 * 60;
    const minutes = Math.trunc(this.max_lateness / msInMinute);
    if (minutes > 0) {
      this.maxLatenessFormat += (minutes + ' minutes ');
      this.max_lateness = this.max_lateness - (minutes * msInMinute);
    }

    const seconds = Math.trunc(this.max_lateness / 1000);
    if (seconds > 0) {
      this.maxLatenessFormat += (seconds + ' seconds ');
    }

    if(this.maxLatenessFormat == ''){
      this.maxLatenessFormat = "0 lateness";
    }
  }
}
