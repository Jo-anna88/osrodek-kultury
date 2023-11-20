import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Course} from "../course";
import {ModalBtnAction} from "../../../shared/components/modal/modal";

@Component({
  selector: 'create-update-modal-form',
  templateUrl: './create-update-modal-form.component.html',
  styleUrls: ['./create-update-modal-form.component.scss']
})
export class CreateUpdateModalFormComponent implements OnInit {
  @Input() modalTitle: string = "";
  @Input() data: Course = {name: "", teacher: "", description: ""}; // data to initialize a form in case of update action
  @Input() action: string = ""; // button action
  @Output() onCreateSubmit = new EventEmitter();
  @Output() onUpdateSubmit = new EventEmitter();
  //formFields = new Array<string>();
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    teacher: ['', Validators.required],
    description: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) {
    //console.log( "data in constructor: ", this.data) // here 'data' is still undefined
  }
  ngOnInit () {
    //this.formFields = Object.keys(this.data);
    if(this.action === ModalBtnAction.UPDATE) {this.populateForm();}
  }

  populateForm() { // to initialize fields for update form
    this.form = this.fb.group({
      name: [this.data.name, Validators.required],
      teacher: [this.data.teacher, Validators.required],
      description: [this.data.description, Validators.required],
    });
  }

  submit() {
    if(this.action === ModalBtnAction.UPDATE) { // UPDATE
      this.data.name = this.form.value.name;
      this.data.teacher = this.form.value.teacher;
      this.data.description = this.form.value.description;
      this.onUpdateSubmit.emit(this.data);
    }
    else { // CREATE
      this.onCreateSubmit.emit(new Course(this.form.value.name, this.form.value.teacher, this.form.value.description));
    }
  }
}
