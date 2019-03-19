import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  constructor(platform: Platform, public navCtrl: NavController, cameraPreview: CameraPreview) {
    platform.ready().then(() => {
      // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
      const cameraPreviewOpts: CameraPreviewOptions = {
        x: 0,
        y: 0,
        width: platform.width(),
        height: platform.height(),
        camera: 'rear',
        tapPhoto: true,
        previewDrag: true,
        toBack: true,
        alpha: 1
      };

      // start camera
      cameraPreview.startCamera(cameraPreviewOpts).then(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        });
    });

  }

  refresh() {
    window['location'].reload();
  }
}
