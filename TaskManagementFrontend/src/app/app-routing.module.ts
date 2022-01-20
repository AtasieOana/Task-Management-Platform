import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './platform/authentication/login/login.component';
import { SignUpComponent } from './platform/authentication/sign-up/sign-up.component';
import { HomeComponent } from './platform/home/home.component';
import { AuthGuard } from 'src/app/service/auth-guard.service';
import { ShowBoardComponent } from './platform/board/show-board-in-list/show-board/show-board.component';
import { ShowBoardInListComponent } from './platform/board/show-board-in-list/show-board-in-list.component';
import { BoardTabComponent } from './platform/board/board-tab/board-tab.component';
import { TemplateTabComponent } from './platform/template/template-tab/template-tab.component';
import { ProfileComponent } from './platform/user/profile/profile.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { InboxComponent } from './platform/inbox/inbox.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent,  canActivate:[AuthGuard]},
  { path: 'profile', component: ProfileComponent,  canActivate:[AuthGuard]},
  { path: 'showBoard', component: ShowBoardComponent, canActivate:[AuthGuard] },
  { path: 'inbox', component: InboxComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: '', component: SignUpComponent},
  { path: '404', component: NotFoundPageComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
