import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  @Input() type: string;
}
