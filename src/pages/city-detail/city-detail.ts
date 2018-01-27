import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {TourDetailPage} from '../../pages/tour-detail/tour-detail';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;
@Component({
    selector: 'page-city-detail',
    templateUrl: 'city-detail.html',
})
export class CityDetailPage {

    item;
    constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams) {

        this.item = this.navParams.get('item');       
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CityDetailPage');
    }

    ejecute(item) {
        this.navCtrl.push(TourDetailPage, {item: item});
    }
    nuevo() {
        this.navCtrl.push(TourDetailPage, {
            item: null
        });
    }
}
