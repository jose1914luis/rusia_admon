var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { global } from '../../components/credenciales/credenciales';
import { Storage } from '@ionic/storage';
var ClienteDetailPage = /** @class */ (function () {
    function ClienteDetailPage(viewCtrl, navCtrl, storage, navParams, alertCtrl) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.editable = false;
        this.cargar = false;
        this.nuevo = false;
        this.mensaje = '';
        this.item = this.navParams.get('item');
        if (this.item == null) {
            this.item = {
                name: '', ilike: '', email: ['', ''], telefono: '',
                nombre_hotel: '', active_email: false, is_padrino: false,
                pago_tarjeta: false, padre: '', observaciones: '', middle: null
            };
            this.nuevo = true;
            this.editable = true;
        }
        else {
            var self = this;
            this.cargar = true;
            this.mensaje = 'Cargando...';
            //        self.items = [];
            //            console.log(self.item.name)
            this.storage.get('conexion').then(function (conexion) {
                var odoo = new OdooApi(global.url, conexion.bd);
                odoo.login(conexion.username, conexion.password).then(function (uid) {
                    odoo.search_read('tours.clientes.middle', [['name', '=', self.item.id]], ['tour_id', 'guia_id', 'name', 'telefono', 'email',
                        'nombre_hotel', 'personas_terceros', 'personas_all_in', 'total_personas', 'personas_pago',
                        'abonor_rublo', 'abono_euros', 'abono_dolar', 'dolar_exportado', 'euros_exportado', 'rublo_exportado', 'pay_pal', 'tarjeta', 'asistencia', 'observaciones', 'fecha']).then(function (middle) {
                        self.item.middle = middle;
                        console.log(self.item);
                        self.cargar = false;
                    }, function () {
                        self.presentAlert('Falla', 'Imposible Conectar');
                    });
                }, function () {
                });
            });
            this.item.observaciones = this.item.observaciones ? this.item.observaciones : '';
            this.item.telefono = this.item.telefono ? this.item.telefono : '';
            this.item.nombre_hotel = this.item.nombre_hotel ? this.item.nombre_hotel : '';
        }
    }
    ClienteDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ClienteDetailPage');
    };
    ClienteDetailPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    ClienteDetailPage.prototype.editar = function () {
        if (!this.editable) {
            this.editable = true;
        }
        else {
            this.editable = false;
        }
    };
    ClienteDetailPage.prototype.closeModal = function (x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        }
        else {
            this.viewCtrl.dismiss(x);
        }
    };
    ClienteDetailPage.prototype.guardar = function () {
        this.cargar = true;
        this.mensaje = 'Guardando...';
        var self = this;
        this.storage.get('conexion').then(function (conexion) {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                if (self.nuevo) {
                    //                        console.log({
                    //                            nombre_hotel: self.item.nombre_hotel,
                    //                            is_padrino: self.item.is_padrino,
                    //                            name: self.item.name,
                    //                            email: self.item.email[1],
                    //                            observaciones: self.item.observaciones,
                    //                            active_email: self.item.active_email,
                    //                            telefono: self.item.telefono,
                    //                            pago_tarjeta: self.item.pago_tarjeta
                    //                        });
                    odoo.create('tours.clientes.email', {
                        email: self.item.email[1],
                    }).then(function (email) {
                        console.log(email);
                        if (!email) {
                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        }
                        //                                self.cargar = false;
                        odoo.create('tours.clientes', {
                            nombre_hotel: self.item.nombre_hotel,
                            is_padrino: self.item.is_padrino,
                            name: self.item.name,
                            email: email,
                            observaciones: self.item.observaciones,
                            active_email: self.item.active_email,
                            telefono: self.item.telefono,
                            pago_tarjeta: self.item.pago_tarjeta
                        }).then(function (clientes) {
                            console.log(clientes);
                            if (!clientes) {
                                self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                            }
                            self.closeModal('n');
                            self.cargar = false;
                        }, function () {
                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        });
                    }, function () {
                        self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                    });
                    odoo.create('tours.clientes', {
                        nombre_hotel: self.item.nombre_hotel,
                        is_padrino: self.item.is_padrino,
                        name: self.item.name,
                        email: self.item.email[1],
                        observaciones: self.item.observaciones,
                        active_email: self.item.active_email,
                        telefono: self.item.telefono,
                        pago_tarjeta: self.item.pago_tarjeta
                    }).then(function (value2) {
                        console.log(value2);
                        if (!value2) {
                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        }
                        self.closeModal('n');
                        self.cargar = false;
                    }, function () {
                        self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                    });
                }
                else {
                    odoo.write('tours.clientes', self.item.id, {
                        nombre_hotel: self.item.nombre_hotel,
                        is_padrino: self.item.is_padrino,
                        name: self.item.name,
                        observaciones: self.item.observaciones,
                        active_email: self.item.active_email,
                        telefono: self.item.telefono
                    }).then(function (value2) {
                        console.log(value2);
                        if (!value2) {
                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        }
                        self.cargar = false;
                        self.closeModal('n');
                    }, function () {
                        self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                    });
                }
            }, function () {
            });
        });
    };
    ClienteDetailPage = __decorate([
        Component({
            selector: 'page-cliente-detail',
            templateUrl: 'cliente-detail.html',
        }),
        __metadata("design:paramtypes", [ViewController, NavController, Storage, NavParams, AlertController])
    ], ClienteDetailPage);
    return ClienteDetailPage;
}());
export { ClienteDetailPage };
//# sourceMappingURL=cliente-detail.js.map