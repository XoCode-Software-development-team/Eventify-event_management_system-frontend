import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { GuidesButtonsComponent } from './guides-buttons/guides-buttons.component';
import { ButtonGsComponent } from './button-gs/button-gs.component';
import { ButtonHComponent } from './button-h/button-h.component';
import { ButtonEmComponent } from './button-em/button-em.component';
import { ButtonCcComponent } from './button-cc/button-cc.component';
import { ButtonCbComponent } from './button-cb/button-cb.component';
import { ButtonFaqComponent } from './button-faq/button-faq.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';



@NgModule({
  declarations: [
    AppComponent,
    GuidesButtonsComponent,
    ButtonGsComponent,
    ButtonHComponent,
    ButtonEmComponent,
    ButtonCcComponent,
    ButtonCbComponent,
    ButtonFaqComponent,
    NavBarComponent,
    FooterComponent,
    ContentComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
