import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPanelComponent } from './components/admin/login-panel/login-panel.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { DashboardPanelComponent } from './components/admin/dashboard-panel/dashboard-panel.component';

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
