import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GolfFinderService } from '../golf-finder.service';
import { GolfDetailsService } from '../golf-details.service';

@Component({
  selector: 'app-golf-course-finder',
  templateUrl: './golf-course-finder.component.html',
  styleUrls: ['./golf-course-finder.component.css']
})
export class GolfCourseFinderComponent {
  @Input() latitude: number | null | undefined = undefined;
  @Input() longitude: number | null | undefined = undefined;
  radius: number | null = null;
  golfCourses: any[] = []; // Array to store the retrieved golf courses
  selectedCourseDetails: any = null; // Variable to store the selected course details

  constructor(
    private golfFinderService: GolfFinderService,
    private golfDetailsService: GolfDetailsService,
    private changeDetectorRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  findGolfCourses() {
    if (this.latitude !== null && this.longitude !== null && this.radius !== null) {
      this.golfFinderService.findCourses(Number(this.latitude), Number(this.longitude), Number(this.radius))
        .subscribe(
          (data: any) => {
            this.golfCourses = data.courses.map((course: any) => ({
              name: course.name,
              zip: course.zip_code,
              distance: course.distance
            }));
            console.log(this.golfCourses);
          },
          (error: any) => {
            console.error('Error:', error);
            // Handle error cases
          }
        );
    }
  }

  getCourseDetails(zip: string, name: string) {
    console.log('Fetching course details...');
    this.golfDetailsService.getCourseDetails(zip, name).subscribe(
      (response) => {
        console.log('Response received:', response);
        const courseIndex = this.golfCourses.findIndex((course) => course.zip === zip && course.name === name);
        if (courseIndex !== -1) {
          this.golfCourses[courseIndex].courseDetails = response.course_details.result;
          this.selectedCourseDetails = this.golfCourses[courseIndex].courseDetails; // Update selectedCourseDetails
          this.changeDetectorRef.detectChanges(); // Trigger change detection
        }
      },
      (error) => {
        console.log('Error fetching course details:', error);
      }
    );
  }

  getDayOfWeek(day: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
  }

  formatTime(time: any): string {
    if (!time && time !== 0) {
      return 'Closed'; // Return 'Closed' if the time is not available
    }
  
    const [hours, minutes] = time.match(/\d{2}/g); 
    const formattedHours = parseInt(hours, 10) % 12 || 12;
    const period = parseInt(hours, 10) < 12 ? 'AM' : 'PM';
    return `${formattedHours}:${minutes || '00'} ${period}`;
  }
  
  

  getPhotoUrl(photoReference: string): string {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyATYI4Xja9TFvQYPigZyWn8fHINeVGkRrM`;
  }
}
