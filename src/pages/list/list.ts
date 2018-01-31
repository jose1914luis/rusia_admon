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
    //toursgratissanpetersburgo@gmail.com
    //IaozaK9yYncv0CdSMUux
    conexion = {tipo_a: '', grupos_id: [], bd: 'Tour_Gratis_Rusia', username: '', password: '', is_guia: false, is_chofer: false, is_promotor: false};
    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertCtrl: AlertController) {

        var borrar = this.navParams.get('borrar');
        //        this.storage.get('conexion').then((conexion) => {
        //            console.log(conexion); 
        //        });
        //this.storage.remove('conexion');
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
        
        this.storage.get('conexion').then((val) => {

            if (val == null) {//no existe datos         
                self.cargar = false;
                //                    con = self.CONEXION;
                if (self.conexion.username.length < 3 || self.conexion.password.length < 3) {

                    if (verificar) {
                        self.presentAlert('Alerta!', 'Por favor ingrese usuario y contraseña');
                    }
                    return;
                }

            } else {
                //si los trae directamente ya fueron verificados
                self.conexion = val;
            }
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
                                    if (!users[0].is_chofer && !users[0].is_guia && !users[0].is_promotor) {
                                        console.log('entro al filtro')
                                        for (let key in users[0].groups_id) {
                                            //si es 12=administrador, 14=administrador x ciudad, 15 gerente
                                            if (users[0].groups_id[key] == 15 || users[0].groups_id[key] == 14) {
                                                self.conexion.tipo_a = 'xciudad'
                                                console.log('entro al filtro')
                                            }

                                        }
                                    }

                                    //self.conexion.grupos_id  = ;
                                    self.storage.set('conexion', self.conexion);//<--- datos del usuario
                                    odoo.search_read('tours.clientes', [['id', '!=', 0]],
                                        ['name', 'telefono', 'nombre_hotel', 'email', 'is_padrino', 'active_email', 'pago_tarjeta', 'padre', 'observaciones']).then(
                                        function (clientes) {
                                            console.log(clientes)
                                            self.storage.set('clientes', clientes);//<--Todos los clientes Clientes  

                                            odoo.search_read('tours.clientes.email', [['id', '!=', 0]],
                                                ['name']).then(
                                                function (email) {
                                                    console.log(email)
                                                    self.storage.set('email', email);//<--Todos los emails
                                                    var consulta;
                                                    if (self.conexion.tipo_a == 'xciudad') {
                                                        consulta = [['administrador', '=', uid]]
                                                    } else {
                                                        consulta = [['id', '!=', '0']]
                                                    }
                                                    odoo.search_read('tours.companies', consulta, ['name', 'administrador']).then(
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
    crearCuenta() {
        //        this.navCtrl.push(CiudadPage);
    }



}
