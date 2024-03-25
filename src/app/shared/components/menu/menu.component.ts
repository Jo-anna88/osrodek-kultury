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
  onSelectEvent: EventEmitter<number> = new EventEmitter<number>();

  selectItem(i: number) {
    console.log("selected item: ", this.items[i])
    this.onSelectEvent.emit(i);
  }
}
