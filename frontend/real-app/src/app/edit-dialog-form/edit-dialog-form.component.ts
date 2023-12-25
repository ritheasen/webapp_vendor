import { Component, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-dialog-form',
  templateUrl: './edit-dialog-form.component.html',
  styleUrls: ['./edit-dialog-form.component.css']
})
export class EditDialogFormComponent {

  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;

  images:any;
  constructor(
    public dialogRef: MatDialogRef<EditDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService,
  ) {
    // Initialize form data with the received data
    this._id = data._id;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.quantity = data.quantity;
    this.imageUrl = data.imageUrl;
  }


  // title = "";
  // description = "";
  // price = 0;
  // quantity = 0;
  // imageUrl = "";

  // onSubmit(title: string, description: string, price: number, quantity: number, imageUrl: string){
    
    
  // }

  onSubmit(): void {
    // Handle form submission as needed
    const updatedData = {
      _id: this._id,
      title: this.title,
      description: this.description,
      price: this.price,
      quantity: this.quantity,
      imageUrl: this.imageUrl,
    };

    this.dataService.editProduct(this._id, updatedData).subscribe(
      (response) => {
        console.log('Product updated successfully', response);
        window.location.reload();
        this.dialogRef.close(response); // Close the dialog and pass the updated data
      },
      (error) => {
        console.error('Error updating product:', error);
        // Handle error appropriately (show error message to the user, etc.)
      }
    );
  }

  selectImage(event: any): void {
    const files = event.target.files;

    if (files && files.length > 0) {
      this.images = files[0];
    }
  }



  
}
