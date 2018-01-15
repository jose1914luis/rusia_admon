import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
    selector: 'page-tour-detail',
    templateUrl: 'tour-detail.html',
})
export class TourDetailPage {

    item;
    prx = true;
    editable = false;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.item = this.navParams.get('item');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TourDetailPage');
    }

    editar() {

        if (!this.editable) {
            this.editable = true;
        } else {
            this.editable = false;
        }
    }
}
