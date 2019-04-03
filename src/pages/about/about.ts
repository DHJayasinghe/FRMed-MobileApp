import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public todo: FormGroup;
  public genderList: [{ "value": "M", "text": "Male" }, { "value": "F", "text": "Female" }];
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {
    this.todo = this.formBuilder.group({
      firstName: ['', Validators.required, Validators.minLength(3)],
      lastName: ['', Validators.required, Validators.minLength(3)],
      gender: ['M', Validators.required],
      civilStatus: ['', Validators.required],
      description: [''],
    });
  }
  logForm() {
    console.log(this.todo.value)
  }
}
