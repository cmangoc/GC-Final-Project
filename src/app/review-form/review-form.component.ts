import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../review';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { UsersService } from '../users-service.service';
import { User } from '../user';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  review: Review = {
    courseName: '',
    zipCode: '',
    review1: '',
    userId: -1
  };

  formBool:boolean = false;

  currentUser!:User;
  currentID?:number = -1;
  user!: SocialUser;
  loggedIn!: boolean;
  foundUser: boolean = false;
  users: User[] = [];
  reviews: Review[] = [];
  newReviewID?: number;
  constructor(private http: HttpClient, private authService: SocialAuthService, private userService: UsersService, private reviewService: ReviewService) {}


  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.reloadUsers();
    this.searchForUser();
    if (this.currentID != undefined){
      this.review.userId = this.currentID;
    }
    
  }
  
  expandForm(){
    this.formBool = !this.formBool;
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
        this.review.userId = this.currentID;
      }
    }
  }
  
  submitForm() {
    const reviewData = {
      review1: this.review.review1,
      courseName: this.review.courseName,
      zipCode: this.review.zipCode,
      UserID: this.review.userId
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
            review1: '',
            userId: -1
          };

          this.getReviews();
          if(this.currentID != undefined) this.setCurrentUser(this.currentID);
          this.getReviews();
        },
        (error) => {
          console.error('Error submitting review:', error);
        }
      );
      this.getReviews();
  }

  editReview(review: Review) {
    review.editMode = true;
  }

  saveReview(review: Review) {
    this.http.put(`https://birdiebuddy.azurewebsites.net/api/Reviews/${review.id}`, review)
      .subscribe(
        () => {
          console.log('Review updated successfully!');
          review.editMode = false; // Disable edit mode after saving
        },
        (error) => {
          console.error('Error updating review:', error);
        }
      );
  }

  cancelEdit(review: Review) {
    review.editMode = false;
  }

  deleteReview(review: Review) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.http.delete(`https://birdiebuddy.azurewebsites.net/api/Reviews/${review.id}`)
        .subscribe(
          () => {
            console.log('Review deleted successfully!');
            this.getReviews(); // Reload the reviews after deleting
          },
          (error) => {
            console.error('Error deleting review:', error);
          }
        );
    }
  }

  setCurrentUser(id:number) {
    this.userService.findUser(id).subscribe(
      (data: User) => {
        this.currentUser = data;
      }
    )
  }

  removeReview(reviewID:number, user:User){
    if(reviewID != undefined && user.reviews != undefined){
    if (user.reviews.indexOf(reviewID) > -1){
      user.reviews.forEach((element, index)=>{
        if(element==reviewID && user.reviews != undefined) user.reviews.splice(index, 1)
      })
    }
    
      this.userService.postUser(user).subscribe()
    }
  }

  
  

  getReviews(){
    this.reviewService.getReviews().subscribe(
      (data: Review[]) => {
        this.reviews = data
      });
      console.log("current reviews: ", this.reviews)
  }

}
