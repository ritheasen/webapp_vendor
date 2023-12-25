import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
 // Import the Socket type from 'socket.io-client' package

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: io.Socket;
  constructor() { 
    this.socket = io.connect('http://localhost:5000', { withCredentials: true, extraHeaders: {"my-custom-header": "abcd"}},);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
