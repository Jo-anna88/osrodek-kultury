import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.scss']
})
export class ButtonDeleteComponent {
    @Output()
    onDeleteEvent = new EventEmitter();
    onDelete(){
      this.onDeleteEvent.emit();
    }
}
