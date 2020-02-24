import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './main/error/error.component';

const routes: Routes = [
  {
     path: 'admin',
     loadChildren: () => import('./main/admin/admin.module').then(m => m.AdminModule)
  },
  { 
    path: 'login',
    loadChildren: () => import('./main/login/login.module').then(m => m.LoginModule)
  },
  { 
    path: 'register',
    loadChildren: () => import('./main/register/register.module').then(m => m.RegisterModule)
  },
  { 
    path: 'chat',
    loadChildren: () => import('./main/chat/chat.module').then(m => m.ChatModule)
  },
  { 
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }