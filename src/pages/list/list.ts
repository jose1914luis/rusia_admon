import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Component} from '@angular/core';
import {Network} from '@ionic-native/network';
import {Storage} from '@ionic/storage';
import {HomePage} from '../../pages/home/home';
import {CiudadPage} from '../../pages/ciudad/ciudad';
import {global} from '../../components/credenciales/credenciales';

declare var OdooApi: any;
@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {

    cargar = true;
    mensaje = '';
    conexion = global;
    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertCtrl: AlertController, private network: Network) {

        var borrar = this.navParams.get('borrar');
        //this.conexion.username = (this.navParams.get('login') == undefined)?'' : this.navParams.get('login');
        if (borrar == true) {
            this.cargar = false;
//            this.storage.remove('conexion');
//            this.storage.remove('res.users');
//            this.storage.remove('tours.guia');
//            this.storage.remove('tours.clientes.faq');
//            this.storage.remove('tours.companies');
//            this.storage.remove('tours.promociones');
//            this.storage.remove('tours.eventos');
        } else {

            this.conectarApp(false);
        }
    }

    loginSinDatos() {
        var self = this;
        this.storage.get('res.users').then((val) => {
            if (val == null) {//no existe datos

                self.presentAlert('Falla!', 'Imposible conectarse');
            } else {

                self.navCtrl.setRoot(HomePage);
            }
            self.cargar = false;
        });
    }

    conectarApp(verificar) {

        var self = this;
        if (this.network.type == 'unknown' || this.network.type == 'none') {// no hay conexion
            //if(this.network.type.toLowerCase() == 'unknown' || this.network.type.toLowerCase() == 'none'){// no hay conexion
            self.cargar = true;
            this.loginSinDatos();
        } else {

            this.storage.get('conexion').then((val) => {
                var con;
                if (val == null) {//no existe datos         
                    self.cargar = false;
                    con = self.conexion;
                    if (con.username.length < 3 || con.password.length < 3) {

                        if (verificar) {
                            self.presentAlert('Alerta!', 'Por favor ingrese usuario y contraseña');
                        }
                        return;
                    }

                } else {
                    //si los trae directamente ya fueron verificados
                    con = val;
                    if (con.username.length < 3 || con.password.length < 3) {
                        return self.cargar = false;
                    }
                }
                self.cargar = true;
                //var odoo = new Odoo(con);
                var odoo = new OdooApi(global.url, con.db);
                odoo.login(con.username, con.password).then(
                    function (uid) {

                        console.log(uid);
                        self.navCtrl.setRoot(CiudadPage);
                       
                    },
                    function () {
                        //console.log('error tranando de conectarme');
                        //self.mensaje += 'error tranando de conectarme';
                        return self.loginSinDatos();
                    }
                );
            });
        }

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
