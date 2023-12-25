import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent {
  comment = "";

  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  comments: {
    userName: string;
    comment: string;
  }[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dataService: DataService) { 
    this._id = data._id;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.quantity = data.quantity;
    this.imageUrl = data.imageUrl;
    this.comments = data.comment;

    console.log("comment", this.comments[0]?.userName, this.comments[0]?.comment);

    console.log("viewitem", this._id, this.title, this.description, this.price, this.quantity, this.imageUrl, this.comments);
    
  }

  onCreate(comment: string) {
    this.dataService.createComment(this._id, comment).subscribe((response) => {
      console.log("response", response);
      this.comments = response.comments;
      window.location.reload();
    });
  }

  
  
  // onClick(): void {
  //   const viewData = {
  //     _id: this._id,
  //     title: this.title,
  //     description: this.description,
  //     price: this.price,
  //     quantity: this.quantity,
  //     imageUrl: this.imageUrl,
  //   };
  // }

}
