import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {PanelPage} from '../../pages/panel/panel';
import {global} from '../../components/credenciales/credenciales';

declare var OdooApi: any;
@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {

    cargar = false;
    mensaje = '';
    conexion = {bd: 'Tour_Gratis_Rusia_Test', username: 'fernandez.bermudez.jonatan@gmail.com', password: '123456', is_guia: false, is_chofer: false, is_promotor: false};
    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertCtrl: AlertController) {

        var borrar = this.navParams.get('borrar');
        //        this.storage.get('conexion').then((conexion) => {
        //            console.log(conexion); 
        //        });
        this.storage.remove('conexion');
        if (borrar == true) {
            this.cargar = false;
            this.storage.remove('conexion');
        } else {

            this.conectarApp(false);
        }
    }

    loginSinDatos() {
        var self = this;
        this.storage.get('conexion').then((val) => {
            if (val != null) {self.navCtrl.setRoot(PanelPage)} else {
                self.presentAlert('Falla', 'Imposible Conectar. Verifique sus credenciales.');
                self.cargar = false;
            }
        });
    }

    conectarApp(verificar) {

        var self = this;
        if (self.conexion.username.length < 5 && self.conexion.password.length < 4) return;
        self.cargar = true;
        var odoo = new OdooApi(global.url, self.conexion.bd);
        odoo.login(self.conexion.username, self.conexion.password).then(
            function (uid) {
                console.log(uid);
                odoo.search_read('tours', [['id', '<>', '0']], ['name']).then(
                    function (tours) {
                        //                        console.log(tours);
                        self.storage.set('tours', tours)//<--- lista de los tours 
                        odoo.read('res.users', [uid],
                            ['name', 'email', 'city_id', 'is_guia', 'is_chofer', 'is_promotor', 'salario_ext', 'salario_min',
                                'active', 'groups_id']).then(
                            function (users) {
                                console.log(users);
                                self.conexion.is_chofer = users[0].is_chofer;
                                self.conexion.is_guia = users[0].is_guia;
                                self.conexion.is_promotor = users[0].is_promotor;
                                self.storage.set('conexion', self.conexion);
                                odoo.search_read('tours.clientes', [['id', '!=', 0]],
                                    ['name', 'telefono', 'nombre_hotel', 'email', 'is_padrino', 'active_email', 'pago_tarjeta', 'padre', 'observaciones']).then(
                                    function (clientes) {
                                        console.log(clientes)
                                        self.storage.set('clientes', clientes);//<--Clientes  

                                        odoo.search_read('tours.clientes.email', [['id', '!=', 0]],
                                            ['name']).then(
                                            function (email) {
                                                console.log(email)
                                                self.storage.set('email', email);//<--Clientes  
                                                odoo.search_read('tours.companies', [['id', '!=', 0]], ['name', 'administrador']).then(
                                                    function (companies) {
                                                        console.log(companies);
                                                        self.storage.set('companies', companies); //<--- Todas las Ciudades
                                                        var ban = true;

                                                        for (var key = 0; companies.length > key; key++) {

                                                            (function (key) {
                                                                console.log(key);

                                                                if (companies[key].administrador[0] == uid) {
                                                                    odoo.search_read('res.users', [['city_id', '=', companies[key].name[0]], ['active', '=', 1]],
                                                                        ['name']).then(
                                                                        function (guias) {
                                                                            console.log(guias)
                                                                            self.storage.set('guias', guias);//<--Guias si los hay                      
                                                                        }, function () {
                                                                            self.loginSinDatos();
                                                                        }
                                                                        )
                                                                }
                                                            })(key);
                                                        }

                                                        self.navCtrl.setRoot(PanelPage);

                                                    },
                                                    function () {
                                                        self.loginSinDatos();
                                                    });

                                            }, function () {
                                                self.loginSinDatos();
                                            }
                                            )

                                    }, function () {
                                        self.loginSinDatos();
                                    }
                                    )


                            },
                            function () {
                                self.loginSinDatos();
                            }
                            );
                    },
                    function () {
                        self.loginSinDatos();
                    }
                );

            },
            function () {
                self.loginSinDatos()
            }
        );

    }

    presentAlert(titulo, texto) {
        const alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    }
    crearCuenta() {
        //        this.navCtrl.push(CiudadPage);
    }



}
