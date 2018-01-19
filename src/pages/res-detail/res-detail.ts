import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-res-detail',
  templateUrl: 'res-detail.html',
})
export class ResDetailPage {

  item;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResDetailPage');
  }

}
