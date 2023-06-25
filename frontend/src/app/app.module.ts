import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth/auth.component';


import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import {FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
//import { DropdownComponent } from './dropdown/dropdown.component';


const appRoute: Routes = [
  {path: 'user', loadChildren: () => import('./user/user.module').then((m) => m.UserModule),},
  {path: 'student', loadChildren: () => import('./user/user.module').then((m) => m.UserModule),},
  {path: 'schedule', loadChildren: () => import('./schedule/schedule.module').then((m) => m.ScheduleModule),},
  {path: '', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent},
  {path: 'reg', component: RegistrationComponent},
  {path: 'auth', component:AuthComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'header', component: HeaderComponent},


]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    AuthComponent,
    
    HomeComponent,
    FooterComponent,
    PageNotFoundComponent,
   // DropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute) ,
    FormsModule,
    UserModule,
    ScheduleModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
