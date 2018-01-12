import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {CityDetailPage} from '../../pages/city-detail/city-detail';

declare var OdooApi: any;

@Component({
    selector: 'page-ciudad',
    templateUrl: 'ciudad.html',
})
export class CiudadPage {

    items;
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

        var self = this;
        var odoo = new OdooApi(global.url, global.db);
        odoo.login(global.username, global.password).then(
            function (uid) {
                odoo.search_read('tours.companies', [['id', '!=', '0']], ['administrador', 'name']).then(
                    function (value) {
                        console.log(value);
                        self.items = value
                    },
                    function () {
                        self.presentAlert('Falla','Imposible Conectar');
                    }
                );

            },
            function () {

            }
        );
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CiudadPage');
    }
    
     presentAlert(titulo, texto) {
        const alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    }
    
    ejecute(item){
        
        this.navCtrl.push(CityDetailPage, {item: item});
    }
}
