import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UrlService} from "./service/url.service";
import {MaterialModule} from "./material.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './platform/authentication/login/login.component';
import { HomeComponent } from './platform/home/home.component';
import { SignUpComponent } from './platform/authentication/sign-up/sign-up.component';
import { CreateBoardComponent } from './platform/board/create-board/create-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './service/auth-guard.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { ShowBoardInListComponent } from './platform/board/show-board-in-list/show-board-in-list.component';
import { BoardTabComponent } from './platform/board/board-tab/board-tab.component';
import { ShowTaskListComponent } from './platform/task-list/show-task-list/show-task-list.component';
import { ShowBoardComponent } from './platform/board/show-board-in-list/show-board/show-board.component';
import { CreateEditTaskListComponent } from './platform/task-list/create-edit-task-list/create-edit-task-list.component';
import { UserInBoardListComponent } from './platform/user-board/user-in-board-list/user-in-board-list.component';
import { UserInBoardComponent } from './platform/user-board/user-in-board/user-in-board.component';
import { AddEditUserInBoardComponent } from './platform/user-board/add-edit-user-in-board/add-edit-user-in-board.component';
import { TaskListComponent } from './platform/task/task-list/task-list.component';
import { TaskComponent } from './platform/task/task-list/task/task.component';
import { AddEditTaskComponent } from './platform/task/add-edit-task/add-edit-task.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateTabComponent } from './platform/template/template-tab/template-tab.component';
import { ShowTemplateInListComponent } from './platform/template/show-template-in-list/show-template-in-list.component';
import { ProfileComponent } from './platform/user/profile/profile.component';
import {PrivateMenuComponent } from './layout/header/private-menu/private-menu.component';
import { PublicMenuComponent } from './layout/header/public-menu/public-menu.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import {personFill, houseFill, personPlusFill, personCheckFill, eyeFill, eyeSlashFill, bellFill} from 'ngx-bootstrap-icons';
import { InboxComponent } from './platform/inbox/inbox.component';
import { MessageComponent } from './platform/inbox/message/message.component';
import { MatBadgeModule } from '@angular/material/badge';

const icons = {
  personFill,
  houseFill,
  personPlusFill,
  personCheckFill,
  eyeFill,
  eyeSlashFill,
  bellFill
};

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    PrivateMenuComponent,
    PublicMenuComponent,
    HomeComponent,
    CreateBoardComponent,
    ShowBoardInListComponent,
    ShowBoardComponent,
    BoardTabComponent,
    ShowTaskListComponent,
    CreateEditTaskListComponent,
    UserInBoardListComponent,
    UserInBoardComponent,
    AddEditUserInBoardComponent,
    TaskListComponent,
    TaskComponent,
    AddEditTaskComponent,
    TemplateTabComponent,
    ShowTemplateInListComponent,
    ProfileComponent,
    NotFoundPageComponent,
    InboxComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    MaterialModule,
    NgxPaginationModule,
    NgxBootstrapIconsModule.pick(icons),
    MatBadgeModule
  ],
  providers: [UrlService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
