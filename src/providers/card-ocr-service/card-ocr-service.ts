import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import 'rxjs/add/operator/map';

/*
  Generated class for the CardOcrServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardOcrServiceProvider {

  /** CamCard API
   *  URL:
   *  http://bcr1.intsig.net/BCRService/BCR_VCF2?PIN=**&user=**&pass=**&json=*&lang=**&size=**
   ********
   *  URL with parameter example:
   *  http://bcr1.intsig.net/BCRService/BCR_VCF2?PIN=&user=TestAccount&pass=TestPasswd&json=1&lang=15&size=59109
   ********
   Parameter description:
   PIN: personal identification number, can be empty if not provided
   user: your corporate email
   pass: API Key
   json: 1 means a JSON format result, 0 means vCard format result, omit to be 0
   size: size of the jpg file
   lang: languages needed to be recognized, which is a 32 bit integer
   for each bit from lower to higher indicate a specific language is needed or not, in the following sequence:

   1. English
   2. Chinese (Simplified)
   3. Chinese (Traditional)
   4. Japanese
   5. Korean
   6. French
   7. Spanish
   8. Portuguese
   9. German
   10. Italian
   11. Dutch
   12. Russian
   13. Greek
   14. Turkish
   15. Swedish
   16. Finnish
   17. Danish
   18. Norwegian
   19. Hungarian

   For example, if English, Chinese (Simplified), Chinese (Traditional) and Japanese are needed
   to be recognized, then in the 32 bit integer, the lower bits 1,2,3,4 are set to 1, and other
   bits are set 0, therefore the integer should be 15.

   */

  private pin='1';
  private userId='arattihalli@miraclesoft.com';
  private password='RWKP8R9S7L8NB34D';
  private language='1';
  private apiUrl = 'https://bcr1.intsig.net/BCRService/BCR_VCF2?';
  private jsonFlag = '1';
  private mockUrl = 'http://192.168.11.74:3000/api/ocrmock';


  constructor(private androidPermissions: AndroidPermissions,private http: HttpClient) {
    this.apiUrl+='PIN='+this.pin+'&user='+this.userId+'&pass='+this.password+'&json='+this.jsonFlag+'&lang='+this.language;

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE)
    );

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.INTERNET).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET)
    );



  }

  imgToOCR(image){

    const formData = new FormData();
    const imgBlob = new Blob([image], { type: 'image/jpg' });
    formData.append('file', imgBlob, 'image.jpg');

    console.log('in service');
      const response = this.http.post(this.apiUrl+'&size='+image.size,formData);
    console.log('response :'+ JSON.stringify(response));
    return response;
    //return this.http.post(this.mockUrl, image);


  }



}

