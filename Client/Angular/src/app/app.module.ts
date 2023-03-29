import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BuilderComponent } from './components/builder/builder.component';
import { HardwaresComponent } from './components/admin/hardwares/hardwares.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HwDetailsComponent } from './components/admin/hardwares/hw-details/hw-details.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
