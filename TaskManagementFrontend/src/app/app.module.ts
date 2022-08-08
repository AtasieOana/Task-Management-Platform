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
import {personFill, houseFill, personPlusFill, personCheckFill, eyeFill, eyeSlashFill, bellFill, caretRightSquareFill} from 'ngx-bootstrap-icons';
import { InboxComponent } from './platform/inbox/inbox.component';
import { MessageComponent } from './platform/inbox/message/message.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ChatComponent } from "./platform/chat/chat.component";
import { ChatMessageComponent } from "./platform/chat/chat-by-day/chat-message/chat-message.component";
import {ChatByDayComponent} from "./platform/chat/chat-by-day/chat-by-day.component";
import {TokenComponent} from "./platform/authentication/sign-up/token/token.component";
import {TokenGuard} from "./service/token-guard.service";
import {RatingComponent} from "./platform/template/rating/rating.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {WorkspaceTabComponent} from "./platform/workspace/workspace-tab/workspace-tab.component";
import {WorkspaceInListComponent} from "./platform/workspace/workspace-tab/workspace-in-list/workspace-in-list.component";
import {CreateWorkspaceComponent} from "./platform/workspace/create-workspace/create-workspace.component";
import {ShowWorkspaceComponent} from "./platform/workspace/show-workspace/show-workspace.component";
import {AddUsersWorkspaceComponent} from "./platform/workspace/user-workspace/add-users-workspace/add-users-workspace.component";
import {ShowUserComponent} from "./platform/workspace/user-workspace/add-users-workspace/show-user/show-user.component";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {CalendarComponent} from "./platform/calendar/calendar.component";
import {CalendarTaskComponent} from "./platform/calendar/calendar-task/calendar-task.component";
import {ForgotPasswordComponent} from "./platform/authentication/forgot-password/forgot-password.component";
import {NewPasswordComponent} from "./platform/authentication/forgot-password/new-password/new-password.component";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {SearchPipe} from "./service/search.pipe";
import {MatRadioModule} from "@angular/material/radio";
import {FilterPipe} from "./service/filter.pipe";
import {SortTaskComponent} from "./platform/task/sort-task/sort-task.component";
import {ShowTaskInSortComponent} from "./platform/task/sort-task/show-task-in-sort/show-task-in-sort.component";
import {TaskSchedulingComponent} from "./platform/task/task-scheduling/task-scheduling.component";
import {ShowTaskComponent} from "./platform/task/task-scheduling/show-task/show-task.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {DragDropShared} from "./service/drag-drop-shared.service";

const icons = {
  personFill,
  houseFill,
  personPlusFill,
  personCheckFill,
  eyeFill,
  eyeSlashFill,
  bellFill,
  caretRightSquareFill
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
    MessageComponent,
    ChatComponent,
    ChatMessageComponent,
    ChatByDayComponent,
    TokenComponent,
    RatingComponent,
    WorkspaceTabComponent,
    WorkspaceInListComponent,
    CreateWorkspaceComponent,
    ShowWorkspaceComponent,
    AddUsersWorkspaceComponent,
    ShowUserComponent,
    CalendarComponent,
    CalendarTaskComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    SearchPipe,
    FilterPipe,
    SortTaskComponent,
    ShowTaskInSortComponent,
    TaskSchedulingComponent,
    ShowTaskComponent
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
        MatBadgeModule,
        NgbModule,
        Ng2SearchPipeModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        MatRadioModule,
        DragDropModule
    ],
  providers: [UrlService, AuthGuard, TokenGuard, DragDropShared],
  bootstrap: [AppComponent]
})
export class AppModule { }
