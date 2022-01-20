import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/app/model/board';
import { User } from 'src/app/model/user';
import { Userboard } from 'src/app/model/userboard';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-template-tab',
  templateUrl: './template-tab.component.html',
  styleUrls: ['./template-tab.component.css']
})
export class TemplateTabComponent implements OnInit {

  publicBoards: Board[] = [];

  loggedInUser = localStorage.getItem('userLogged');
  user:User = new User();
  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router) { }


  ngOnInit(): void {
    if(this.loggedInUser){
      this.user =  JSON.parse(this.loggedInUser);
    }
    else{
      this.router.navigate(['/login']);
    }

    this.getPublicBoards()
  }

  getPublicBoards(){

    this.httpClient.get<Board[]>(environment.baseUrl + environment.getPublicBoardsUrl.replace("{userId}", this.user.id.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        this.publicBoards = response;
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
