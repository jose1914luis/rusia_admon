import {Component} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';



@Component({
    selector: 'page-futuras',
    templateUrl: 'futuras.html',
})
export class FuturasPage {

    futuras;
    editable = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
        this.futuras = this.navParams.data.futuras;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ReservasPage');
    }
    ejecute(item) {
        console.log(item);
        //        this.navCtrl.push(ResDetailPage)
//        let profileModal = this.modalCtrl.create(ResDetailPage, {item: item});
//        profileModal.present();

    }

}
