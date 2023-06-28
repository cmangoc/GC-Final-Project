import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly API_URL = 'https://birdiebuddy.azurewebsites.net/api/Reviews';

  constructor(private http: HttpClient) { }

  saveReview(newReview: Review): Observable<any> {
    const url = `${this.API_URL}`;
    console.log(newReview);

    return this.http.post<any>(url, newReview);
  }
}
