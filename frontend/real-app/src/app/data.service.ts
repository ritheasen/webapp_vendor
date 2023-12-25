import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  images:any;
  imageUrl: File | null = null;

  private apiUrl = 'http://localhost:3000/api/products'; 
  private userUrl = 'http://localhost:3000/api/users/allusers';

  constructor(private http: HttpClient) { }

  getAllData(): Observable<any> {
    console.log("get");
    
    return this.http.get(this.apiUrl);
  }

  getAllUsers(): Observable<any> {
    console.log("gett");
    return this.http.get(this.userUrl);
  }

  getDataByEachUserId(): Observable<any>{
    const token = localStorage.getItem('userId');
    return this.http.get('http://localhost:3000/api/products/ofuser/' + localStorage.getItem('userId'));
  }

  createProduct(title: string, description: string, price: number, quantity: number, imageUrl: string) {
    const token = localStorage.getItem('token');

    // console.log(title, description, price, quantity, imageUrl, token);
    
    if (!token) {
      console.log('No token found');
      return throwError('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post('http://localhost:3000/api/products/create',
      { title, description, price, quantity, imageUrl }, { headers }).pipe(
        catchError((error) => {
          console.error('Error getting user data:', error);
          return throwError(error);
        })
      );
  }

  deleteProduct(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('No token found');
      return throwError('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`http://localhost:3000/api/products/delete/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error deleting product:', error);
        return throwError(error);
      })
    );
  }

  editProduct(id: string, updatedData: any): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('No token found');
      return throwError('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch(`http://localhost:3000/api/products/update/${id}`, updatedData, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating product:', error);
        return throwError(error);
      })
    );
  }

  createComment(id: string, comment: string): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('No token found');
      return throwError('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`http://localhost:3000/api/products/${id}/comment`, { comment }, { headers }).pipe(
      catchError((error) => {
        console.error('Error creating comment:', error);
        return throwError(error);
      })
    );
  }



}
