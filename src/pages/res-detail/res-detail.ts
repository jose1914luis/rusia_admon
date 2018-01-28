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
    tours = [];
    tours2 = [];
    buscar = '';
    constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController, private clipboard: Clipboard, public viewCtrl: ViewController) {
        this.item = this.navParams.get('item');
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
                observaciones: ''
            }
            this.nueva = true;
            this.editable = true;
        }
        console.log(this.item);

        var self = this;
        this.storage.get('tours').then((tours) => {
            self.tours = tours;
            self.tours2 = tours;
        });
    }

    onInput(e) {
        console.log(e);
        this.tours = [];
        for (var key in this.tours2) {
            if (String(this.tours2[key].name).toLowerCase().includes(this.buscar)) {
                console.log(this.tours2[key].name);
                this.tours.push(this.tours2[key]);
            }
        }
        //this.buscar.
    }

    onCancel(e) {
        console.log(e);
    }
    
//    closeModal(x) {
//        if (x == 'x') {
//            this.viewCtrl.dismiss(null);
//        } else {
//            this.viewCtrl.dismiss(x);
//        }
//    }

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
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {

                    if (self.nueva) {

                        console.log({
                            telefono: self.item.telefono, nombre_hotel: self.item.nombre_hotel,
                            personas_terceros: self.item.personas_terceros,
                            personas_all_in: self.item.personas_all_in, total_personas: self.item.total_personas,
                            personas_pago: self.item.personas_pago, abonor_rublo: self.item.abonor_rublo,
                            abono_euros: self.item.abono_euros, abono_dolar: self.item.abono_dolar,
                            dolar_exportado: self.item.dolar_exportado, euros_exportado: self.item.euros_exportado,
                            rublo_exportado: self.item.rublo_exportado, pay_pal: self.item.pay_pal,
                            tarjeta: self.item.tarjeta, asistencia: self.item.asistencia, observaciones: self.item.observaciones
                        });

                        //                        odoo.create('tours.clientes.middle', {
                        //                            telefono: self.item.telefono, nombre_hotel: self.item.nombre_hotel,
                        //                            personas_terceros: self.item.personas_terceros,
                        //                            personas_all_in: self.item.personas_all_in, total_personas: self.item.total_personas,
                        //                            personas_pago: self.item.personas_pago, abonor_rublo: self.item.abonor_rublo,
                        //                            abono_euros: self.item.abono_euros, abono_dolar: self.item.abono_dolar,
                        //                            dolar_exportado: self.item.dolar_exportado, euros_exportado: self.item.euros_exportado,
                        //                            rublo_exportado: self.item.rublo_exportado, pay_pal: self.item.pay_pal,
                        //                            tarjeta: self.item.tarjeta, asistencia: self.item.asistencia, observaciones: self.item.observaciones
                        //                        }).then(
                        //                            function (value2) {
                        //                                console.log(value2);
                        //                                if (!value2) {
                        //                                    self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        //                                }
                        //                                self.cargar = false;
                        //                            },
                        //                            function () {
                        //                                self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        //                            }
                        //                            );

                    } else {

                        //                        odoo.write('tours.clientes.middle', self.item.id, {
                        //                            telefono: self.item.telefono, nombre_hotel: self.item.nombre_hotel,
                        //                            personas_terceros: self.item.personas_terceros,
                        //                            personas_all_in: self.item.personas_all_in, total_personas: self.item.total_personas,
                        //                            personas_pago: self.item.personas_pago, abonor_rublo: self.item.abonor_rublo,
                        //                            abono_euros: self.item.abono_euros, abono_dolar: self.item.abono_dolar,
                        //                            dolar_exportado: self.item.dolar_exportado, euros_exportado: self.item.euros_exportado,
                        //                            rublo_exportado: self.item.rublo_exportado, pay_pal: self.item.pay_pal,
                        //                            tarjeta: self.item.tarjeta, asistencia: self.item.asistencia, observaciones: self.item.observaciones
                        //                        }).then(
                        //                            function (value2) {
                        //                                console.log(value2);
                        //                                if (!value2) {
                        //                                    self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        //                                }
                        //                                self.cargar = false;
                        //                            },
                        //                            function () {
                        //                                self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        //                            }
                        //                            );
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
