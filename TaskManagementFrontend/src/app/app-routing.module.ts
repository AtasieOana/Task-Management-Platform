import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './platform/authentication/login/login.component';
import { SignUpComponent } from './platform/authentication/sign-up/sign-up.component';
import { HomeComponent } from './platform/home/home.component';
import { AuthGuard } from 'src/app/service/auth-guard.service';
import { ShowBoardComponent } from './platform/board/show-board-in-list/show-board/show-board.component';
import { ProfileComponent } from './platform/user/profile/profile.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { InboxComponent } from './platform/inbox/inbox.component';
import {TokenComponent} from "./platform/authentication/sign-up/token/token.component";
import {TokenGuard} from "./service/token-guard.service";
import {ShowWorkspaceComponent} from "./platform/workspace/show-workspace/show-workspace.component";
import {ForgotPasswordComponent} from "./platform/authentication/forgot-password/forgot-password.component";
import {NewPasswordComponent} from "./platform/authentication/forgot-password/new-password/new-password.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent,  canActivate:[AuthGuard]},
  { path: 'profile', component: ProfileComponent,  canActivate:[AuthGuard]},
  { path: 'showBoard', component: ShowBoardComponent, canActivate:[AuthGuard] },
  { path: 'showWorkspace', component: ShowWorkspaceComponent, canActivate:[AuthGuard] },
  { path: 'inbox', component: InboxComponent, canActivate:[AuthGuard] },
  { path: 'validation', component: TokenComponent,  canActivate:[TokenGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'forgot', component: ForgotPasswordComponent},
  { path: 'newPassword/:userId', component: NewPasswordComponent},
  { path: '', component: SignUpComponent},
  { path: '404', component: NotFoundPageComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
