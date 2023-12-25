import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  username: string = '';
  message: string = '';
  output: any[] = [];
  feedback: string = '';


  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.listen('typing').subscribe((data: any) => {
      this.updateFeedback(data);
    });

    this.chatService.listen('chat').subscribe((data: any) => {
      this.messageReceived(data);
    });
  }
  updateFeedback(data: any) {
    this.feedback = `${data} is typing a message`
  }
  messageReceived(data: any): void {
    this.feedback = '';
    if(!!!data) return;
    this.output.push(data);
  }
  
  messageTyping(): void {
    console.log("messageTyping");
    this.chatService.emit('typing', this.username);
  }

  sendMessage(): void {
    console.log({
      username: this.username,
      message: this.message
    });
    this.chatService.emit('chat', {
      username: this.username,
      message: this.message
    });
    this.message = '';
  }

}
