import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { environment as env } from "src/environment";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalErrorHandler } from './core/error-handler/global-error-handler';
import { AuthService } from './core/services/auth.service';
import { ContentLayoutModule } from './layout/content-layout.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';
import { EventPageModule } from './modules/event-page/event-page.module';
import { MemberProfileModule } from './modules/member-profile/member-profile.module';
import { PageNotFoundModule } from './modules/page-not-found/page-not-found.module';
import { PollPageModule } from './modules/poll-page/poll-page.module';
import { SidebarModule } from './modules/sidebar/sidebar.module';

const config: SocketIoConfig = { url: env.apiBaseUrl, options: {
  extraHeaders: {
    Authorization: localStorage.getItem('token')+" "
  }
} };

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AuthModule,
    SidebarModule,
    ContentLayoutModule,
    PageNotFoundModule,
    MemberProfileModule,
    EventPageModule,
    PollPageModule,
    ChatModule
  ],
  providers: [AuthService, {provide: ErrorHandler, useClass: GlobalErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
