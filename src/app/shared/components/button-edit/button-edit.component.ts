import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'button-edit',
  templateUrl: './button-edit.component.html',
  styleUrls: ['./button-edit.component.scss']
})
export class ButtonEditComponent {
  @Output()
  onEditEvent = new EventEmitter<any>();
  onEdit() {
    this.onEditEvent.emit();
  }
}
