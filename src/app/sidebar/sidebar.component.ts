import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public showUpload: boolean = false;
  public showFolder: boolean = false;
  public folderName: string;

  constructor(private messageService: MessageService) {}

  public onUpload(event) {
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'File has been uploaded'});
  }

  public submitFolder() {

  }
}
