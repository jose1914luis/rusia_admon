import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;

@Component({
    selector: 'page-sol',
    templateUrl: 'sol.html',
})
export class SolPage {

    items;
    cargar;
    mensaje = '';
    constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {

        this.cargarSinDatos();
    }

    cargarSinDatos() {

        this.cargar = true
        var self = this;
        this.items = null;

        this.storage.get('solicitudes').then((solicitudes) => {
            console.log(solicitudes);
            if (solicitudes != null) {
                self.items = solicitudes;
                self.cargar = false;
            } else {
                self.cargarConDatos();
            }
        });
    }

    cargarConDatos() {

        this.cargar = true
        var self = this;
        this.items = null;

        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.clientes.solicitudes', [['id', '!=', '0']],
                        ['name', 'tour_id', 'num_person', 'date_begin', 'state', 'estado', 'comentarios', 'create_date']).then(
                        function (solicitudes) {
                            console.log(solicitudes);

                            var ids = [];
                            for (var key in solicitudes) {
                                ids.push(solicitudes[key].name[0]);
                                solicitudes[key].mostrar = false;
                                if (solicitudes[key].state == 'borrador') {
                                    solicitudes[key].mostrar = true;
                                }
                            }
                            odoo.read('tours.clientes', ids,
                                ['email', 'telefono', 'hotel', 'nombre_hotel']).then(
                                function (clientes) {

                                    for (var key2 in solicitudes) {
                                        for (var key in clientes) {
                                            if (solicitudes[key2].name[0] == clientes[key].id) {
                                                solicitudes[key2].nombre_hotel = clientes[key].nombre_hotel;
                                                solicitudes[key2].telefono = clientes[key].telefono;
                                                solicitudes[key2].email = clientes[key].email;
                                            }
                                        }
                                    }
                                    console.log(solicitudes);
                                    self.items = solicitudes

                                    self.storage.set('solicitudes', solicitudes)
                                    self.cargar = false;
                                },
                                function () {
                                    self.presentAlert('Falla', 'Imposible Cargar Datos');
                                    self.cargar = false;
                                }
                                );

                        },
                        function () {
                            self.presentAlert('Falla', 'Imposible Cargar Datos');
                            self.cargar = false;
                        }
                        );

                },
                function () {
                    self.presentAlert('Falla', 'Imposible Cargar Datos');
                    self.cargar = false;
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

    ejecutar(estado, item) {

        var self = this;
        this.cargar = true;
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {

                    console.log(estado);
                    console.log(item);

                    odoo.write('tours.clientes.solicitudes', item.id, {
                        state: estado
                    }).then(
                        function (value2) {
                            console.log(value2);
                            item.mostrar = false;
                            item.state = estado;
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
    refresh() {
        this.cargarConDatos();
    }

}
