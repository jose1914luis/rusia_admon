import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';

declare var OdooApi: any;
@Component({
    selector: 'page-salario-detail',
    templateUrl: 'salario-detail.html',
})
export class SalarioDetailPage {

    item;
    cargar = false;
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
        this.item = this.navParams.get('item');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SalarioDetailPage');
    }
    editar() {

        if (!this.item.editable) {
            this.item.editable = true;
        } else {
            this.item.editable = false;
        }
    }

    guardar() {

        this.cargar = true;
        var self = this;
        //
        var odoo = new OdooApi(global.url, global.db);
        odoo.login(global.username, global.password).then(
            function (uid) {


//                console.log(self.item);
                odoo.write('tours.gastos.generales', self.item.id, {
                    sala_guia: self.item.sala_guia,
                    total_metro: self.item.total_metro,
                    name: self.item.name,
                    city_id: self.item.city_id[0]
                }).then(
                    function (value2) {
                        if (!value2) {
                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        }
                        self.cargar = false;
                        //console.log(value2);
                    },
                    function () {
                        self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                    }
                    );

            },
            function () {

            }
        );

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
