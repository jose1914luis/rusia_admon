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
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { global } from '../../components/credenciales/credenciales';
import { Clipboard } from '@ionic-native/clipboard';
var BuscarTourPage = /** @class */ (function () {
    function BuscarTourPage(viewCtrl, clipboard, alertCtrl, navCtrl, navParams, storage) {
        this.viewCtrl = viewCtrl;
        this.clipboard = clipboard;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.tours = [];
        this.tours2 = [];
        this.clientes = [];
        this.clientes2 = [];
        this.email = [];
        this.email2 = [];
        this.buscarTour = '';
        this.buscarCliente = '';
        this.buscarEmail = '';
        this.shouldShowCancel = true;
        this.editable = false;
        this.nueva = false;
        this.cargar = false;
        this.id_tour = 0;
        this.id_cliente = 0;
        this.id_email = 0;
        this.visible_list_tour = false;
        this.visible_list = false;
        this.visible_list_email = false;
        this.item = this.navParams.get('item');
        this.id_guia = this.navParams.get('guia_id');
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
            };
            this.nueva = true;
            this.editable = true;
        }
        else {
            console.log(this.item);
            this.buscarCliente = this.item.name[1];
            this.buscarEmail = this.item.email[1];
            this.buscarTour = this.item.tour_id[1];
            this.id_cliente = this.item.name[0];
            this.id_email = this.item.email[0];
            this.id_tour = this.item.tour_id[0];
            this.item.fecha = new Date(this.item.fecha).toISOString();
        }
        var self = this;
        this.storage.get('tours').then(function (tours) {
            self.tours = tours;
            console.log(tours);
            self.tours2 = tours;
        });
        this.storage.get('clientes').then(function (clientes) {
            self.clientes = clientes;
            self.clientes2 = clientes;
            //            self.padrino = clientes;
            //            self.padrino2 = clientes;
        });
        this.storage.get('email').then(function (email) {
            self.email = email;
            self.email2 = email;
        });
    }
    ;
    BuscarTourPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BuscarTourPage');
    };
    BuscarTourPage.prototype.closeModal = function (x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        }
        else {
            this.viewCtrl.dismiss(this.item);
        }
    };
    BuscarTourPage.prototype.onKeyTour = function (e) {
        console.log(e);
        if (this.buscarTour.length > 0) {
            this.visible_list_tour = true;
            this.tours = [];
            for (var key in this.tours2) {
                if (String(this.tours2[key].name).toLowerCase().includes(this.buscarTour)) {
                    console.log(this.tours2[key].name);
                    this.tours.push(this.tours2[key]);
                }
            }
        }
        else {
            this.visible_list_tour = false;
        }
        //this.buscar.
    };
    BuscarTourPage.prototype.editar = function () {
        if (!this.editable) {
            this.editable = true;
        }
        else {
            this.editable = false;
        }
    };
    BuscarTourPage.prototype.onCancelTour = function (e) {
        self.
            console.log(e);
        this.visible_list_tour = false;
    };
    BuscarTourPage.prototype.selectTour = function (valor) {
        this.visible_list_tour = false;
        this.buscarTour = valor.name;
        this.id_tour = valor.id;
    };
    BuscarTourPage.prototype.onKey = function (e) {
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
        }
        else {
            this.visible_list = false;
        }
    };
    BuscarTourPage.prototype.selectNombre = function (valor) {
        this.visible_list = false;
        this.buscarCliente = valor.name;
        this.id_cliente = valor.id;
    };
    BuscarTourPage.prototype.onCancel = function (e) {
        console.log(e);
        this.visible_list = false;
    };
    BuscarTourPage.prototype.copiar = function (item) {
        if (!this.nueva) {
            console.log('copiado');
            this.clipboard.copy(item);
        }
    };
    BuscarTourPage.prototype.onKeyEmail = function (e) {
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
        }
        else {
            this.visible_list_email = false;
        }
    };
    BuscarTourPage.prototype.selectEmail = function (valor) {
        this.visible_list_email = false;
        this.buscarEmail = valor.name;
        this.id_email = valor.id;
    };
    BuscarTourPage.prototype.onCancelEmail = function (e) {
        console.log(e);
        this.visible_list_email = false;
    };
    BuscarTourPage.prototype.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    };
    BuscarTourPage.prototype.guardar = function () {
        var self = this;
        var data = {
            tour_id: self.id_tour,
            name: self.id_cliente,
            telefono: self.item.telefono,
            nombre_hotel: self.item.nombre_hotel,
            email: self.id_email,
            guia_id: self.id_guia,
            personas_pago: self.item.personas_pago,
            abonor_rublo: self.item.abonor_rublo,
            abono_euros: self.item.abono_euros,
            abono_dolar: self.item.abono_dolar,
            is_sim: self.item.is_sim,
            is_museo: self.item.is_museo,
            observaciones: self.item.observaciones,
            fecha: self.formatDate(self.item.fecha)
        };
        this.cargar = true;
        this.storage.get('conexion').then(function (conexion) {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                if (self.nueva) {
                    console.log(data);
                    odoo.create('tours.clientes.reservar.futuras', data).then(function (value2) {
                        console.log(value2);
                        if (!value2) {
                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        }
                        self.cargar = false;
                        self.viewCtrl.dismiss(data);
                    }, function () {
                        self.apilar(data, 'create', null);
                    });
                }
                else {
                    console.log(self.item.id);
                    console.log(data);
                    odoo.write('tours.clientes.reservar.futuras', self.item.id, data).then(function (value2) {
                        console.log(value2);
                        if (!value2) {
                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        }
                        self.cargar = false;
                        self.viewCtrl.dismiss(null);
                    }, function () {
                        self.apilar(data, 'write', self.item.id);
                    });
                }
            }, function () {
                if (self.nueva) {
                    self.apilar(data, 'create', null);
                }
                else {
                    self.apilar(data, 'write', self.item.id);
                }
            });
        });
    };
    BuscarTourPage.prototype.apilar = function (dato, operacion, id) {
        var self = this;
        var registro = {
            operacion: operacion,
            tabla: 'tours.clientes.middle',
            dato: dato,
            id: id
        };
        self.storage.get('offline').then(function (offline) {
            if (offline != null) {
                offline.push(registro);
            }
            else {
                var pila = [];
                pila.push(registro);
                self.storage.set('offline', pila);
            }
        });
    };
    BuscarTourPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    BuscarTourPage = __decorate([
        Component({
            selector: 'page-buscar-tour',
            templateUrl: 'buscar-tour.html',
        }),
        __metadata("design:paramtypes", [ViewController, Clipboard, AlertController, NavController, NavParams, Storage])
    ], BuscarTourPage);
    return BuscarTourPage;
}());
export { BuscarTourPage };
//# sourceMappingURL=buscar-tour.js.map