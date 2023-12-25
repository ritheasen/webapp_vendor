import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email = '';
  password = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(email: string, password: string) {
    this.loginService.login(email, password).subscribe(
      (response) => {
        // Authentication successful, redirect to the homepage.
        // console.log('Login successful', response);
        this.router.navigate(['/homepage']);
      },
      (error) => {
        // Handle authentication failure (e.g., show error message).
        console.error('Login failed', error);
      }
    );
  }
}
