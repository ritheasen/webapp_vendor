import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    // Replace 'your-api-endpoint' with the actual endpoint of your API.
    return this.http.post('http://localhost:3000/api/users/login', { email, password })

    .pipe(
      // Assuming your API returns the token in the response.
      // You can modify this part based on your actual API response.
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response._id);
        }
      })
    );
  }

  currentUser() {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.log('No token found');
      return throwError('No token found');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get('http://localhost:3000/api/users/profile', { headers }).pipe(
      catchError((error) => {
        console.error('Error getting user data:', error);
        return throwError(error);
      })
    );
  }
}
