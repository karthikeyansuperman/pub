import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatapp';
  email: string = '';
  password: string = '';
  signInError: string = '';  // New variable to hold the sign-in error message
user:any;
  constructor(private authService: AuthService) {}

  onSignInSubmit(): void {
    this.authService.signIn(this.email, this.password)
      .then(() => {
        // Sign-in successful, you can navigate to another page or handle as needed
        console.log('Sign-in successful');
        this.signInError = ''; // Clear any previous error messages
      })
      .catch(error => {
        // Handle sign-in errors
        console.error('Error signing in:', error);
        this.signInError = 'Error signing in. Please check your credentials and try again.';
      });
  }

}