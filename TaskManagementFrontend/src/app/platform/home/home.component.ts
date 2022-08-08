import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTabChangeEvent} from "@angular/material/tabs";
import {BoardTabComponent} from "../board/board-tab/board-tab.component";
import {TemplateTabComponent} from "../template/template-tab/template-tab.component";
import {WorkspaceTabComponent} from "../workspace/workspace-tab/workspace-tab.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectIndex: number = 0;
  @ViewChild('appBoard', {static: false}) appBoard: BoardTabComponent | undefined;
  @ViewChild('appTemplate', {static: false}) appTemplate: TemplateTabComponent | undefined;
  @ViewChild('appWorkspace', {static: false}) appWorkspace: WorkspaceTabComponent | undefined;

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("tabIndex") != null){
      this.selectIndex = parseInt(<string>localStorage.getItem("tabIndex"));
    }
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent){
    this.selectIndex =  tabChangeEvent.index;
    localStorage.setItem("tabIndex", String(this.selectIndex))
    localStorage.removeItem("searchBoard");
    localStorage.removeItem("searchTemplate");
    localStorage.removeItem("searchWorkspace");
    localStorage.removeItem("filterTemplate");

    if(this.appBoard != undefined){
      this.appBoard.reloadSearch();
    }
    if(this.appTemplate != undefined){
      this.appTemplate.reloadSearch();
    }
    if(this.appWorkspace != undefined){
      this.appWorkspace.reloadSearch();
    }
  }
}
