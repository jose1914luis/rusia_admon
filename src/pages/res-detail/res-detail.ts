import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Clipboard} from '@ionic-native/clipboard';

@Component({
    selector: 'page-res-detail',
    templateUrl: 'res-detail.html',
})
export class ResDetailPage {

    item;
    constructor(public navCtrl: NavController, public navParams: NavParams, private clipboard: Clipboard, public viewCtrl: ViewController) {
        this.item = this.navParams.get('item');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ResDetailPage');
    }
    copiar(item) {
        console.log('copiado');
        this.clipboard.copy(item);
    }
    closeModal(x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        } else {
            this.viewCtrl.dismiss(this.item);
        }

    }
}
