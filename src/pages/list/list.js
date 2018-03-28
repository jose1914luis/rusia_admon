var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PanelPage } from '../../pages/panel/panel';
import { global } from '../../components/credenciales/credenciales';
var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams, storage, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.cargar = false;
        this.mensaje = '';
        //toursgratissanpetersburgo@gmail.com
        //IaozaK9yYncv0CdSMUux
        //conexion = {tipo_a: '', grupos_id: [], bd: 'Tour_Gratis_Rusia_Test', username: 'tourgratisrusia@gmail.com', password: '123456', is_guia: false, is_chofer: false, is_promotor: false};
        this.conexion = { tipo_a: '', grupos_id: [], bd: 'Tour_Gratis_Rusia', username: 'fernandez.bermudez.jonatan@gmail.com', password: '1jLl0bFcMR8TU4UI2Kh9', is_guia: false, is_chofer: false, is_promotor: false };
        var borrar = this.navParams.get('borrar');
        //        this.storage.get('conexion').then((conexion) => {
        //            console.log(conexion); 
        //        });
        //this.storage.remove('conexion');
        //this.storage.remove('guia');
        if (borrar == true) {
            this.cargar = false;
            this.storage.remove('conexion');
            this.storage.remove('offline');
            this.storage.remove('guia');
        }
        else {
            this.conectarApp(false);
        }
    }
    ListPage.prototype.loginSinDatos = function () {
        var self = this;
        this.storage.get('conexion').then(function (val) {
            if (val != null) {
                self.navCtrl.setRoot(PanelPage);
            }
            else {
                self.presentAlert('Falla', 'Imposible Conectar. Verifique sus credenciales.');
                self.cargar = false;
            }
        });
    };
    ListPage.prototype.conectarApp = function (verificar) {
        var self = this;
        this.storage.get('conexion').then(function (val) {
            //console.log('muestre val 1')
            console.log(val);
            if (val == null) {
                self.cargar = false;
                //                    con = self.CONEXION;
                if (self.conexion.username.length < 3 || self.conexion.password.length < 3) {
                    if (verificar) {
                        self.presentAlert('Alerta!', 'Por favor ingrese usuario y contraseña');
                    }
                    return;
                }
            }
            else {
                //si los trae directamente ya fueron verificados
                self.conexion = val;
            }
            self.cargar = true;
            var odoo = new OdooApi(global.url, self.conexion.bd);
            odoo.login(self.conexion.username, self.conexion.password).then(function (uid) {
                console.log(uid);
                odoo.search_read('tours', [['id', '<>', '0']], ['name']).then(function (tours) {
                    //                        console.log(tours);
                    self.storage.set('tours', tours); //<--- lista de los tours 
                    odoo.read('res.users', [uid], ['name', 'email', 'city_id', 'is_guia', 'is_chofer', 'is_promotor', 'salario_ext', 'salario_min',
                        'active', 'groups_id']).then(function (users) {
                        console.log(users);
                        self.conexion.is_chofer = users[0].is_chofer;
                        self.conexion.is_guia = users[0].is_guia;
                        self.conexion.is_promotor = users[0].is_promotor;
                        if (!users[0].is_chofer && !users[0].is_guia && !users[0].is_promotor) {
                            console.log('entro al filtro');
                            for (var key in users[0].groups_id) {
                                //si es 12=administrador, 14=administrador x ciudad, 15 gerente
                                if (users[0].groups_id[key] == 15 || users[0].groups_id[key] == 14) {
                                    self.conexion.tipo_a = 'xciudad';
                                    console.log('entro al filtro');
                                }
                            }
                        }
                        //self.conexion.grupos_id  = ;
                        self.storage.set('conexion', self.conexion); //<--- datos del usuario
                        /*self.storage.get('conexion').then((val_p) => {
                            console.log('muestre val_p 1')
                            console.log(val_p)
                        })*/
                        self.navCtrl.setRoot(PanelPage);
                    }, function () {
                        self.loginSinDatos();
                    });
                }, function () {
                    self.loginSinDatos();
                });
            }, function () {
                self.loginSinDatos();
            });
        });
    };
    ListPage.prototype.presentAlert = function (titulo, texto) {
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    };
    ListPage.prototype.crearCuenta = function () {
        //        this.navCtrl.push(CiudadPage);
    };
    ListPage = __decorate([
        Component({
            selector: 'page-list',
            templateUrl: 'list.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage, AlertController])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.js.map