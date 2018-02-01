import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {Clipboard} from '@ionic-native/clipboard';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;
@Component({
    selector: 'page-res-detail',
    templateUrl: 'res-detail.html',
})
export class ResDetailPage {

    item;
    editable = false;
    cargar = false;
    nueva = false;
    clientes = [];
    clientes2 = [];
    padrino = [];
    padrino2 = [];
    email = [];
    email2 = [];
    buscarCliente = '';
    buscarPadrino = '';
    buscarEmail = '';
    id_cliente = 0;
    id_email = 0;
    id_padrino = 0;
    visible_list = false;
    visible_list_email = false;
    visible_list_padrino = false;
    tour_id;
    guia_id;
    constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController, private clipboard: Clipboard, public viewCtrl: ViewController) {
        this.item = this.navParams.get('item');
        this.tour_id = this.navParams.get('tour_id');
        console.log(this.tour_id)
        this.guia_id = this.navParams.get('guia_id');
        console.log(this.guia_id)
        if (this.item == null) {
            this.item = {
                asistencia: false,
                name: ['', ''],
                email: ['', ''],
                telefono: '',
                personas_pago: 0,
                personas_terceros: 0,
                personas_all_in: 0,
                total_personas: 0,
                abono_euros: 0,
                abono_dolar: 0,
                abonor_rublo: 0,
                pay_pal: 0,
                tarjeta: 0,
                euros_exportado: 0,
                dolar_exportado: 0,
                rublo_exportado: 0,
                observaciones: '',
                padrino: '',
            }
            this.nueva = true;
            this.editable = true;
        } else {
            this.buscarCliente = this.item.name[1]
            this.buscarEmail = this.item.email[1]
            this.buscarPadrino = this.item.padrino[1]
            this.id_cliente = this.item.name[0]
            this.id_email = this.item.email[0]
            this.id_padrino = this.item.padrino[0]
        }
        console.log(this.item);

        var self = this;
        this.storage.get('clientes').then((clientes) => {
            self.clientes = clientes;
            self.clientes2 = clientes;
            self.padrino = clientes;
            self.padrino2 = clientes;
        });

        this.storage.get('email').then((email) => {
            self.email = email;
            self.email2 = email;
        });

    }

    onKeyPadrino(e) {
        console.log(this.buscarPadrino.length);
        if (this.buscarPadrino.length > 0) {
            this.visible_list_padrino = true;
            this.padrino = [];
            for (var key in this.padrino2) {
                if (String(this.padrino2[key].name).toLowerCase().includes(this.buscarPadrino)) {
                    //                console.log(this.tours2[key].name);
                    this.padrino.push(this.padrino2[key]);
                }
            }
        } else {
            this.visible_list_padrino = false;
        }
    }

    selectPadrino(valor) {
        this.visible_list_padrino = false;
        this.buscarPadrino = valor.name;
        this.id_padrino = valor.id;
    }
    onCancelPadrino(e) {
        console.log(e);
        this.visible_list_padrino = false;
    }

    onKey(e) {
        console.log(this.buscarCliente.length);
        if (this.buscarCliente.length > 0) {
            this.visible_list = true;
            this.clientes = [];
            for (var key in this.clientes2) {
                if (String(this.clientes2[key].name).toLowerCase().includes(this.buscarCliente)) {
                    //                console.log(this.tours2[key].name);
                    this.clientes.push(this.clientes2[key]);
                }
            }
        } else {
            this.visible_list = false;
        }
    }
    selectNombre(valor) {
        this.visible_list = false;
        this.buscarCliente = valor.name;
        this.id_cliente = valor.id;
    }
    onCancel(e) {
        console.log(e);
        this.visible_list = false;
    }


    onKeyEmail(e) {
        console.log(this.buscarEmail.length);
        if (this.buscarEmail.length > 0) {
            this.visible_list_email = true;
            this.email = [];
            for (var key in this.email2) {
                if (String(this.email2[key].name).toLowerCase().includes(this.buscarEmail)) {
                    //                console.log(this.tours2[key].name);
                    this.email.push(this.email2[key]);
                }
            }
        } else {
            this.visible_list_email = false;
        }
    }
    selectEmail(valor) {
        this.visible_list_email = false;
        this.buscarEmail = valor.name;
        this.id_email = valor.id;
    }

    onCancelEmail(e) {
        console.log(e);
        this.visible_list_email = false;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ResDetailPage');
    }
    copiar(item) {
        if (!this.nueva) {
            console.log('copiado');
            this.clipboard.copy(item);
        }
    }
    closeModal(x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        } else {
            this.viewCtrl.dismiss(this.item);
        }

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
        var dato = {
            name: self.id_cliente,
            tour_id: self.tour_id[0],
            total_personas: parseInt(self.item.personas_pago) + parseInt(self.item.personas_all_in) + parseInt(self.item.personas_terceros), //calculado
            guia_id: self.guia_id,
            padrino: self.id_padrino,
            email: self.id_email,
            telefono: self.item.telefono, nombre_hotel: self.item.nombre_hotel,
            personas_terceros: self.item.personas_terceros,
            personas_all_in: self.item.personas_all_in,
            personas_pago: self.item.personas_pago, abonor_rublo: self.item.abonor_rublo,
            abono_euros: self.item.abono_euros, abono_dolar: self.item.abono_dolar,
            pay_pal: self.item.pay_pal,
            tarjeta: self.item.tarjeta, asistencia: self.item.asistencia,
            observaciones: self.item.observaciones
        };
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {

                    if (self.nueva) {


                        console.log(dato);

                        odoo.create('tours.clientes.middle', dato).then(
                            function (value2) {
                                console.log(value2);
                                if (!value2) {
                                    self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                                }
                                self.cargar = false;
                                self.viewCtrl.dismiss(dato)
                            },
                            function () {
                                self.apilar(dato, 'create',  null)
                            }
                        );

                    } else {

//                        var old_res = {
//                            name: self.id_cliente,
//                            tour_id: self.tour_id[0],
//                            total_personas: parseInt(self.item.personas_pago) + parseInt(self.item.personas_all_in) + parseInt(self.item.personas_terceros), //calculado
//                            guia_id: self.guia_id,
//                            padrino: self.id_padrino,
//                            email: self.id_email,
//                            telefono: self.item.telefono, nombre_hotel: self.item.nombre_hotel,
//                            personas_terceros: self.item.personas_terceros,
//                            personas_all_in: self.item.personas_all_in,
//                            personas_pago: self.item.personas_pago, abonor_rublo: self.item.abonor_rublo,
//                            abono_euros: self.item.abono_euros, abono_dolar: self.item.abono_dolar,
//                            pay_pal: self.item.pay_pal,
//                            tarjeta: self.item.tarjeta, asistencia: self.item.asistencia,
//                            observaciones: self.item.observaciones
//                        };

                        odoo.write('tours.clientes.middle', self.item.id, dato).then(
                            function (value2) {
                                console.log(value2);
                                if (!value2) {
                                    self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                                }
                                self.cargar = false;
                                self.viewCtrl.dismiss(null);
                            },
                            function () {
                                self.apilar(dato, 'write',  self.item.id)
                            }
                        );
                    }
                },
                function () {
                    if (self.nueva) {
                        self.apilar(dato, 'create',  null)

                    }else{
                        self.apilar(dato, 'write',  self.item.id)
                    }
                }
            );
        });
    }

    apilar(dato, operacion, id) {

        var self = this
        var registro = {
            operacion: operacion,
            tabla: 'tours.clientes.middle',
            dato: dato,
            id: id
        }
        self.storage.get('offline').then((offline) => {

            if (offline != null) {
                offline.push(registro)
            } else {
                var pila = []
                pila.push(registro)
                self.storage.set('offline', pila)
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
}
