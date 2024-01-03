import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  isSignUp: boolean = false;
  displayName: string = ''; // Add this line
  constructor(private authService: AuthService, private router: Router) {}
    onAuthSubmit() {
    if (this.isSignUp) {
      if (!this.displayName) {
        const emailParts = this.email.split('@');
        this.displayName = emailParts[0];
      }
        this.authService.signUp(this.email, this.password, this.displayName)
        .then((userCredential) => {
                console.log('Sign-up successful', userCredential);
                this.router.navigate(['/home']);
        })
        .catch((error) => {
              console.error('Sign-up error', error);
        });
    } else {
           this.authService.signIn(this.email, this.password)
        .then((userCredential) => {
               console.log('Sign-in successful', userCredential);
               this.router.navigate(['/home']);
        })
        .catch((error) => {
                  console.error('Sign-in error', error);
        });
    }
  }

  toggleAuthMode() {
    this.isSignUp = !this.isSignUp;
  }
}
