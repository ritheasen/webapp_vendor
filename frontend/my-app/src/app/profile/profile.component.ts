import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { DataService } from '../data.service';
import { BrowserModule } from '@angular/platform-browser';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [MatButtonModule,MatButtonModule,MatFormFieldModule,MatIconModule,MatInputModule,MatDialogModule,BrowserModule],
  standalone: true,
})



export class ProfileComponent implements OnInit {

  user : any;
  itemList: any;

  constructor(private loginService: LoginService, private dataService: DataService) { }

  ngOnInit(): void {
    // Call the currentUser method and subscribe to the Observable
    this.loginService.currentUser().subscribe(
      (data) => {
        // Assign the user data to the 'user' property
        this.user = data;
        // console.log('Logged-in User:', this.user);
      },
      (error) => {
        console.error('Error getting user data:', error);
      }
    );

    this.dataService.getDataByEachUserId().subscribe(
      (itemData) => {
        // Assign the user data to the 'user' property
        this.itemList = itemData;
        // console.log('Item:', this.itemList);
      },
      (error) => {
        console.error('Error getting user data:', error);
      }
    );
  }


}
