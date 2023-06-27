import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { UsersService } from '../users-service.service';
import { User } from '../user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  user!: SocialUser;
  loggedIn!: boolean;
  foundUser: boolean = false;
  
  newUser: User = { name:"", email:""};
  users: User[] = [];
  constructor(private authService: SocialAuthService, private userService: UsersService) { }
 
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.reloadUsers();
  }
  
  reloadUsers(){
    this.userService.findUsers().subscribe(
      (data: User[]) => {
        this.users = data
      });
    console.log(this.users);
  }

  searchForUser(){
    if(this.user.name != null && this.newUser.name != this.user.name && this.foundUser == true){
      this.foundUser = false;
    }
    for(let i = 0; i< this.users.length; i++){
      if(this.user.name === this.users[i].name && this.user.email === this.users[i].email){
        this.foundUser = true;
      }
    }
    if(this.foundUser){
      console.log("User Was Found")
    }
    else{
      console.log("User NOT Found")
      this.postUser();
    }
  }

  postUser(){
    this.newUser.name = this.user.name;
    this.newUser.email = this.user.email;
    if(this.newUser.name != null && this.newUser.email != null){
      console.log("add attempted")
      this.userService.postUser(this.newUser).subscribe(
      () => {}
      )
      this.foundUser = true;
      this.reloadUsers();
    }
  }

  checkDBForUser(){
    this.reloadUsers();
    this.searchForUser();
  }
  
 
  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    
  }
}