import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {CityDetailPage} from '../../pages/city-detail/city-detail';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;

@Component({
    selector: 'page-ciudad',
    templateUrl: 'ciudad.html',
})
export class CiudadPage {

    items;
    cargar = true;
    constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {

    }
    refresh() {
        this.ionViewDidLoad();
    }
    ionViewDidLoad() {

        var self = this; 
        this.cargar = true;
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            self.items = null;
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.companies', [['id', '!=', '0']], ['administrador', 'name']).then(
                        function (value) {
                            console.log(value);
                            self.items = value
                            self.cargar = false;
                        },
                        function () {
                            self.presentAlert('Falla', 'Imposible Conectar');
                            self.cargar = false;
                        }
                    );

                },
                function () {

                }
            );
        });

    }

    presentAlert(titulo, texto) {
        const alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    }

    ejecute(item) {

        this.navCtrl.push(CityDetailPage, {item: item});
    }
}
