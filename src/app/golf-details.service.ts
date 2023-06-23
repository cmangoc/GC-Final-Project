import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GolfDetailsService {
  private readonly API_URL = 'https://golf-course-finder.p.rapidapi.com/course/details';
  private readonly RAPIDAPI_HOST = 'golf-course-finder.p.rapidapi.com';
  private readonly RAPIDAPI_KEY = '166c2d797fmsh28c82b65e687bdap1c7882jsn9874022a5a9b';

  constructor(private http: HttpClient) { }

  getCourseDetails(zip: string, name: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Host': this.RAPIDAPI_HOST,
      'X-RapidAPI-Key': this.RAPIDAPI_KEY
    });

    const params = new HttpParams()
      .set('zip', zip)
      .set('name', name);

    return this.http.get(this.API_URL, { headers, params });
  }
}
