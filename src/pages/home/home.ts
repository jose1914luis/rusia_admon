import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {Storage} from '@ionic/storage';
import {GastosFilterPage} from '../../pages/gastos-filter/gastos-filter';

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
    ejecute(item) {
        //        console.log(item);
        this.navCtrl.push(GastosFilterPage, {item: item});
    }

    ionViewDidLoad() {

        this.cargarConDatos();

    }

    cargarConDatos() {
        this.cargar = true
        var self = this;
        this.items = null;
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);

            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.gastos.diversos', [['id', '<>', '0']],
                        ['name', 'city_id', 'total_usd', 'total_eur', 'total_rub', 'total_pp', 'total_tarjeta',
                            'state', 'conceptos_ids']).then(
                        function (gastos) {
                            //console.log(gastos);
                            gastos
                            var ids = [];
                            for (let key in gastos) {

                                gastos[key].visible = true;
                                gastos[key].conceptos = [];
                                ids.push(gastos[key].id);
                            }
                            odoo.search_read('tours.gastos.conceptos', [['gastos_id', 'in', ids]],
                                ['concepto', 'moneda', 'price_unit', 'unidades', 'sub_total', 'gastos_id']).then(
                                function (conceptos) {
                                    console.log(conceptos);
                                    for (var key_g in gastos) {

                                        for (var key in gastos[key_g].conceptos_ids) {

                                            for (var key_c in conceptos) {


                                                if (conceptos[key_c].id == gastos[key_g].conceptos_ids[key]) {
                                                    gastos[key_g].conceptos.push(conceptos[key_c]);
                                                }
                                            }
                                        }

                                    }
                                    self.items = gastos;
                                    self.storage.set('gastos', gastos);
                                    console.log(self.items);
                                    self.cargar = false;
                                },
                                function () {
                                    self.presentAlert('Falla', 'Imposible Conectar');
                                }
                                );
                            //                            
                        },
                        function () {
                            self.cargarSinDatos();
                        }
                        );

                },
                function () {
                    self.cargarSinDatos();
                }
            );
        });
    }

    cargarSinDatos() {

        this.cargar = true
        var self = this;
        this.items = null;
        this.storage.get('gastos').then((gastos) => {

            if (gastos != null) {
                self.items = gastos
                self.cargar = false;
            } else {
                self.presentAlert('Falla', 'Imposible cargar los datos');
            }
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
                            if ((self.items[key].city_id[1] + "").includes(data.ciudad + "")) { //&& (self.items[key].email[1] + "").includes(data.correo + "")) {
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
    
    nuevo(){
        this.navCtrl.push(GastosFilterPage, {item:null});
    }

}
