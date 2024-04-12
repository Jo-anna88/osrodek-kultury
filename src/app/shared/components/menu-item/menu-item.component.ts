import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input()
  data: string = ""
  @Output()
  onSelect = new EventEmitter();
}
