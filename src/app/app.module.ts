import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { Routes, RouterModule } from '@angular/router';

import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';



import { AppComponent } from './app.component';
import { GmapComponent } from './gmap/gmap.component';
import { GolfCourseFinderComponent } from './golf-course-finder/golf-course-finder.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { ReviewFormComponent } from './review-form/review-form.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'course/details', component: CourseDetailsComponent },
  {path:'login', component: LoginComponent},
  { path: 'reviews', component: ReviewPageComponent }
   
];

const CLIENT_ID = "600529948388-ntjf0s0i529vpj43hsb9liqqbebfmhap.apps.googleusercontent.com";
@NgModule({
  declarations: [
    AppComponent,
    GmapComponent,
    GolfCourseFinderComponent,
    MainPageComponent,
    LoginComponent,
    ReviewFormComponent,
    ReviewPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              CLIENT_ID
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
