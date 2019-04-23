import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LabHistoryPage } from '../lab-history/lab-history';
import { MedicalHistoryPage } from '../medical-history/medical-history';

@Component({
    selector: 'page-profile-details',
    templateUrl: 'profile-details.html'
})
export class ProfileDetailsPage {
    profile: any;
    public imageData: string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.profile = navParams.get('profile');
        this.imageData = "data:image/jpeg;base64," + this.profile['FaceImage'];
    }

    getMedicalHistory() {
        this.navCtrl.push(MedicalHistoryPage, { 'diagnoses': this.profile["MedicalHistory"] });
    }

    getLabHistory() {
        this.navCtrl.push(LabHistoryPage, { 'diagnoses': this.profile["LabHistory"] });
    }
}


