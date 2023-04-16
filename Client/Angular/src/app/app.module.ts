import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BuilderComponent } from './components/builder/builder.component';
import { HardwaresComponent } from './components/admin/hardwares/hardwares.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HwDetailsComponent } from './components/admin/hardwares/hw-details/hw-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyconfigsComponent } from './components/myconfigs/myconfigs.component';
import { ConfigDetailsComponent } from './components/myconfigs/config-details/config-details.component';
import { AuthenticationInterceptor } from 'src/interceptors/authentication.interceptor';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    BuilderComponent,
    HardwaresComponent,
    NavbarComponent,
    HwDetailsComponent,
    MyconfigsComponent,
    ConfigDetailsComponent,
    UsersComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
