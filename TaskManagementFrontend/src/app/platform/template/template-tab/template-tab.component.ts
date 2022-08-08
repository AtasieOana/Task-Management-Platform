import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/app/model/board';
import { User } from 'src/app/model/user';
import { UrlService } from 'src/app/service/url.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-template-tab',
  templateUrl: './template-tab.component.html',
  styleUrls: ['./template-tab.component.css']
})
export class TemplateTabComponent implements OnInit {

  boardsWithRatings: [Board,number][] = [];

  loggedInUser = localStorage.getItem('userLogged');
  user:User = new User();
  searchText: string = "";

  filterValue: number = 0;

  constructor(private httpClient: HttpClient, private urlService: UrlService, private router:Router) { }

  ngOnInit(): void {
    if(this.loggedInUser){
      this.user =  JSON.parse(this.loggedInUser);
    }
    else{
      this.router.navigate(['/login']);
    }
    this.getRatingsForTemplates()
  }

  reloadSearch(){
    if(localStorage.getItem("searchTemplate") != null){
      this.searchText = <string>localStorage.getItem("searchTemplate");
    }
    else{
      this.searchText = '';
    }

    if(localStorage.getItem("filterTemplate") != null){
      this.filterValue = parseInt(<string>localStorage.getItem("filterTemplate"));
    }
    else{
      this.filterValue = 0;
    }

  }

  getRatingsForTemplates(){
    this.boardsWithRatings = []
    this.httpClient.get<any[]>(environment.baseUrl + environment.getRatingsForTemplatesUrl.replace("{userId}", this.user.id.toString()), this.urlService.getRequestOptions()).subscribe(
      response => {
        for(let i = 0; i < response.length; i++){
          this.boardsWithRatings.push([response[i].value0, response[i].value1])
        }
        this.reloadSearch();
      },
      (error) => {
        console.log(error)
      }
    )
  }

  ngOnDestroy(){
    localStorage.setItem("searchTemplate", this.searchText)
    localStorage.setItem("filterTemplate", String(this.filterValue))
  }

}
