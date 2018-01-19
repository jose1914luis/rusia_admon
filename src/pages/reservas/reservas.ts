import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ResDetailPage} from '../../pages/res-detail/res-detail';

@Component({
    selector: 'page-reservas',
    templateUrl: 'reservas.html',
})
export class ReservasPage {

    reservas;
    editable = false;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.reservas = this.navParams.data.reservas;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ReservasPage');
    }
    ejecute(item){
        console.log(item);
        this.navCtrl.push(ResDetailPage, {item:item})
    }
}
