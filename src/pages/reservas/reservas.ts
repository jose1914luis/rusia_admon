import {Component} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {ResDetailPage} from '../../pages/res-detail/res-detail';

@Component({
    selector: 'page-reservas',
    templateUrl: 'reservas.html',
})
export class ReservasPage {

    reservas;
    editable = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
        this.reservas = this.navParams.data.reservas;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ReservasPage');
    }
    ejecute(item){
        console.log(item);
//        this.navCtrl.push(ResDetailPage)
        let profileModal = this.modalCtrl.create(ResDetailPage, {item:item});
        profileModal.present();

    }
    
}
