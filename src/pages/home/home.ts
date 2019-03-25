import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera'
// import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public imageData: string;
  public showIdBtn: boolean = false;
  @Input('useURI') useURI: Boolean = false; //use base64

  constructor(private camera: Camera, public navCtrl: NavController, private http: HttpClient) {

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

  sendPostRequest() {
    let postData = {
      "FrontalFace": this.imageData,
      "email": "customer004@email.com"
    };
    this.http
      .post('http://192.168.1.3:5001/frec/api/identify', postData,
        { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
      .subscribe(data => {
        console.log("POST Request is successful ", data);
      }, error => {
        console.log("Error", error);
      }
      );
  }
}
