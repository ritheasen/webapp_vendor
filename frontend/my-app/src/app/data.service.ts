import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // private apiUrl = 'http://localhost:3000/api/products';

  // constructor(private http: HttpClient) {}

  // getAllData(): Observable<any> {
  //   return this.http.get(this.apiUrl);
  // }

  private apiUrl = 'http://localhost:3000/api/products'; // Your REST API URL
  private websocketUrl = 'ws://localhost:3000/ws/api/products'; // Your WebSocket URL

  private socket: WebSocketSubject<any> | undefined;

  constructor(private http: HttpClient) {}

  getAllData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  connectToWebSocket(): WebSocketSubject<any> {
    if (!this.socket || this.socket.closed) {
      this.socket = webSocket(this.websocketUrl);
    }
    return this.socket;
  }

  getDataByEachUserId(): Observable<any>{
    // const token = localStorage.getItem('userId');
    return this.http.get('http://localhost:3000/api/products/ofuser/' + localStorage.getItem('userId'));
  }
}
