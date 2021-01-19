import { Component } from '@angular/core';
import {MessageService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public search: string;
  public selected = '';
  public selectedSort;
  // public files = [];
  public view = true;

  public files = [
    {
      name: 'test.mp3',
      size: 10,
      sizeUnit: 'KB',
      path: '/uploads/test.jpg',
      type: 'audio',
      width: null,
      height: null
    }
  ]

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.fetchFiles();
  }

  public fetchFiles() {
    // window.setInterval(() => {
    //   this.http.get('/uploads').subscribe(res => {
    //     this.files = res as [];
    //   });
    // }, 3000);
    this.http.get('/uploads').subscribe(res => {
      this.files = res as [];
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Failed to fetch directory', detail: 'Verify your connection and try again'});
    });
  }

  public click(file) {
    if (this.selected !== file.name) {
      this.selected = file.name;
    } else {
      this.selected = '';
      // var win = window.open('/' + file.path, '_blank');
      // win.focus();
    }
  }
}
