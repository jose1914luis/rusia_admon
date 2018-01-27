import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;
@Component({
    selector: 'page-cliente-detail',
    templateUrl: 'cliente-detail.html',
})
export class ClienteDetailPage {

    editable = false;
    item;
    cargar = false;
    nuevo = false;
    constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {
        this.item = this.navParams.get('item');
        if (this.item == null) {
            this.item = {
                name: '', ilike: '', email: '', telefono: '',
                nombre_hotel: '', active_email: '', is_padrino: '',
                pago_tarjeta: '', padre: '', observaciones: '', middle: null
            }
            this.nuevo = true;
        } else {
            this.item.observaciones = this.item.observaciones ? this.item.observaciones : '';
            this.item.telefono = this.item.telefono ? this.item.telefono : '';
            this.item.nombre_hotel = this.item.nombre_hotel ? this.item.nombre_hotel : '';
        }

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClienteDetailPage');
    }

    presentAlert(titulo, texto) {
        const alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
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

                    if(self.nuevo){
                        odoo.create('tours.clientes',{
                        nombre_hotel: self.item.nombre_hotel,
                        is_padrino: self.item.is_padrino,
                        name: self.item.name,
                        observaciones: self.item.observaciones,
                        active_email: self.item.active_email,
                        telefono: self.item.telefono
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
                    }else{
                        odoo.write('tours.clientes', self.item.id, {
                        nombre_hotel: self.item.nombre_hotel,
                        is_padrino: self.item.is_padrino,
                        name: self.item.name,
                        observaciones: self.item.observaciones,
                        active_email: self.item.active_email,
                        telefono: self.item.telefono
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
                    }
                    

                },
                function () {

                }
            );
        });


    }

}
