import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;
@Component({
    selector: 'page-asignar-detail',
    templateUrl: 'asignar-detail.html',
})
export class AsignarDetailPage {

    item;
    editable = false;
    cargar = false;
    constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {
        this.item = this.navParams.data;
        console.log(this.navParams.data);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AsignarDetailPage');
    }

    editar() {

        if (!this.editable) {
            this.editable = true;
        } else {
            this.editable = false;
        }
    }

    guardar() {

        this.cargar = true;
        var self = this;
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {

                    odoo.write('tours.guia', self.item.id, {
                        date_begin: self.item.date_begin, date_end: self.item.date_end, personas_pago: self.item.personas_pago,
                        personas_terceros: self.item.personas_terceros, personas_all_in: self.item.personas_all_in,
                        total_personas: self.item.total_personas, total_rublo: self.item.total_rublo,
                        total_dolar: self.item.total_dolar, pay_pal: self.item.pay_pal, tarjeta: self.item.tarjeta,
                        entregado: self.item.entregado, state: self.item.state, observaciones: self.item.observaciones
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
