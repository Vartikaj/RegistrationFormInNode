import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


// THIS PACKAGE IS USED TO CALL DATA FROM THE NODE, SO WE HAVE TO CONNECT WITH THE INTERNET. BY USING THIS WE DO THIS
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginPanelComponent } from './components/admin/login-panel/login-panel.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { DashboardPanelComponent } from './components/admin/dashboard-panel/dashboard-panel.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './services/my-interceptor.service';
import { DashboardDataService } from './services/dashboard-data.service';
import { RegistrationDataService } from './services/registration-data.service';
import { LoginDataService } from './services/login-data.service';
//===================================

@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent,
    RegisterComponent,
    DashboardPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCardModule,
    ToastrModule.forRoot({
      timeOut: 15000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
    RouterModule.forRoot([]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DashboardDataService,
    RegistrationDataService,
    LoginDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
