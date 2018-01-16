import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SincPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sinc',
  templateUrl: 'sinc.html',
})
export class SincPage {

  item = {
      name:'',
      email:'',
      telefono:'',
      hotel:'',
      is_padrino:'',
      es_tarjeta:'',
      es_pay_pal:'',
      gracias:'',
      observaciones:''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SincPage');
  }

}
