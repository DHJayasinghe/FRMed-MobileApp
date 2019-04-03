import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
    selector: 'page-profile-details',
    templateUrl: 'profile-details.html'
})
export class ProfileDetailsPage {
    profile: any;
    public imageData: string;
    constructor(public navCtrl: NavController,
        public navParams: NavParams, public loadingCtrl: LoadingController) {
        let profile_param = navParams.get('profile');
        this.profile = profile_param;
        this.imageData = "data:image/jpeg;base64," + this.profile['FaceImage'];
    }

    ionViewWillEnter() {
        this.getQuestions();
    }

    getQuestions() {
        // let loading = this.loadingCtrl.create({
        //   content: 'Please wait...'
        // });
        // loading.present();
        // this.questionService.getQuestionsBySlug(this.category.slug)
        // .then(res => {
        //   this.questions = res;
        //   loading.dismiss();
        // })
    }
}


