import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WelcomeComponent } from './modules/core/welcome/welcome.component';
import { LogInComponent } from './modules/core/log-in/log-in.component';
import { SignUpComponent } from './modules/core/sign-up/sign-up.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';

import { ShellComponent } from './modules/core/shell/shell.component';
import { PageNotFoundComponent } from './modules/core/page-not-found/page-not-found.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoginService } from './modules/core/services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LogInComponent,
    SignUpComponent,
    ShellComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    LayoutModule,
  ],
  providers: [ {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
 },
 {
  provide: APP_INITIALIZER,
  useFactory: (loginService: LoginService) => () => loginService.startup(),
  // all operations under loadConfiguration() must be promise based. Convert all subscriptions toPromise();
  deps: [LoginService],
  multi: true
}],
  bootstrap: [AppComponent],
})
export class AppModule {}
