import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GolfFinderService {
  private readonly API_URL = 'https://localhost:5001/api/GolfCourses';

  constructor(private http: HttpClient) { }

  findCourses(latitude: number, longitude: number, radius: number) {
    const url = `${this.API_URL}?latitude=${latitude}&longitude=${longitude}&radius=${radius}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(url, { headers });
  }
}
