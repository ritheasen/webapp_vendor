import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getData(); // Initial data retrieval
    this.setupWebSocket();
  }

  getData() {
    this.dataService.getAllData().subscribe((response) => {
      this.data = response;
      // Handle the initial data as needed
    });
  }

  setupWebSocket() {
    const socket = this.dataService.connectToWebSocket();

    socket.subscribe((message) => {
      // Update your data when you receive real-time updates
      this.data = message;
    });
  }
}
