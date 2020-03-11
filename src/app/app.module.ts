import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './main/chat/chat.component';
import { LoginComponent } from './main/login/login.component';
import { RegisterComponent } from './main/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { ErrorComponent } from './main/error/error.component';
import { AuthGuard } from './shared/auth.guard';
import { AuthenticationService } from './shared/services/authentication.service';
import { LoginModule } from './main/login/login.module';
import { RegisterModule } from './main/register/register.module';
import { ChatModule } from './main/chat/chat.module';
import { AdminComponent } from './main/admin/admin.component';
import { AdminModule } from './main/admin/admin.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    AdminComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    BrowserModule,
    AdminModule,
    LoginModule,
    RegisterModule,
    ChatModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }