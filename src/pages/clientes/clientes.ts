import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {ClienteDetailPage} from '../../pages/cliente-detail/cliente-detail';
import {SincPage} from '../../pages/sinc/sinc';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;

@Component({
    selector: 'page-clientes',
    templateUrl: 'clientes.html',
})
export class ClientesPage {

    items;
    cargar = true;

    constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {

    }

    refresh() {
        this.ionViewDidLoad();
    }

    nuevo() {
        this.navCtrl.push(SincPage);
    }

    ionViewDidLoad() {
        var self = this;
        this.cargar = true;
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.db);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.clientes', [['id', '!=', '0']],
                        ['name', 'ilike', 'email', 'telefono', 'nombre_hotel',
                            'active_email', 'is_padrino', 'pago_tarjeta', 'padre', 'observaciones']).then(
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

    buscar() {

        var self = this;
        let alert = this.alertCtrl.create({
            title: 'Buscar',
            inputs: [
                {
                    name: 'nombre',
                    placeholder: 'Nombre'
                },
                {
                    name: 'correo',
                    placeholder: 'Correo'
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
                        //                        console.log(data.nombre);
                        //                        console.log(data.correo);
                        if (data.nombre.length > 2 || data.correo.length > 5) {
                            for (let key in self.items) {

                                self.items[key].visible = false;
                                //                                console.log((self.items[key].name + "").includes(data.nombre + "") + '  ' + (self.items[key].email[1] + "").includes(data.correo + ""));
                                if ((self.items[key].name + "").includes(data.nombre + "") && (self.items[key].email[1] + "").includes(data.correo + "")) {
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

    ejecute(item) {
        //        console.log(item);
        this.navCtrl.push(ClienteDetailPage, {item: item});
    }
}
