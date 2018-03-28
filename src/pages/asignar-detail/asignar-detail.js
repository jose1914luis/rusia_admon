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
import { NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { global } from '../../components/credenciales/credenciales';
import { Storage } from '@ionic/storage';
var AsignarDetailPage = /** @class */ (function () {
    function AsignarDetailPage(viewCtrl, modalCtrl, navCtrl, storage, navParams, alertCtrl) {
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.editable = false;
        this.no_editable = true;
        this.cargar = false;
        this.nuevo = false;
        this.tem_date_end = new Date().toISOString();
        this.tem_date_begin = new Date().toISOString();
        this.tours = [];
        this.tours2 = [];
        this.buscarTour = '';
        this.visible_list_tour = false;
        this.id_tour = 0;
        this.guias = [];
        this.guias2 = [];
        this.buscarGuia = '';
        this.visible_list_guia = false;
        this.id_guia = 0;
        console.log(this.navParams.data);
        if (this.navParams.data != false) {
            this.item = this.navParams.data;
            this.buscarTour = this.item.tour_id[1];
            this.id_tour = this.item.tour_id[0];
            if (this.item.guia_id != "") {
                this.buscarGuia = this.item.guia_id[1];
                this.id_guia = this.item.guia_id[0];
            }
        }
        else {
            this.editable = true;
            this.nuevo = true;
            this.item = {
                id: '',
                tour_id: { id: '', name: '' },
                guia_id: { id: '', name: '' },
                date_end: '',
                date_begin: '',
                entregado: '',
                personas_pago: '',
                personas_terceros: '',
                personas_all_in: '',
                total_personas: '',
                total_euro_res: '',
                total_dolar_res: '',
                total_rublo_res: '',
                pay_pal: '',
                tarjeta: '',
                observaciones: ''
            };
        }
        var self = this;
        this.storage.get('tours').then(function (tours) {
            self.tours = tours;
            console.log(tours);
            self.tours2 = tours;
        });
        this.storage.get('guias').then(function (guias) {
            console.log(guias);
            self.guias = guias;
            self.guias2 = guias;
        });
    }
    AsignarDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AsignarDetailPage');
    };
    /*buscarGuia() {
        if (this.editable && this.no_editable) {
            var self = this;
            let profileModal = this.modalCtrl.create(BuscarGuiaPage);
            profileModal.onDidDismiss(data => {
                if (data != null) {
                    self.item.guia_id = data;
                    console.log(self.item.guia_id.name);
                }
            });
            profileModal.present();
        }
    }*/
    AsignarDetailPage.prototype.onCancelTour = function (e) {
        console.log(e);
        this.visible_list_tour = false;
    };
    AsignarDetailPage.prototype.selectTour = function (valor) {
        this.visible_list_tour = false;
        this.buscarTour = valor.name;
        this.id_tour = valor.id;
    };
    AsignarDetailPage.prototype.onKeyTour = function (e) {
        console.log(e);
        if (this.buscarTour.length > 0) {
            console.log('entro en el key ');
            this.visible_list_tour = true;
            this.tours = [];
            for (var key in this.tours2) {
                //console.log(this.tours2[key].name);
                //console.log('INSTR ' + this.buscarTour.toLowerCase())
                //console.log('condicion' + String(this.tours2[key].name).toLowerCase().includes(this.buscarTour.toLowerCase()))
                if (String(this.tours2[key].name).toLowerCase().includes(this.buscarTour.toLowerCase())) {
                    //console.log('entro en el if');
                    //console.log(this.tours2[key].name);
                    this.tours.push(this.tours2[key]);
                }
            }
        }
        else {
            this.visible_list_tour = false;
        }
        //this.buscar.
    };
    AsignarDetailPage.prototype.onCancelGuia = function (e) {
        console.log(e);
        this.visible_list_guia = false;
    };
    AsignarDetailPage.prototype.selectGuia = function (valor) {
        this.visible_list_guia = false;
        this.buscarGuia = valor.name;
        this.id_guia = valor.id;
    };
    AsignarDetailPage.prototype.onKeyGuia = function (e) {
        console.log(e);
        if (this.buscarGuia.length > 0) {
            console.log('entro en el key ');
            this.visible_list_guia = true;
            this.guias = [];
            for (var key in this.guias2) {
                //console.log(this.guias2[key].name);
                //console.log('INSTR ' + this.buscarGuia.toLowerCase())
                //console.log('condicion' + String(this.guias2[key].name).toLowerCase().includes(this.buscarGuia.toLowerCase()))
                if (String(this.guias2[key].name).toLowerCase().includes(this.buscarGuia.toLowerCase())) {
                    //console.log('entro en el if');
                    //console.log(this.guias2[key].name);
                    this.guias.push(this.guias2[key]);
                }
            }
        }
        else {
            this.visible_list_guia = false;
        }
        //this.buscar.
    };
    /*buscarTour() {
        if (this.editable && this.no_editable) {
            var self = this;
            let profileModal = this.modalCtrl.create(BuscarTourPage);
            profileModal.onDidDismiss(data => {
                if (data != null) {
                    self.item.tour_id = data;
                    console.log(self.item.tour_id.name);
                }
            });
            profileModal.present();
        }
    }*/
    AsignarDetailPage.prototype.editar = function () {
        if (!this.editable) {
            this.editable = true;
        }
        else {
            this.editable = false;
        }
    };
    AsignarDetailPage.prototype.guardar = function () {
        this.cargar = true;
        var self = this;
        var dato = {
            guia_id: self.id_guia, tour_id: self.id_tour,
            date_begin: self.item.date_begin, date_end: self.item.date_end, personas_pago: self.item.personas_pago,
            personas_terceros: self.item.personas_terceros, personas_all_in: self.item.personas_all_in,
            total_personas: self.item.total_personas, total_rublo: self.item.total_rublo, total_euro: self.item.total_euro,
            total_dolar: self.item.total_dolar, pay_pal: self.item.pay_pal, tarjeta: self.item.tarjeta,
            entregado: self.item.entregado, state: self.item.state, observaciones: self.item.observaciones
        };
        this.storage.get('conexion').then(function (conexion) {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(function (uid) {
                if (this.nuevo) {
                    odoo.create('tours.guia', dato).then(function (value2) {
                        console.log(value2);
                        if (!value2) {
                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        }
                        self.cargar = false;
                        //                            self.viewCtrl.dismiss();
                    }, function () {
                        self.apilar(dato, self.item.id);
                    });
                }
                else {
                    odoo.write('tours.guia', self.item.id, dato).then(function (value2) {
                        console.log(value2);
                        if (!value2) {
                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        }
                        self.cargar = false;
                        //                            self.viewCtrl.dismiss();
                    }, function () {
                        self.apilar(dato, self.item.id);
                    });
                }
            }, function () {
                self.apilar(dato, self.item.id);
            });
        });
    };
    AsignarDetailPage.prototype.apilar = function (dato, id) {
        var self = this;
        var registro = {
            operacion: 'write',
            tabla: 'tours.guia',
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
    AsignarDetailPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    AsignarDetailPage.prototype.calcular = function () {
        this.item.total_personas = parseInt(this.item.personas_pago) + parseInt(this.item.personas_terceros) + parseInt(this.item.personas_all_in);
    };
    AsignarDetailPage = __decorate([
        Component({
            selector: 'page-asignar-detail',
            templateUrl: 'asignar-detail.html',
        }),
        __metadata("design:paramtypes", [ViewController, ModalController, NavController, Storage, NavParams, AlertController])
    ], AsignarDetailPage);
    return AsignarDetailPage;
}());
export { AsignarDetailPage };
//# sourceMappingURL=asignar-detail.js.map