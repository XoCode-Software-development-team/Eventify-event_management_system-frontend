import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { ButtonComponent } from './Components/button/button.component';
import { CardComponent } from './Components/card/card.component';
import { Main2Component } from './Components/main2/main2.component';
import { LoginformComponent } from './Components/loginform/loginform.component';

import { SignupComponent } from './Pages/signup/signup.component';
import { ChangepasswordComponent } from './Components/changepassword/changepassword.component';
import { FogotpasswordComponent } from './Pages/home/fogotpassword/fogotpassword.component';
import { EditprofileComponent } from './Components/editprofile/editprofile.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Pages/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoginLayoutComponent } from './Pages/login-layout/login-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    CardComponent,
    Main2Component,
    LoginformComponent,

    SignupComponent,
    ChangepasswordComponent,
    FogotpasswordComponent,
    EditprofileComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    LoginLayoutComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
