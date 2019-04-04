import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { FRMedApi } from '../../service/service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public imageData: string;
  public showIdBtn: boolean = false;
  private todo: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private camera: Camera, private frmedApi: FRMedApi,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.todo = this.formBuilder.group({
      title: ['Mr', Validators.required],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      gender: ['M', Validators.required],
      civilStatus: ['Single', Validators.required],
      description: [''],
    });
  }

  logForm() {
    console.log(this.todo.value.firstName)
    let loading = this.loadingCtrl.create({
      content: 'face prfoile registration in process...'
    });
    loading.present();

    this.frmedApi.registerPatient(this.imageData, this.todo.value)
      .then(data => {
        console.log(JSON.stringify(data));
        loading.dismiss();
        this.presentToast(data['text']);
        // if (data['code'] == 200) {
        //   this.profile = data['data'];
        //   this.navCtrl.push(ProfileDetailsPage, { 'profile': this.profile });
        // } else {
        //   this.presentToast(data['text']);
        // }
      });
  }

  getPicture(sourceType) {
    this.camera.getPicture({
      quality: 80,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      destinationType: this.camera.DestinationType.DATA_URL, //to base64
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 800,
      targetHeight: 1000,
      sourceType: sourceType
    }).then((imageData) => {
      this.imageData = "data:image/jpeg;base64," + imageData;
      this.showIdBtn = true;
    }, (err) => {
      console.log(err);
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
