import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the NomFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-nom-filter',
    templateUrl: 'nom-filter.html',
})
export class NomFilterPage {

    item = {
        semanaIni: '',
        semanaFin: '',
        estado: 'todos'
    }
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NomFilterPage');
    }
    
    closeModal(x) {
        if(x == 'x'){
            this.viewCtrl.dismiss(null);
        }else{
            this.viewCtrl.dismiss(this.item);
        }
        
    }

}
