import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
    selector: 'page-gastos-nuevo',
    templateUrl: 'gastos-nuevo.html',
})
export class GastosNuevoPage {

    item = {
        concepto: '',
        moneda: 'eur',
        price_unit: 0,
        unidades: 0,
        sub_total: 0
    }
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

        //this.item = this.navParams.get('con');
        console.log(this.navParams.get('con'));
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NomFilterPage');
    }

    closeModal(x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        } else {
            this.viewCtrl.dismiss(x);
        }

    }

    agregar() {
        this.closeModal(this.item)
    }

    calcular(e) {

        //        isNaN('');
        //        if (!isNaN(this.item.unidades) && !isNaN(this.item.price_unit)){
        console.log(this.item.unidades * this.item.price_unit);
        this.item.sub_total = this.item.unidades * this.item.price_unit;
        console.log(this.item.sub_total);
        //        }        
    }

}
