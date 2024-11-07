import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { BaseComponent } from './components/base/base.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'challange/:post-name', component: NewPostComponent, canActivate: [AuthGuard] },
  { path: 'leader-board', component: LeaderboardComponent },
  {
    path: '', component: BaseComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'feed', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'profile/:profile-name', component: ProfileComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: '**', component: BaseComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }