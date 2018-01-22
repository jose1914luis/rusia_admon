import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    items;
    cargar;
    mensaje = '';
    constructor(public navCtrl: NavController, private storage: Storage, public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        this.cargar = true
        var self = this;
        this.items = null;
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);

            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.gastos.diversos', [['state', '=', 'aprobado']],
                        ['name', 'city_id', 'total_usd', 'total_eur', 'total_rub', 'total_pp', 'total_tarjeta',
                            'state', 'conceptos_ids']).then(
                        function (value2) {
                            console.log(value2);
                            self.items = value2
                            for (let key in self.items) {

                                self.items[key].visible = true;
                            }
                            self.cargar = false;
                        },
                        function () {
                            self.presentAlert('Falla', 'Imposible Conectar');
                        }
                        );

                },
                function () {

                }
            );
        });

    }

    buscar() {

        var self = this;
        let alert = this.alertCtrl.create({
            title: 'Buscar',
            inputs: [
                {
                    name: 'ciudad',
                    placeholder: 'Ciudad'
                },
                {
                    name: 'fechaIni',
                    placeholder: 'Fecha Inicial'
                },
                {
                    name: 'fechaFin',
                    placeholder: 'Fecha Final'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Buscar',
                    handler: data => {

                        for (let key in self.items) {

                            self.items[key].visible = false;
                            //                                console.log((self.items[key].name + "").includes(data.nombre + "") + '  ' + (self.items[key].email[1] + "").includes(data.correo + ""));
                            if ((self.items[key].city_id[1] + "").includes(data.ciudad + "")){ //&& (self.items[key].email[1] + "").includes(data.correo + "")) {
                                //                                    console.log(self.items[key]);
                                self.items[key].visible = true;
                            }
                        }

                    }
                }
            ]
        });
        alert.present();
    }


    presentAlert(titulo, texto) {
        const alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    }

    refresh() {
        this.ionViewDidLoad();
    }

}
