import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthService } from './shared/services/auth/auth.service';
import { RestinterceptorsService } from './shared/services/interceptors/restinterceptors.service';
import { ConfigService } from './shared/services/configService/config.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [AuthService,
  { provide: HTTP_INTERCEPTORS, useClass: RestinterceptorsService, multi: true},
  ConfigService,
  {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [ConfigService], multi: true
  }
],
  bootstrap: [AppComponent]
})

export class AppModule { }

function initializeApp(config: ConfigService) {
  return () => config.loadPromise().then(() => {
    console.log('---CONFIG LOADED--', ConfigService.config)
  })
  }

