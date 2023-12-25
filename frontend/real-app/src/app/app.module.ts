import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { EditDialogFormComponent } from './edit-dialog-form/edit-dialog-form.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    // DialogFormComponent,
    // HomepageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    EditDialogFormComponent,
    ViewItemComponent,
    ChatComponent,
  ],
  imports: [
    MatButtonModule,MatFormFieldModule,MatIconModule,MatInputModule,MatDialogModule,FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ProfileComponent,
    HttpClientModule,
    HomepageComponent,
    DialogFormComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
