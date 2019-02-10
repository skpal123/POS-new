import { BrowserModule, } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {SharedModule} from 'src/app/shared/shared/shared.module'
import {FormsModule, ReactiveFormsModule,FormControl} from '@angular/forms';
import { AppComponent } from './app.component';
const routes:Routes=[
  {
    path: 'login',
    loadChildren: 'src/app/login/login.module#LoginModule'  
  },
  {
    path: '',  
    redirectTo: 'login',
    pathMatch: 'full'
  }
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes,{useHash:true}),
    HttpModule,FormsModule,ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
