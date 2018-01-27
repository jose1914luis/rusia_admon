import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {ClienteDetailPage} from '../../pages/cliente-detail/cliente-detail';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;

@Component({
    selector: 'page-clientes',
    templateUrl: 'clientes.html',
})
export class ClientesPage {

    items;
    cargar = true;

    constructor(public modalCtrl: ModalController, public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {

//        var self = this;
//        this.cargar = true;
//        self.items = [];
//        this.storage.get('conexion').then((conexion) => {
//            var odoo = new OdooApi(global.url, conexion.bd);
//            odoo.login(conexion.username, conexion.password).then(
//                function (uid) {
////                    odoo.delete('tours.clientes.email', [396],
//                    odoo.search_read('tours.clientes.email', [['id', '!=', '0']],
//                        ['email']).then(
//                        function (clientes) {
//                            console.log(clientes);
//
//                        },
//                        function () {
////                            self.cargarSinDatos()
//                        }
//                        );
//
//                },
//                function () {
////                    self.cargarSinDatos()
//                }
//            );
//        });
    }

    refresh() {
        this.ionViewDidLoad();
    }

    nuevo() {
        //        this.navCtrl.push(ClienteDetailPage, {item: null});
        var self = this;
        let profileModal = this.modalCtrl.create(ClienteDetailPage, {item: null});
        profileModal.onDidDismiss(data => {
            if (data != null) {
                self.cargarConDatos();
            }
        });
        profileModal.present();
    }

    ionViewDidLoad() {

        this.cargarConDatos();
    }

    cargarConDatos() {
        var self = this;
        this.cargar = true;
        self.items = [];
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.clientes', [['id', '!=', '0']],
                        ['name', 'ilike', 'email', 'telefono', 'nombre_hotel',
                            'active_email', 'is_padrino', 'pago_tarjeta', 'padre', 'observaciones']).then(
                        function (clientes) {

                            var ids = [];
                            for (let key in clientes) {

                                clientes[key].visible = true;
                                clientes[key].middle = [];
                                ids.push(clientes[key].id)
                            }
                            odoo.search_read('tours.clientes.middle', [['name', 'in', ids]],
                                ['tour_id', 'guia_id', 'name', 'telefono', 'email',
                                    'nombre_hotel', 'personas_terceros', 'personas_all_in', 'total_personas', 'personas_pago',
                                    'abonor_rublo', 'abono_euros', 'abono_dolar', 'dolar_exportado', 'euros_exportado', 'rublo_exportado', 'pay_pal', 'tarjeta', 'asistencia', 'observaciones', 'fecha']).then(
                                function (middle) {

                                    console.log(middle);
                                    for (let key_c in clientes) {
                                        for (let key_m in middle) {
                                            if (clientes[key_c].id == middle[key_m].name[0]) {
                                                clientes[key_c].middle.push(middle[key_m]);
                                                self.cargar = false;
                                            }
                                        }
                                    }

                                    console.log(clientes);
                                    self.items = clientes
                                    self.storage.set('clientes', self.items)
                                    self.cargar = false;
                                },
                                function () {
                                    self.presentAlert('Falla', 'Imposible Conectar');
                                }
                                );
                        },
                        function () {
                            self.cargarSinDatos()
                        }
                        );

                },
                function () {
                    self.cargarSinDatos()
                }
            );
        });
    }

    cargarSinDatos() {
        var self = this;
        this.cargar = true;
        this.storage.get('clientes').then((clientes) => {
            if (clientes != null) {
                self.items = clientes
                self.cargar = false;
            } else {

                self.presentAlert('Falla', 'Imposible Cargar Datos.');
            }
        })
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
        //        this.navCtrl.push(ClienteDetailPage, {item: item});
        this.navCtrl.push(ClienteDetailPage, {item: item});
        var self = this;
        let profileModal = this.modalCtrl.create(ClienteDetailPage, {item: null});
        profileModal.onDidDismiss(data => {
            if (data != null) {
                self.cargarConDatos();
            }
        });
        profileModal.present();
    }
}
