import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'page-caledario-guia',
  templateUrl: 'caledario-guia.html',
})
export class CaledarioGuiaPage {
	
	iframe;
	constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, protected _sanitizer:DomSanitizer) {
		
		
        var self = this;

        self.storage.get('conexion').then((conexion) => {
        	self.iframe = self._sanitizer.bypassSecurityTrustHtml(conexion.url);		        
        });
	}	

	ionViewDidLoad() {
		console.log('ionViewDidLoad CaledarioGuiaPage');
	}


}
