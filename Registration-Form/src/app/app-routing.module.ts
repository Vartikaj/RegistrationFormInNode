import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardPanelComponent } from './components/dashboard-panel/dashboard-panel.component';

const routes: Routes = [
  {path: 'Registration', component: LoginPanelComponent},
  {path: 'Login', component: RegisterComponent},
  {path: 'dashboard', component: DashboardPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
