import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {HomePage} from '../../pages/home/home';
import {AsignarPage} from '../../pages/asignar/asignar';
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
    bd = 'Free_Tour_Russia';
    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertCtrl: AlertController) {

        var borrar = this.navParams.get('borrar');
        //this.conexion.username = (this.navParams.get('login') == undefined)?'' : this.navParams.get('login');
        if (borrar == true) {
            this.cargar = false;
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
        var odoo = new OdooApi(global.url, global.db); 
        odoo.login(global.username, global.password).then(
            function (uid) {

                console.log(uid);
                self.navCtrl.setRoot(AsignarPage);

            },
            function () {
                console.log('error tranando de conectarme');
                //self.mensaje += 'error tranando de conectarme';
//                return self.loginSinDatos();
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
