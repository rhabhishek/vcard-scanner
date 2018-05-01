import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';


/*
  Generated class for the MsAdalServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class MsAdalServiceProvider {

  constructor(private msAdal: MSAdal, public http: HttpClient) {}

  authenticateWithADAL(){




    /*var authority = 'https://login.microsoftonline.com/common';
    AuthenticationContext = Microsoft.ADAL.AuthenticationContext;
    AuthenticationContext.createAsync(authority).then(function (context) {
    })*/

    //var authContext = new Microsoft.ADAL.AuthenticationContext('https://login.windows.net/common');
    let authContext: AuthenticationContext = this.msAdal.createAuthenticationContext('https://login.microsoft.com/');

    authContext.acquireTokenSilentAsync('https://miraclelabs.crm.dynamics.com/', '5b1e9a83-44dd-4bf6-a2e1-7fe6ceb7cc8d', 'http://localhost:8100')
      .then((authResponse: AuthenticationResult) => {
        console.log('Token is' , authResponse.accessToken);
        console.log('Token will expire on', authResponse.expiresOn);
      })
      .catch((e: any) => console.log('Authentication failed', e));
  }
}
