import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  title = 'registerform';

  constructor(private registerService: RegisterService, private router: Router) {}

  name = '';
  email = '';
  password = '';

  onSubmit(name: string,email: string, password: string) {
    this.registerService.register(name, email, password).subscribe(
      (response) => {
        // Authentication successful, redirect to the homepage.
        // console.log('Register successful', response);
        this.router.navigate(['/loginform']);
      },
      (error) => {
        // Handle authentication failure (e.g., show error message).
        console.error('Register failed', error);
      }
    );
  }

  onClick (){
    this.router.navigate(['/loginform']);
  }
}
