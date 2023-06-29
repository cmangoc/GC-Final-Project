import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private readonly API_URL = 'https://birdiebuddy.azurewebsites.net/api/';

  constructor(private http: HttpClient) { }

  findUsers(): Observable<any> {
    const url = `${this.API_URL}`+ 'Users';

    return this.http.get(url);
  }

  findUser(userId:number): Observable<any> {
    const url = `${this.API_URL}`+ 'Users/' + userId;
    
    return this.http.get(url);
  }

  postUser(newUser:User):Observable<any>{
    const url = `${this.API_URL}`+ 'Users';
    console.log(newUser);
    
    return this.http.post<any>(url, newUser);
  }

  putUser(user:User){
    const url = `${this.API_URL}`+ 'Users/' + user.id;

    return this.http.put<any>(url, user)
  }
}
