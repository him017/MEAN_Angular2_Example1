import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }            from '@angular/core';
import { HttpModule }          from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent }       from './app.component';
import { AppRoutingModule }   from './app.routing.module';
import { NavbarComponent }    from './components/navbar/navbar.component';
import { HomeComponent }      from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent }  from './components/register/register.component';
import { LoginComponent }     from './components/login/login.component';
import { ProfileComponent }   from './components/profile/profile.component';

import { AuthService }        from './services/auth.service';
import { AuthGuard }          from './guards/auth.guard';
import { NotAuthGuard }       from './guards/notAuth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlashMessagesModule  
  ],
  providers: [ AuthService, AuthGuard, NotAuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
