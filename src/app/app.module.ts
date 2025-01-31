import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfileDetailsPage } from '../pages/profile-details/profile-details';
import { LabHistoryPage } from '../pages/lab-history/lab-history';
import { FRMedApi } from '../service/frmed-api.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { CameraPreview } from '@ionic-native/camera-preview';
import { SortPipe } from '../pipes/sort/sort';
import { SearchPipe } from '../pipes/search/search';
import { MedicalHistoryPage } from '../pages/medical-history/medical-history';


@NgModule({
  declarations: [
    MyApp,
    LabHistoryPage,
    MedicalHistoryPage,
    ProfileDetailsPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //HTTP Client module
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LabHistoryPage,
    MedicalHistoryPage,
    ProfileDetailsPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FRMedApi, //FRMed API (Face Recognition API)
    Camera,
    CameraPreview,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
