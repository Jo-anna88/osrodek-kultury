import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input()
  title: string = "";
  @Input()
  items: string[] = []
  @Input()
  isItemDeletable: boolean = false;
  @Input()
  isItemUpdatable: boolean = false;
  @Input()
  menuColor: string = "";
  @Output()
  onSelectEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  onDeleteEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  onUpdateEvent: EventEmitter<number> = new EventEmitter<number>();

}
