import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;
@Component({
    selector: 'page-pago-detail',
    templateUrl: 'pago-detail.html',
})
export class PagoDetailPage {

    item;
    editable = false;
    cargar = false;
    constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {
        this.item = this.navParams.get('item');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PagoDetailPage');
    }

    editar() {

        if (!this.editable) {
            this.editable = true;
        } else {
            this.editable = false;
        }
    }

    guardar() {

        var self = this;
        this.cargar = true;
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {

                    odoo.write('tours.pago.guia', self.item.id, {
                        name: self.item.name,
                        semana: self.item.semana,
                        total_eur: self.item.total_eur,
                        total_usd: self.item.total_usd,
                        total_res: self.item.total_res,
                        total_rub: self.item.total_rub,
                        total_metro: self.item.total_metro,
                        pax_pago: self.item.pax_pago
                    }).then(
                        function (value2) {
                            console.log(value2);
                            if (!value2) {
                                self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                            }
                            self.cargar = false;
                        },
                        function () {
                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
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

}
