import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GolfDetailsService } from '../golf-details.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  zip: string | null = null;
  name: string | null = null;
  courseDetails: any;

  constructor(
    private route: ActivatedRoute,
    private golfDetailsService: GolfDetailsService
  ) { }

  ngOnInit() {
    this.zip = this.route.snapshot.paramMap.get('zip');
    this.name = this.route.snapshot.paramMap.get('name');
    this.getCourseDetails();
  }

  getCourseDetails() {
    if (this.zip && this.name) {
      this.golfDetailsService.getCourseDetails(this.zip, this.name).subscribe(
        (response) => {
          this.courseDetails = response.course_details.result;
        },
        (error) => {
          console.log('Error fetching course details:', error);
        }
      );
    } else {
      console.log('Invalid zip or name');
    }
  }
}
