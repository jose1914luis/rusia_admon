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
    tour_id;
    guia_id;
    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
        this.reservas = this.navParams.data.reservas;
        this.tour_id = this.navParams.data.tour_id;
        this.guia_id = this.navParams.data.id;
        console.log(this.guia_id); 
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ReservasPage');
    }
    ejecute(item){
        console.log(item);
//        this.navCtrl.push(ResDetailPage)
        let profileModal = this.modalCtrl.create(ResDetailPage, {item:item, tour_id:this.tour_id, guia_id:this.guia_id});
        profileModal.present();

    }
    
    addReserva(){ 
        
        let profileModal = this.modalCtrl.create(ResDetailPage, {item:null, tour_id:this.tour_id, guia_id:this.guia_id});
        profileModal.onDidDismiss(data => {
            if (data != null) {
                this.reservas.push(data);
            }
        });
        profileModal.present();
    }
    
}
