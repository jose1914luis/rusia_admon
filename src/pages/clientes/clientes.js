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
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { global } from '../../components/credenciales/credenciales';
import { ClienteDetailPage } from '../../pages/cliente-detail/cliente-detail';
import { Storage } from '@ionic/storage';
var ClientesPage = /** @class */ (function () {
    function ClientesPage(modalCtrl, navCtrl, storage, navParams, alertCtrl) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.cargar = true;
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
    ClientesPage.prototype.refresh = function () {
        this.cargarConDatos();
    };
    ClientesPage.prototype.nuevo = function () {
        //        this.navCtrl.push(ClienteDetailPage, {item: null});
        var self = this;
        var profileModal = this.modalCtrl.create(ClienteDetailPage, { item: null });
        profileModal.onDidDismiss(function (data) {
            if (data != null) {
                self.cargarConDatos();
            }
        });
        profileModal.present();
    };
    ClientesPage.prototype.ionViewDidLoad = function () {
        this.cargarSinDatos();
    };
    ClientesPage.prototype.cargarConDatos = function () {
        var self = this;
        this.cargar = true;
        self.items = [];
        this.storage.get('conexion').then(function (conexion) {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                odoo.search_read('tours.clientes.email', [['id', '!=', 0]], ['id']).then(function (email) {
                    console.log(email);
                    var ide = [];
                    for (var key_e in email) {
                        ide.push(email[key_e].id);
                    }
                    self.storage.set('email', email); //<--Todos los emails
                    odoo.search_read('tours.clientes', [['email', 'in', ide]], ['name', 'ilike', 'email', 'telefono', 'nombre_hotel',
                        'active_email', 'is_padrino', 'pago_tarjeta', 'padre', 'observaciones']).then(function (clientes) {
                        console.log(clientes);
                        var ids = [];
                        for (var key in clientes) {
                            clientes[key].visible = true;
                            clientes[key].middle = [];
                            ids.push(clientes[key].id);
                        }
                        console.log(clientes);
                        self.items = clientes;
                        self.storage.set('clientes', self.items);
                        self.cargar = false;
                    }, function () {
                        self.presentAlert('Falla', 'Imposible Cargar Datos.');
                        self.cargar = false;
                    });
                }, function () {
                    self.presentAlert('Falla', 'Imposible Cargar Datos.');
                    self.cargar = false;
                });
            }, function () {
                self.presentAlert('Falla', 'Imposible Cargar Datos.');
                self.cargar = false;
            });
        });
    };
    ClientesPage.prototype.cargarSinDatos = function () {
        var self = this;
        this.cargar = true;
        this.storage.get('clientes').then(function (clientes) {
            if (clientes != null) {
                console.log('entra directo');
                self.items = clientes;
                self.cargar = false;
            }
            else {
                self.cargarConDatos();
            }
        });
    };
    ClientesPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    ClientesPage.prototype.buscar = function () {
        var self = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Buscar',
                    handler: function (data) {
                        //                        console.log(data.nombre);
                        //                        console.log(data.correo);
                        if (data.nombre.length > 2 || data.correo.length > 5) {
                            for (var key in self.items) {
                                self.items[key].visible = false;
                                //                                console.log((self.items[key].name + "").includes(data.nombre + "") + '  ' + (self.items[key].email[1] + "").includes(data.correo + ""));
                                if ((self.items[key].name + "").includes(data.nombre + "") && (self.items[key].email[1] + "").includes(data.correo + "")) {
                                    //                                    console.log(self.items[key]);
                                    self.items[key].visible = true;
                                }
                            }
                        }
                        else {
                            for (var key in self.items) {
                                self.items[key].visible = true;
                            }
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    ClientesPage.prototype.ejecute = function (item) {
        //        console.log(item);
        //        this.navCtrl.push(ClienteDetailPage, {item: item});
        //this.navCtrl.push(ClienteDetailPage, {item: item});
        var self = this;
        var profileModal = this.modalCtrl.create(ClienteDetailPage, { item: item });
        profileModal.onDidDismiss(function (data) {
            if (data != null) {
                self.cargarConDatos();
            }
        });
        profileModal.present();
    };
    ClientesPage = __decorate([
        Component({
            selector: 'page-clientes',
            templateUrl: 'clientes.html',
        }),
        __metadata("design:paramtypes", [ModalController, NavController, Storage, NavParams, AlertController])
    ], ClientesPage);
    return ClientesPage;
}());
export { ClientesPage };
//# sourceMappingURL=clientes.js.map