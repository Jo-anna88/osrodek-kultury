import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'button-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.scss']
})
export class ButtonAddComponent {
    @Output()
    onAddEvent = new EventEmitter<any>();
    onAdd() {
      this.onAddEvent.emit();
    }
}
