import {Component, Input, OnInit} from '@angular/core';
import { UserBoard } from 'src/app/model/userboard';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "../../../service/url.service";
import {environment} from "../../../../environments/environment.prod";
import {Rating} from "../../../model/rating";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() userBoard: UserBoard = new UserBoard();
  currentRating: number = 0;
  maximumRating: number = 5;
  averageRating: number = 0;

  constructor(private httpClient: HttpClient, private urlService: UrlService) { }

  ngOnInit(): void {
    this.getRatingByUserAndTemplate();
    this.getRatingAverageForTemplate()
  }

  getRatingByUserAndTemplate(){
    this.httpClient.get<Rating>(environment.baseUrl + environment.getRatingByUserAndTemplate.replace("{userId}/{templateId}", this.userBoard.user.id.toString().concat("/")+
      this.userBoard.board.id), this.urlService.getRequestOptions()).subscribe(
      response => {
        if(response != null){
          this.currentRating = response.ratingValue;
        }
        else{
          this.currentRating = 0;
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  getRatingAverageForTemplate(){
    this.httpClient.get<number>(environment.baseUrl + environment.getRatingAverageForTemplate.replace("{templateId}", this.userBoard.board.id.toString()),
      this.urlService.getRequestOptions()).subscribe(
      response => {
        if(response != null){
          this.averageRating = response;
        }
        else{
          this.averageRating = 0;
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  onRateChange(rating: number){
    const transientRating = new Rating();
    transientRating.user = this.userBoard.user;
    transientRating.template = this.userBoard.board;
    transientRating.ratingValue = rating;

    console.log(rating)

    this.httpClient.post(environment.baseUrl + environment.giveRating, transientRating, this.urlService.getRequestOptions()).subscribe(
      response => {
          console.log("Rating provided successfully.");
          this.currentRating = rating;
          this.getRatingAverageForTemplate();
      },
      error => {
        console.log(error);
      }
    )
  }



}
