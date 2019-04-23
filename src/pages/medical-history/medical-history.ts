import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
    selector: 'page-medical-history',
    templateUrl: 'medical-history.html'
})
export class MedicalHistoryPage {
    descending: boolean = false;
    order: number;
    column: string = 'Description';
    medical_history: any;

    constructor(public navParams: NavParams) {
        this.medical_history = navParams.get('diagnoses');
    }

    sort(){
        this.descending = !this.descending;
        this.order = this.descending ? 1 : -1;
      }
}


