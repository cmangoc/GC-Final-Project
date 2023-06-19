import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolfCourseFinderComponent } from './golf-course-finder.component';

describe('GolfCourseFinderComponent', () => {
  let component: GolfCourseFinderComponent;
  let fixture: ComponentFixture<GolfCourseFinderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GolfCourseFinderComponent]
    });
    fixture = TestBed.createComponent(GolfCourseFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
