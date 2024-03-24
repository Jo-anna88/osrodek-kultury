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
  menuColor: string = "";
  @Output()
  selectedItemIdxEvent: EventEmitter<number> = new EventEmitter<number>();

  selectItem(i: number) {
    console.log("selected item: ", this.items[i])
    this.selectedItemIdxEvent.emit(i);
  }
}
