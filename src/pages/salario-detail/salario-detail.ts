import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the SalarioDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-salario-detail',
    templateUrl: 'salario-detail.html',
})
export class SalarioDetailPage {

    item;
    editable = false;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.item = this.navParams.get('item');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SalarioDetailPage');
    }
    editar() {

        if (!this.editable) {
            this.editable = true;
        } else {
            this.editable = false;
        }
    }


}
