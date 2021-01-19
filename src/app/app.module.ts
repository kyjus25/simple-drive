import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {HttpClientModule} from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconComponent} from './icon/icon.component';
import {ContextMenuModule} from 'primeng/contextmenu';
import {CardModule} from 'primeng/card';
import {TooltipModule} from 'primeng/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    ToastModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    ContextMenuModule,
    CardModule,
    TooltipModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
