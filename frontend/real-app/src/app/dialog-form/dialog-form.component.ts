import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { response } from 'express';
import { NgForm } from '@angular/forms';
import * as LR from '@uploadcare/blocks';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

LR.registerBlocks(LR);

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class DialogFormComponent implements OnInit {
  @ViewChild('form', { static: false }) form!: NgForm;
  @ViewChild('ctxProvider', { static: true }) ctxProvider!: ElementRef<typeof LR.UploadCtxProvider.prototype>;
  uploadFiles: LR.OutputFileEntry[] = [];

  

  // title: string = ''; // Initialize with default values
  // description: string = '';
  // price: number = 0;
  // quantity: number = 0;
  // imageUrl = "";
  // imageUrl: File | null = null;
  
  images:any;
  constructor(private dataService: DataService){}

  title = "";
  description = "";
  price = 0;
  quantity = 0;
  imageUrl = "";

  uploadedImageUrl: string | null | undefined;

  // imageUrl: File | null = null;

  ngOnInit(): void {
    this.ctxProvider.nativeElement.addEventListener('data-output', this.handleUploadEvent);
    this.ctxProvider.nativeElement.addEventListener('done-flow', this.handleDoneFLow)
  }

  selectImage(event: any): void {
    const files = event.target.files;

    if (files && files.length > 0) {
      this.images = files[0];
    }
  }

  handleUploadEvent = (e: Event) => {
    console.log(this.uploadFiles);
    
    
    if (!(e instanceof CustomEvent)) {
      return;
    }

    if (e.detail) {
      this.uploadFiles = e.detail as LR.OutputFileEntry[];
    }
    
  }

  handleDoneFLow = (e:Event) => {
    
    console.log('handleDoneFlow');
    // use cdnUrl and save it to mongodb
    console.log(this.uploadFiles);
    console.log(this.uploadFiles[0].cdnUrl);

    this.uploadedImageUrl = this.uploadFiles[0]?.cdnUrl;
    this.imageUrl = this.uploadFiles[0]?.cdnUrl || "";
  }

  onSubmit(title: string, description: string, price: number, quantity: number, imageUrl: string){
    
    this.dataService.createProduct(title, description, price, quantity, imageUrl).subscribe(
      (response) => {
        // console.log(title, description, price, quantity, imageUrl);
        // console.log('Product created', response);
        window.location.reload();
      },
      (error) => {
        console.error('Product not created', error);
      }
    );



    // onSubmit(title: string, description: string, price: number, quantity: number): void {
    //   if (!this.imageUrl) {
    //     console.error('No image selected');
    //     return;
    //   }
  
    //   this.dataService.createProduct(title, description, price, quantity, this.imageUrl).subscribe(
    //     (response) => {
    //       console.log('Product created successfully:', response);
    //       window.location.reload();
    //     },
    //     (error) => {
    //       console.error('Error creating product:', error);
    //     }
    //   );
    // }


    // const formData = new FormData();
    // formData.append('file', this.images);

    // this.http.post<any>('http://localhost:3000/api/products/create', formData).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );
  }
}
