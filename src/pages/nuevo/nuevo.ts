import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-nuevo',
  templateUrl: 'nuevo.html',
})
export class NuevoPage {

  item = {
      codigo:'F'
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoPage');
  }

}
