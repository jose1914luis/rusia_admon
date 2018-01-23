import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
    selector: 'page-gastos-nuevo',
    templateUrl: 'gastos-nuevo.html',
})
export class GastosNuevoPage {

    item = {
        nombre: '',
        monedad: 'EUR',
        precio: '',
        cantidad: '',
        sub_total: ''
    }
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NomFilterPage');
    }

    closeModal(x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        } else {
            this.viewCtrl.dismiss(this.item);
        }

    }

}
