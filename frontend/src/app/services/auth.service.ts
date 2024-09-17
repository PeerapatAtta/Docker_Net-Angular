import { Injectable, inject } from '@angular/core';
//Add module
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

//Define type of user data
type UserProfile = {
  username: string,
  email: string,
  role: string,
  token: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //DI
  private router = inject(Router);
  private cookieService = inject(CookieService);

  //New parameter for user data
  userProfile = {
    "username": "",
    "email": "",
    "role": "",
    "token": ""
  }

  //Method for save user data to cookies
  setUser(user:UserProfile){
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);

    this.cookieService.set('LoggedInUser', user['username'], expirationDate)
    this.cookieService.set('LoggedInEmail', user['email'], expirationDate)
    this.cookieService.set('LoggedInRole', user['role'], expirationDate)
    this.cookieService.set('LoggedInToken', user['token'], expirationDate)
  }

  //Method for get user data from cookies
  getUser(){
    this.userProfile.username = this.cookieService.get('LoggedInUser')||""
    this.userProfile.email = this.cookieService.get('LoggedInEmail')||""
    this.userProfile.role = this.cookieService.get('LoggedInRole')||""
    this.userProfile.token = this.cookieService.get('LoggedInToken')||""

    return this.userProfile
  }

  //Method for checking login status
  isLoggedIn(){
    return this.getUser().token !== ""
  }

  //Method for logout
  logout(){
    this.cookieService.delete('LoggedInUser')
    this.cookieService.delete('LoggedInEmail')
    this.cookieService.delete('LoggedInRole')
    this.cookieService.delete('LoggedInToken')
    this.router.navigate(['/login'])
  }
}
