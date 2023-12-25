import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path:'chat', component: ChatComponent},
  {path: 'profile', component: ProfileComponent},
  { path: 'registerform', component: RegisterFormComponent },
  { path: 'loginform', component: LoginFormComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
