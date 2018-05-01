import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CameraPage } from '../pages/camera/camera';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {VcardItemPage} from "../pages/vcard-item/vcard-item";
import {Camera} from "@ionic-native/camera";
import { CameraMock } from './mocks/CameraMock';
import { CardOcrServiceProvider } from '../providers/card-ocr-service/card-ocr-service';
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {AndroidPermissions} from "@ionic-native/android-permissions";
import { ContactsServiceProvider } from '../providers/contacts-service/contacts-service';
import { MsAdalServiceProvider } from '../providers/ms-adal-service/ms-adal-service';
import {MSAdal} from "@ionic-native/ms-adal";

@NgModule({
  declarations: [
    MyApp,
    CameraPage,
    HomePage,
    TabsPage,
    VcardItemPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CameraPage,
    HomePage,
    TabsPage,
    VcardItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AndroidPermissions,
    /**Mock Declaration starts
     * Should be commented when build a mobile application**/
    { provide: Camera, useClass: CameraMock}, //for testing on browser only
    /**Mock declaration ends**/
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CardOcrServiceProvider,
    ContactsServiceProvider,
    MsAdalServiceProvider,
    MSAdal
  ]
})
export class AppModule {}
