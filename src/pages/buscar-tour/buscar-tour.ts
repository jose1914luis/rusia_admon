import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {global} from '../../components/credenciales/credenciales';
import {Clipboard} from '@ionic-native/clipboard';

declare var OdooApi: any;
@Component({
    selector: 'page-buscar-tour',
    templateUrl: 'buscar-tour.html',
})
export class BuscarTourPage {

    tours = [];
    tours2 = [];
    clientes = [];
    clientes2 = [];;
    email = [];
    email2 = [];
    buscarTour = '';
    buscarCliente = '';
    buscarEmail = ''
    shouldShowCancel = true;
    item
    editable = false
    nueva = false
    cargar = false
    id_tour = 0
    id_cliente = 0
    id_email = 0;
    visible_list_tour = false
    visible_list = false;
    visible_list_email = false;
    guia_id;
    constructor(public viewCtrl: ViewController, private clipboard: Clipboard, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

        this.item = this.navParams.get('item');
        this.guia_id = this.navParams.get('guia_id');
        if (this.item == null) {
            this.item = {
                tour_id: ['', ''],
                guia_id: ['', ''],
                name: '',
                telefono: '',
                email: ['', ''],
                nombre_hotel: '',
                personas_pago: 0,
                abono_euros: 0,
                abono_dolar: 0,
                abonor_rublo: 0,
                is_sim: false,
                is_museo: false,
                observaciones: '',
                fecha: new Date().toISOString()
            }
            this.nueva = true;
            this.editable = true;
        } else {
            this.buscarCliente = this.item.name[1]
            this.buscarEmail = this.item.email[1]
            this.buscarTour = this.item.tour_id[1]
            this.id_cliente = this.item.name[0]
            this.id_email = this.item.email[0]
            this.id_tour = this.item.tour_id[0]
            this.item.fecha = new Date(this.item.fecha).toISOString()

        }
        var self = this;
        this.storage.get('tours').then((tours) => {
            self.tours = tours;
            self.tours2 = tours;
        });

        this.storage.get('clientes').then((clientes) => {
            self.clientes = clientes;
            self.clientes2 = clientes;
            //            self.padrino = clientes;
            //            self.padrino2 = clientes;
        });

        this.storage.get('email').then((email) => {
            self.email = email;
            self.email2 = email;
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BuscarTourPage');
    }

    closeModal(x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        } else {
            this.viewCtrl.dismiss(this.item);
        }
    }

    onKeyTour(e) {
        //        console.log(e);
        if (this.buscarTour.length > 0) {
            this.visible_list_tour = true;
            this.tours = [];
            for (var key in this.tours2) {
                if (String(this.tours2[key].name).toLowerCase().includes(this.buscarTour)) {
                    console.log(this.tours2[key].name);
                    this.tours.push(this.tours2[key]);
                }
            }
        } else {
            this.visible_list_tour = false;
        }

        //this.buscar.
    }

    editar() {

        if (!this.editable) {
            this.editable = true;
        } else {
            this.editable = false;
        }
    }

    onCancelTour(e) {
        self.
            console.log(e);
        this.visible_list_tour = false;
    }

    selectTour(valor) {
        this.visible_list_tour = false;
        this.buscarTour = valor.name;
        this.id_tour = valor.id;
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

    copiar(item) {
        if (!this.nueva) {
            console.log('copiado');
            this.clipboard.copy(item);
        }
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

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    guardar() {

        this.cargar = true;
        var self = this;
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {

                    if (self.nueva) {

                        var new_res = {

                            tour_id: self.id_tour,
                            name: self.id_cliente,
                            telefono: self.item.telefono,
                            nombre_hotel: self.item.nombre_hotel,
                            email: self.id_email,
                            guia_id: self.guia_id,
                            personas_pago: self.item.personas_pago,
                            abonor_rublo: self.item.abonor_rublo,
                            abono_euros: self.item.abono_euros,
                            abono_dolar: self.item.abono_dolar,
                            is_sim: self.item.is_sim,
                            is_museo: self.item.is_museo,
                            observaciones: self.item.observaciones,
                            fecha: self.formatDate(self.item.fecha)
                        };
                        console.log(new_res);

                        odoo.create('tours.clientes.reservar.futuras', new_res).then(
                            function (value2) {
                                console.log(value2);
                                if (!value2) {
                                    self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                                }
                                self.cargar = false;
                                self.viewCtrl.dismiss(new_res)
                            },
                            function () {
                                self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                            }
                        );

                    } else {

                        var old_res = {
                            name: self.id_cliente,
                            //                            tour_id: self.tour_id[0],
                            total_personas: parseInt(self.item.personas_pago) + parseInt(self.item.personas_all_in) + parseInt(self.item.personas_terceros), //calculado
                            //                            guia_id: self.guia_id,
                            //                            padrino: self.id_padrino,
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

                        //                        odoo.write('tours.clientes.middle', self.item.id, old_res).then(
                        //                            function (value2) {
                        //                                console.log(value2);
                        //                                if (!value2) {
                        //                                    self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        //                                }
                        //                                self.cargar = false;
                        //                                self.viewCtrl.dismiss(null);
                        //                            },
                        //                            function () {
                        //                                self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        //                            }
                        //                        );
                    }

                },
                function () {
                    
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
