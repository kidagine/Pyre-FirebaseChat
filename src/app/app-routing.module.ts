import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { ChatComponent } from './main/chat/chat.component';
import { LoginComponent } from './main/login/login.component';
import { RegisterComponent } from './main/register/register.component';
import { ErrorComponent } from './main/error/error.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToChat = () => redirectLoggedInTo(['chat']);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,  },
  { path: 'register', component: RegisterComponent, data: { animation: '' }},
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorComponent }
];

//...canActivate(redirectUnauthorizedToLogin)}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }