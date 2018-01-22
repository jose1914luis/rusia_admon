import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {PagoDetailPage} from '../../pages/pago-detail/pago-detail';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;

@Component({
    selector: 'page-pago',
    templateUrl: 'pago.html',
})
export class PagoPage {

    items;
    cargar = true;
    constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {

    }

    ionViewDidLoad() {
        var self = this;
        this.storage.get('conexion').then((conexion) => {
            self.cargar = true;
            self.items = null;
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.pago.guia', [['id', '!=', '0']],
                        ['name', 'semana', 'tours_id', 'guia_user_id', 'city_id',
                            'total_eur', 'total_usd', 'total_res', 'total_rub', 'total_metro', 'pax_pago', 'state', 'concepto']).then(
                        function (value2) {
                            console.log(value2);
                            self.items = value2

                            for (let key in self.items) {

                                self.items[key].visible = true;
                            }
                            self.cargar = false;
                        },
                        function () {
                            self.presentAlert('Falla', 'Imposible Conectar');
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

        this.navCtrl.push(PagoDetailPage, {item: item});
    }

    refresh() {
        this.ionViewDidLoad();
    }

    buscar() {

        var self = this;
        let alert = this.alertCtrl.create({
            title: 'Buscar',
            inputs: [
                {
                    name: 'semIni',
                    placeholder: 'Semana Inicial'
                },
                {
                    name: 'semFin',
                    placeholder: 'Semana Final'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Buscar',
                    handler: data => {

                        if (data.semIni.length > 0 || data.semFin.length > 0 || data.fechaIni.length > 0 || data.fechaFin.length > 0) {
                            for (let key in self.items) {

                                self.items[key].visible = false;

                                if (self.items[key].semana >= data.semIni && self.items[key].semana <= data.semFin) {
                                    //                                    console.log(self.items[key]);
                                    self.items[key].visible = true;
                                }
                            }
                        } else {
                            for (let key in self.items) {

                                self.items[key].visible = true;
                            }
                        }

                    }
                }
            ]
        });
        alert.present();
    }
}

