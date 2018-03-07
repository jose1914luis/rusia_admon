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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { global } from '../../components/credenciales/credenciales';
import { Storage } from '@ionic/storage';
var SolPage = /** @class */ (function () {
    function SolPage(navCtrl, storage, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.mensaje = '';
    }
    SolPage.prototype.ionViewDidLoad = function () {
        this.cargarSinDatos();
    };
    SolPage.prototype.cargarSinDatos = function () {
        this.cargar = true;
        var self = this;
        this.items = null;
        this.storage.get('solicitudes').then(function (solicitudes) {
            if (solicitudes != null) {
                self.items = solicitudes;
                self.cargar = false;
            }
            else {
                self.cargarConDatos();
            }
        });
    };
    SolPage.prototype.cargarConDatos = function () {
        this.cargar = true;
        var self = this;
        this.items = null;
        this.storage.get('conexion').then(function (conexion) {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                odoo.search_read('tours.clientes.solicitudes', [['id', '!=', '0']], ['name', 'tour_id', 'num_person', 'date_begin', 'state', 'estado', 'comentarios', 'create_date']).then(function (solicitudes) {
                    console.log(solicitudes);
                    var ids = [];
                    for (var key in solicitudes) {
                        ids.push(solicitudes[key].name[0]);
                        solicitudes[key].mostrar = false;
                        if (solicitudes[key].state == 'borrador') {
                            solicitudes[key].mostrar = true;
                        }
                    }
                    odoo.read('tours.clientes', ids, ['email', 'telefono', 'hotel', 'nombre_hotel']).then(function (clientes) {
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
                        self.items = solicitudes;
                        self.storage.set('solicitudes', solicitudes);
                        self.cargar = false;
                    }, function () {
                        self.presentAlert('Falla', 'Imposible Cargar Datos');
                        self.cargar = false;
                    });
                }, function () {
                    self.presentAlert('Falla', 'Imposible Cargar Datos');
                    self.cargar = false;
                });
            }, function () {
                self.presentAlert('Falla', 'Imposible Cargar Datos');
                self.cargar = false;
            });
        });
    };
    SolPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    SolPage.prototype.ejecutar = function (estado, item) {
        var self = this;
        this.cargar = true;
        this.storage.get('conexion').then(function (conexion) {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                console.log(estado);
                console.log(item);
                odoo.write('tours.clientes.solicitudes', item.id, {
                    state: estado
                }).then(function (value2) {
                    console.log(value2);
                    item.mostrar = false;
                    item.state = estado;
                    if (!value2) {
                        self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                    }
                    self.cargar = false;
                }, function () {
                    self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                });
            }, function () {
            });
        });
    };
    SolPage.prototype.refresh = function () {
        this.cargarConDatos();
    };
    SolPage = __decorate([
        Component({
            selector: 'page-sol',
            templateUrl: 'sol.html',
        }),
        __metadata("design:paramtypes", [NavController, Storage, NavParams, AlertController])
    ], SolPage);
    return SolPage;
}());
export { SolPage };
//# sourceMappingURL=sol.js.map