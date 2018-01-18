import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the AsignarDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-asignar-detail',
    templateUrl: 'asignar-detail.html',
})
export class AsignarDetailPage {

    item;
    editable = false;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.item = this.navParams.get('item');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AsignarDetailPage');
    }


}
