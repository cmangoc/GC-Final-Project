import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GolfFinderService {
  private readonly API_URL = 'https://golf-course-finder.p.rapidapi.com/courses';
  private readonly RAPIDAPI_HOST = 'golf-course-finder.p.rapidapi.com';
  private readonly RAPIDAPI_KEY = '166c2d797fmsh28c82b65e687bdap1c7882jsn9874022a5a9b';

  constructor(private http: HttpClient) { }

  findCourses(latitude: number, longitude: number, radius: number) {
    const url = `${this.API_URL}?radius=${radius}&lat=${latitude}&lng=${longitude}`;

    const headers = new HttpHeaders({
      'X-RapidAPI-Host': this.RAPIDAPI_HOST,
      'X-RapidAPI-Key': this.RAPIDAPI_KEY
    });

    return this.http.get(url, { headers });
  }
}
