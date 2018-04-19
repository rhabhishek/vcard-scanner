import { Component } from '@angular/core';

import { CameraPage} from '../camera/camera';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CameraPage;

  constructor() {

  }
}
