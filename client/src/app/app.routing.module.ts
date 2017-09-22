import { RouterModule, Routes } from '@angular/router';
import { NgModule }             from '@angular/core';
import { HomeComponent }        from './components/home/home.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { RegisterComponent }    from './components/register/register.component';
import { LoginComponent }       from './components/login/login.component';
import { ProfileComponent }     from './components/profile/profile.component';
import { AuthGuard }            from './guards/auth.guard';
import { NotAuthGuard }         from './guards/notAuth.guard';

const appRoutes: Routes = [
  { 
     path: '', 
     component: HomeComponent // Default Route
  },
  {
    path:'dashboard',
    component :  DashboardComponent,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path:'register',
    component :  RegisterComponent,
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path:'login',
    component :  LoginComponent,
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path:'profile',
    component :  ProfileComponent,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  { path: '**', component: HomeComponent } // "Catch-All" Routes
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(
             appRoutes,
             { enableTracing: true } // <-- debugging purposes only
             )
           ],   
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
