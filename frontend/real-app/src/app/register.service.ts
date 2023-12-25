import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  constructor(private http: HttpClient) { }

  register(name: string,email: string, password: string) {
    // Replace 'your-api-endpoint' with the actual endpoint of your API.
    return this.http.post('http://localhost:3000/api/users/register', { name, email, password });
  }

}
