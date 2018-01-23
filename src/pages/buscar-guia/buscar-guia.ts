import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'page-buscar-guia',
    templateUrl: 'buscar-guia.html',
})
export class BuscarGuiaPage {

    guias = [];
    guias2 = [];
    buscar = '';
    shouldShowCancel = true;
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

        var self = this;
        this.storage.get('guias').then((guias) => {
            self.guias = guias;
            self.guias2 = guias;
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BuscarTourPage');
    }
    onInput(e) {
        console.log(e);
        this.guias = [];
        for (var key in this.guias2) {
            if (String(this.guias2[key].name).toLowerCase().includes(this.buscar)) {
                console.log(this.guias2[key].name);
                this.guias.push(this.guias2[key]);
            }
        }
        //this.buscar.
    }

    onCancel(e) {
        console.log(e);
    }

    closeModal(x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        } else {
            this.viewCtrl.dismiss(x);
        }
    }
}