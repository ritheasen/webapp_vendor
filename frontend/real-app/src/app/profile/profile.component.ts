import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { LoginService } from '../login.service';
import { DataService } from '../data.service';
import { EditDialogFormComponent } from '../edit-dialog-form/edit-dialog-form.component';
import * as LR from '@uploadcare/blocks';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,MatFormFieldModule,MatIconModule,MatInputModule,MatDialogModule,FormsModule,CommonModule
  ]
})
export class ProfileComponent implements OnInit{
  uploadFiles: LR.OutputFileEntry[] = [];
  user : any;
  itemList: any;

  constructor(private matDialog:MatDialog, private loginService: LoginService, private dataService: DataService) { }

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
        console.log('Item:', this.itemList);
        // console.log(this.itemList.imageUrl.data);
      },
      (error) => {
        console.error('Error getting user data:', error);
      }
    );
  }

    openDialog():void {
      this.matDialog.open(DialogFormComponent, { width: '300px'});
      console.log("click");
    }

    signOut():void {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      // window.location.reload();
      // I want it redirect to homepage
      window.location.href = 'http://localhost:4200/';
    }

    openEditDialog(itemId: string, title: string, description: string, price: number, quantity: number, imageUrl: string):void {
      this.matDialog.open(EditDialogFormComponent, { width: '300px',data: {
        _id: itemId,
        title: title,
        description: description,
        price: price,
        quantity: quantity,
        imageUrl: imageUrl,
      },});

      console.log("edit");
    }

    deleteDialog(item_id:string):void {
      this.dataService.deleteProduct(item_id).subscribe(
        (response) => {
          // console.log('Product deleted', response);
          window.location.reload();
        },
        (error) => {
          console.error('Product not deleted', error);
        }
      )
      // this.matDialog.open(DialogFormComponent, { width: '300px'});
      console.log("delete");
    }



  }




