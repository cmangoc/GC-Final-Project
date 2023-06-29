import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from './review';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly API_URL = 'https://birdiebuddy.azurewebsites.net/api/';

  constructor(private http: HttpClient) { }

  saveReview(newReview: Review): Observable<any> {
    const url = `${this.API_URL}` + 'Reviews';
    console.log(newReview);
    
    return this.http.post<any>(url, newReview);
  }

  getReviews(): Observable<any> {
    const url = `${this.API_URL}` + 'Reviews';

    return this.http.get<any>(url);
  }

}
