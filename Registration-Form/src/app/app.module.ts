import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
// THIS PACKAGE IS USED TO CALL DATA FROM THE NODE, SO WE HAVE TO CONNECT WITH THE INTERNET. BY USING THIS WE DO THIS
import { HttpClientModule } from '@angular/common/http';
//===================================
 
@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
