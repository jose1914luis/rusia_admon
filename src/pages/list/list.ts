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

    cargar = false;
    mensaje = '';
    conexion = {username:'labg1214@gmail.com', password:'123456', is_guia:false, is_chofer:false};
    bd = 'Tour_Gratis_Rusia_Test';
    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertCtrl: AlertController) {

        var borrar = this.navParams.get('borrar');
        //this.conexion.username = (this.navParams.get('login') == undefined)?'' : this.navParams.get('login');
        if (borrar == true) {
            this.cargar = false;
        } else {

            this.conectarApp(false);
        }
    }
    
    conectarApp(verificar) {

        if (this.conexion.username.length < 5 && this.conexion.password.length < 4)return;
        var self = this;
        this.cargar = true;
        var odoo = new OdooApi(global.url, self.bd);         
        odoo.login(self.conexion.username, self.conexion.password).then(
            function (uid) {

                console.log(uid);                
                odoo.search_read('res.users', [['id', '=', uid]],
                    ['name', 'email', 'city_id', 'is_guia', 'is_chofer', 'salario_ext', 'salario_min',
                    'active', 'groups_id']).then(
                    function (value2) {
                        console.log(value2);
                        self.conexion.is_chofer = value2[0].is_chofer;
                        self.conexion.is_guia = value2[0].is_chofer;
                        self.navCtrl.setRoot(AsignarPage);
                        self.storage.set('conexion2', self.conexion);
                    },
                    function () {
                        self.presentAlert('Falla', 'Imposible Conectar');
                    }
                    );
//                
            },
            function () {
                self.presentAlert('Falla', 'Imposible conectarse');
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
