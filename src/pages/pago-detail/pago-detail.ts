import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pago-detail',
  templateUrl: 'pago-detail.html',
})
export class PagoDetailPage {

  item;
  editable = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagoDetailPage');
  }
  
   editar() {

        if (!this.editable) {
            this.editable = true;
        } else {
            this.editable = false;
        }
    }


}
