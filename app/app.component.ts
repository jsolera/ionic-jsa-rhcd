import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { UserService } from './user.service';
import { HttpClientModule} from '@angular/common/http'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  title = 'Xxxxx';
  fullname='';

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    protected userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  ngOnInit() {
    this.userService.getUser()
    .subscribe(
      (data) => { // Success
        this.fullname = 
          data['results'][0]['name']['title']
          +' ' 
          + data['results'][0]['name']['first']
          +' '  
          + data['results'][0]['name']['last']
      },
      (error) => {
        console.error(error);
      }
    );

  }
}