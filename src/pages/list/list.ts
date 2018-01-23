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
    conexion = {bd: 'Tour_Gratis_Rusia_Test', username: 'toursgratismoscu@gmail.com', password: '123456', is_guia: false, is_chofer: false};
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
                odoo.read('res.users', [uid],
                    ['name', 'email', 'city_id', 'is_guia', 'is_chofer', 'salario_ext', 'salario_min',
                        'active', 'groups_id']).then(
                    function (value2) {
                        console.log(value2);
                        self.conexion.is_chofer = value2[0].is_chofer;
                        self.conexion.is_guia = value2[0].is_guia;
                        self.storage.set('conexion', self.conexion);
                        self.navCtrl.setRoot(PanelPage);

                    },
                    function () {
                        self.loginSinDatos();
                    }
                    );
                //                
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
