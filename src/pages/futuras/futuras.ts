import {Component} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {BuscarTourPage} from '../../pages/buscar-tour/buscar-tour'


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
        let profileModal = this.modalCtrl.create(BuscarTourPage, {item: item});
        profileModal.present();

    }
    
    addFuturas(){ 
        //, {item:null, tour_id:this.tour_id, guia_id:this.guia_id}
        let profileModal = this.modalCtrl.create(BuscarTourPage);
        profileModal.onDidDismiss(data => {
//            if (data != null) {
//                this.reservas.push(data);
//            }
        });
        profileModal.present();
    }

}
