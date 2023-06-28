import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private readonly API_URL = 'https://birdiebuddy.azurewebsites.net/api/Users';

  constructor(private http: HttpClient) { }

  findUsers(): Observable<any> {
    const url = `${this.API_URL}`;

    return this.http.get(url);
  }

  postUser(newUser:User):Observable<any>{
    const url = `${this.API_URL}`;
    console.log(newUser);
    
    return this.http.post<any>(url, newUser);
  }
}
