import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { Routes, RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { GmapComponent } from './gmap/gmap.component';
import { GolfCourseFinderComponent } from './golf-course-finder/golf-course-finder.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: '', component: GolfCourseFinderComponent },
  { path: 'course/details', component: CourseDetailsComponent } 
];


@NgModule({
  declarations: [
    AppComponent,
    GmapComponent,
    GolfCourseFinderComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
