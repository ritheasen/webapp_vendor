import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef  } from '@angular/core';
import { DataService } from '../data.service';
import { LoginService } from '../login.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as LR from '@uploadcare/blocks';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewItemComponent } from '../view-item/view-item.component';

LR.registerBlocks(LR);
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule,FormsModule],
})
export class HomepageComponent implements OnInit{
  @ViewChild('ctxProvider', { static: true }) ctxProvider!: ElementRef<typeof LR.UploadCtxProvider.prototype>;
  uploadFiles: LR.OutputFileEntry[] = [];

  uploadedImageUrl: string | null | undefined;

  data: any;
  user : any;

  searchQuery: string = '';
  filteredItems: any[] = [];
  allUsers: any[] = [];

  private searchSubject = new Subject<string>();

  constructor(private dataService: DataService, private loginService: LoginService,private matDialog:MatDialog) {}

  searchItems() {
    this.searchSubject.next(this.searchQuery.trim());
  }

  ngOnInit(): void {
    // this.ctxProvider.nativeElement.addEventListener('data-output', this.handleUploadEvent);
    // this.ctxProvider.nativeElement.addEventListener('done-flow', this.handleDoneFLow)
    this.showAllUsers();
    this.getData(); // Initial data retrieval

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchTerm) => {
      if (!searchTerm) {
        this.filteredItems = this.data; // Show all items when the search query is empty
      } else {
        this.filteredItems = this.data.filter((item: any) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    });
  

    this.loginService.currentUser().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error getting user data:', error);
      }
    );
  }

  openEachItemDialog(itemId: string, title: string, description: string, price: number, quantity: number, imageUrl: string, comment:  {
    userName: string;
    comment: string;
  }):void {
    this.matDialog.open(ViewItemComponent, { width: '900px', data:{
      _id: itemId,
      title: title,
      description:description,
      price: price,
      quantity: quantity,
      imageUrl: imageUrl,
      comment: comment,
    }});
    console.log("click");
    console.log(this.user._id, comment.userName, comment.comment);
    
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
  }

  getData() {
    this.dataService.getAllData().subscribe((response) => {
      this.data = response;
      // Set filteredItems initially to show all items
      this.filteredItems = this.data;
    });
  }

  showAllUsers() {
    this.dataService.getAllUsers().subscribe((response) => {
      this.data = response;
      this.allUsers = this.data;
      console.log(response);
    });
  }

}
