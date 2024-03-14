import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonGsComponent } from './button-gs/button-gs.component';
import { GuidesButtonsComponent } from './guides-buttons/guides-buttons.component';
import { ButtonHComponent } from './button-h/button-h.component';
import { ButtonEmComponent } from './button-em/button-em.component';
import { ButtonCcComponent } from './button-cc/button-cc.component';
import { ButtonCbComponent } from './button-cb/button-cb.component';
import { ButtonFaqComponent } from './button-faq/button-faq.component';

const routes: Routes = [

  {path: '', component:GuidesButtonsComponent},
  {path : 'button-gs', component:ButtonGsComponent},
  {path : 'button-h',component:ButtonHComponent},
  {path : 'button-em',component:ButtonEmComponent},
  {path : 'button-cc', component:ButtonCcComponent},
  {path : 'button-cb', component:ButtonCbComponent},
  {path : 'button-faq', component: ButtonFaqComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
