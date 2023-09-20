import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  loginIn() {

    const username = this.email;
    const password = this.password;

    this.loginService.login(username, password).subscribe(
      (response) => {
        console.log('API Response:', response);

        const responseData = response.data;
        const token = responseData.token;
        const id = responseData.id;

        console.log('Login successful', response);
        console.log('Token:', token);
        console.log('ID:', id);

        this.loginService.saveTokenAndId(token, id);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Login failed. Please check your username and password.';
      }
    );
  }

  resetPassword() {
    this.password = '';
  }
}