//// This file exists to establish key facts about the ENTIRE app
// Modules
import { NgModule }        from '@angular/core';
import { BrowserModule }   from '@angular/platform-browser';
import { RouterModule }    from '@angular/router';
import { AppRouterModule } from './app-routing.module';
import { FormsModule }     from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { MatDialogModule, MatInputModule, MatTooltipModule, MatFormFieldModule }  from '@angular/material';  // MaterialModule
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragulaModule }   from 'ng2-dragula/ng2-dragula';
import { ChartsModule }    from 'ng2-charts/ng2-charts';
import 'hammerjs';

// Components
import { AppComponent }                  from './app.component';
import { TermsConditionsComponent }      from './static-pages/terms-conditions/terms-conditions.component';
import { PrivacyNoticeComponent }        from './static-pages/privacy-notice/privacy-notice.component';
import { FaqComponent }                  from './static-pages/faq/faq.component';

import { IconLinkComponent }             from './shared/icon-links/icon-links.component';
import { NavbarComponent }               from './navigation/navbar/navbar.component';
import { FooterComponent }               from './footer/footer.component';

import { AdminUserManagementComponent }  from './admin/user-management/admin-user-management.component';
import { HomeComponent }                 from './home/home.component';

import { LoginSignupFormComponent }      from './users/login-signup-form/login-signup-form.component';
import { UserPageComponent }             from './users/user-page.component';
import { UserSettingsComponent }         from './users/settings/user-settings.component';

import { RequestPasswordResetComponent } from './password-reset/request-password-reset.component';
import { PasswordResetComponent }        from './password-reset/password-reset.component';

import { NotificationsComponent }        from './notifications/notifications.component';
import { ConfirmModalComponent }         from './shared/confirm-modal/confirm-modal.component';

// Directives
import { HoverColorDirective }           from './shared/hover-color/hover-color.directive';
import { HoverBackgroundDirective }      from './shared/hover-background/hover-background.component';
import { UniqueValidatorDirective }      from './shared/validators/unique.directive';
import { DragulaDelayLiftDirective }     from './shared/dragula-delay-lift/dragula-delay-lift.directive';

// Services - make them available EVERYWHERE (otherwise, just add it specifically into Component as a provider)
import { HttpIntercept }                 from './core/api/http-intercept';
import { AuthService }                   from './core/auth/auth.service';
import { GuestService }                  from './core/services/guest.service';
import { GAEventService }                from './core/services/ga-event.service';
import { NotificationService }           from './core/services/notification.service';
import { ModalService }                  from './core/services/modal.service';
import { SignpostApi }                   from './core/api/signpost-api.service';
import { ApiAuthService }                from './core/api/api-auth.service';
import { ApiAdminService }               from './core/api/api-admin.service';
import { ApiUsersService }               from './core/api/api-users.service';
import { HelpersService }                from './shared/helpers/helpers.service';
import { IconService }                   from './core/services/icon.service';
import { UserConfirmationRedirectComponent } from './core/redirects/user-confirmation-redirect.component';

// Guards
import { AdminGuard } from './core/auth/admin-guard.service';
import { OwnerGuard } from './core/auth/owner-guard.service';

// Providers
export function HttpFactory(backend: XHRBackend,
                            defaultOptions: RequestOptions,
                            authService: AuthService) {
  return new HttpIntercept(backend, defaultOptions, authService);
}

@NgModule({
  imports:      [
                  BrowserModule,
                  AppRouterModule,
                  FormsModule,
                  HttpModule,
                  // MaterialModule.forRoot(),
                  NoopAnimationsModule,
                  MatDialogModule,
                  MatInputModule,
                  MatFormFieldModule,
                  MatTooltipModule,
                  DragulaModule,
                  ChartsModule,    // move to child module for dashboard
                ],
  declarations: [
                  AppComponent,
                  TermsConditionsComponent,
                  PrivacyNoticeComponent,
                  FaqComponent,

                  NavbarComponent,
                  FooterComponent,
                  HomeComponent,
                  AdminUserManagementComponent,   // move to child module for dashboard
                  LoginSignupFormComponent,
                  IconLinkComponent,

                  UserPageComponent,
                  UserSettingsComponent,         // move to child module for dashboard?

                  RequestPasswordResetComponent,
                  PasswordResetComponent,

                  NotificationsComponent,
                  ConfirmModalComponent,

                  HoverColorDirective,
                  HoverBackgroundDirective,
                  UniqueValidatorDirective,
                  DragulaDelayLiftDirective,

                  UserConfirmationRedirectComponent,  // Really a service, but built as component
                ],
  bootstrap:    [
                  AppComponent,
                ],
  providers:    [
                  AdminGuard,
                  OwnerGuard,
                  GuestService,
                  GAEventService,
                  AuthService,
                  HelpersService,
                  IconService,
                  NotificationService,
                  ModalService,
                  SignpostApi,
                  ApiAuthService,
                  ApiAdminService,
                  ApiUsersService,
                  {provide: Http,
                    useFactory: HttpFactory,
                    deps: [XHRBackend, RequestOptions, AuthService]
                  },
                ],
  entryComponents: [
                  ConfirmModalComponent,
  ]
})
export class AppModule { }
