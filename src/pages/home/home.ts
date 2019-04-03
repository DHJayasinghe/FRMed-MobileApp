import { Component, Input } from '@angular/core';
import { NavController, Platform, LoadingController, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera'
import { FRMedApi } from '../../service/service';
import { ProfileDetailsPage } from '../profile-details/profile-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public imageData: string;
  public showIdBtn: boolean = false;
  @Input('useURI') useURI: Boolean = false; //use base64

  profile: any = {};

  constructor(public navCtrl: NavController, private camera: Camera, private frmedApi: FRMedApi,
    private plt: Platform, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {

  }

  openDetails(params) {
    this.navCtrl.push(ProfileDetailsPage, params);
  }

  getPicture(sourceType) {
    this.camera.getPicture({
      quality: 80,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      destinationType: this.camera.DestinationType.DATA_URL, //to base64
      // destinationType: this.useURI ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 800,
      targetHeight: 1000,
      sourceType: sourceType
    }).then((imageData) => {
      if (this.useURI) {
        this.imageData = imageData;
      } else {
        this.imageData = "data:image/jpeg;base64," + imageData;
        this.showIdBtn = true;
      }
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('view loaded');
    this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      // Platform now ready, execute any required native code
      // this.getPicture(1);
    });
  }

  sendPostRequest() {
    let loading = this.loadingCtrl.create({
      content: 'searching for matching face prfoile...'
    });
    loading.present();

    this.frmedApi.getPatientDetails(this.imageData)
      .then(data => {
        console.log(JSON.stringify(data));
        loading.dismiss();

        if (data['code'] == 200) {
          this.profile = data['data'];
          this.navCtrl.push(ProfileDetailsPage, { 'profile': this.profile });
        } else {
          this.presentToast(data['text']);
        }
      });
  }

  async presentToast(toastMessage: string) {
    const toast = await this.toastCtrl.create({
      message: toastMessage,
      duration: 3000
    });
    toast.present();
  }
}
