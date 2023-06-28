import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../review';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { UsersService } from '../users-service.service';
import { User } from '../user';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  review: Review = {
    courseName: '',
    zipCode: '',
    reviewContent: '',
    UserId: -1
  };

  currentID?:number = -1;
  user!: SocialUser;
  loggedIn!: boolean;
  foundUser: boolean = false;
  users: User[] = [];
  constructor(private http: HttpClient, private authService: SocialAuthService, private userService: UsersService) {}


  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.reloadUsers();
    this.searchForUser();
    if (this.currentID != undefined){
      this.review.UserId = this.currentID;
    }
    
  }
  
  reloadUsers(){
    this.userService.findUsers().subscribe(
      (data: User[]) => {
        this.users = data
      });
    console.log(this.users);
  }

  searchForUser(){
    for(let i = 0; i< this.users.length; i++){
      if(this.user.name == this.users[i].name && this.user.email == this.users[i].email){
        this.foundUser = true;
        this.currentID = this.users[i].id;
        this.review.UserId = this.currentID;
      }
    }
  }
  
  submitForm() {
    const reviewData = {
      review1: this.review.reviewContent,
      courseName: this.review.courseName,
      zipCode: this.review.zipCode,
      UserID: this.review.UserId
    };
    console.log(reviewData)
    this.http.post<any>('https://birdiebuddy.azurewebsites.net/api/Reviews', reviewData)
      .subscribe(
        (response) => {
          console.log('Review submitted successfully!', response);
          // Reset the form fields
          this.review = {
            courseName: '',
            zipCode: '',
            reviewContent: '',
            UserId: -1
          };
        },
        (error) => {
          console.error('Error submitting review:', error);
        }
      );
  }
}
