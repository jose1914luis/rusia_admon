import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {ReservasPage} from '../../pages/reservas/reservas';
import {FuturasPage} from '../../pages/futuras/futuras';
import {AsignarDetailPage} from '../../pages/asignar-detail/asignar-detail';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    tab1Root;
    tab2Root;
    tab3Root;
    item;
    item2 = {item:null};
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.item = this.navParams.get('item');
        this.item2.item  = this.navParams.get('item');
        console.log(this.item);
        this.tab1Root = AsignarDetailPage;
        this.tab2Root = ReservasPage;
        this.tab3Root = FuturasPage;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TabsPage');
    }

}
