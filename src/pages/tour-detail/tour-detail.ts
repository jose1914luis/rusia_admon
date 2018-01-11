import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TourDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tour-detail',
  templateUrl: 'tour-detail.html',
})
export class TourDetailPage {

    item;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TourDetailPage');
  }

}
