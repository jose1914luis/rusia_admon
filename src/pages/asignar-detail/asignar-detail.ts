import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'page-asignar-detail',
    templateUrl: 'asignar-detail.html',
})
export class AsignarDetailPage {

    item;
    editable = false;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.item = this.navParams.data;
        console.log(this.navParams.data);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AsignarDetailPage');
    }


}
