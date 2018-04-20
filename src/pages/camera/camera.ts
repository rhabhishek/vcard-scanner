import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {DomSanitizer} from "@angular/platform-browser";
import {CardOcrServiceProvider} from "../../providers/card-ocr-service/card-ocr-service";

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  private image: string;
  private response;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    public alertCtrl: AlertController,
    private domSanitizer: DomSanitizer,
    private ocrService: CardOcrServiceProvider) {  }



  displayErrorAlert(err){
    console.log(err);
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Error while trying to capture picture',
      buttons: ['OK']
    });
    alert.present();
  }


   private b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }


  onTakePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      const contentType = 'image/jpg';
      const blob = this.b64toBlob(imageData, contentType);

       this.image = URL.createObjectURL(blob);

      // this.ocrService.imgToOCR(blob,blob.size);
      this.ocrService.imgToOCR(blob).subscribe(responseObj => {
        this.response  =  JSON.stringify(responseObj);
      });
    }, (err) => {
      this.displayErrorAlert(err);
    });
  }

}
