import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GolfDetailsService {
  private readonly API_URL = 'https://localhost:5001/api/GolfCourses';

  constructor(private http: HttpClient) { }

  getCourseDetails(zip: string, name: string): Observable<any> {
    const url = `${this.API_URL}?zip=${zip}&name=${name}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(url, { headers });
  }
}
