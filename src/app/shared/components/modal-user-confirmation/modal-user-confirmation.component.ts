import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-user-confirmation',
  templateUrl: './modal-user-confirmation.component.html',
  styleUrls: ['./modal-user-confirmation.component.scss']
})

export class ModalUserConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<ModalUserConfirmationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) {}

  @Output()
  onConfirmEvent = new EventEmitter();
  onConfirm(){
    this.onConfirmEvent.emit();
  }
}
