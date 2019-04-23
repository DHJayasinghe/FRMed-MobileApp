import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
    selector: 'page-lab-history',
    templateUrl: 'lab-history.html'
})
export class LabHistoryPage {
    descending: boolean = false;
    order: number;
    column: string = 'Name';
    lab_history: any;

    constructor(public navParams: NavParams) {
        this.lab_history = navParams.get('diagnoses');
    }

    sort(){
        this.descending = !this.descending;
        this.order = this.descending ? 1 : -1;
      }
}


