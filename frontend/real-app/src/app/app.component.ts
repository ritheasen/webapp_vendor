import { Component } from '@angular/core';
import * as LR from '@uploadcare/blocks';

LR.registerBlocks(LR);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'real-app';
}
