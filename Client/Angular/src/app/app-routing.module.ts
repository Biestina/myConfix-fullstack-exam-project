import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HardwaresComponent } from './components/admin/hardwares/hardwares.component';
import { BuilderComponent } from './components/builder/builder.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'hardwares', component: HardwaresComponent },
  { path: 'builder', component: BuilderComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
