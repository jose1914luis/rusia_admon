import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-caledario-guia',
  templateUrl: 'caledario-guia.html',
})
export class CaledarioGuiaPage {

	url = '';
	constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
		var self = this;

		self.storage.get('conexion').then((conexion) => {

	        self.url = conexion.url;
        }).catch(e=>{
            console.log(e)
            //reject(null);
        });
	}	

	ionViewDidLoad() {
		console.log('ionViewDidLoad CaledarioGuiaPage');
	}

}
