import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;
@Component({
    selector: 'page-salario-detail',
    templateUrl: 'salario-detail.html',
})
export class SalarioDetailPage {

    item;
    cargar = false;
    ciudad;
    ciudadList = [];
    constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {

        if (this.navParams.get('item') != null) {
            this.item = this.navParams.get('item');
            this.item.nuevo = false;
        } else {
            this.item = {
                name: '', city_id: ['', ''], sala_guia: '', total_metro: '',
                nuevo: true, editable: true
            }
        }
        var self = this;
        this.storage.get('companies').then((ciudad) => {

            console.log(ciudad);
            self.ciudadList = ciudad;
            self.ciudad = ciudad[0].name[0];
        });


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
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {

                    if (self.item.nuevo == true) {

                        console.log('nuevo');
                        console.log({
                            sala_guia: self.item.sala_guia,
                            total_metro: self.item.total_metro,
                            name: self.item.name,
                            city_id: self.ciudad
                        });
                        odoo.create('tours.gastos.generales', {
                            sala_guia: self.item.sala_guia,
                            total_metro: self.item.total_metro,
                            name: self.item.name,
                            city_id: self.ciudad
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
                    } else {

                        console.log('editar');
                        console.log({
                            sala_guia: self.item.sala_guia,
                            total_metro: self.item.total_metro,
                            name: self.item.name,
                            city_id: self.ciudad
                        });

                        odoo.write('tours.gastos.generales', self.item.id, {
                            sala_guia: self.item.sala_guia,
                            total_metro: self.item.total_metro,
                            name: self.item.name,
                            city_id: self.ciudad
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
                    }

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
