import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'page-buscar-tour',
    templateUrl: 'buscar-tour.html',
})
export class BuscarTourPage {

    tours = [];
    tours2 = [];
    buscar = '';
    shouldShowCancel = true;
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

        var self = this;
        this.storage.get('tours').then((tours) => {
            self.tours = tours;
            self.tours2 = tours;
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BuscarTourPage');
    }
    onInput(e) {
        console.log(e);
        this.tours = [];
        for (var key in this.tours2) {
            if (String(this.tours2[key].name).toLowerCase().includes(this.buscar)) {
                console.log(this.tours2[key].name);
                this.tours.push(this.tours2[key]);
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
