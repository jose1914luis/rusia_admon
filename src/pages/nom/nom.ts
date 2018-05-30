import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {NomDetailPage} from '../../pages/nom-detail/nom-detail';
import {NomFilterPage} from '../../pages/nom-filter/nom-filter';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;

@Component({
    selector: 'page-nom',
    templateUrl: 'nom.html',
})
export class NomPage {

    private items = [];
    cargar = true;
    private nomina;
    private max = 10;

    constructor(public modalCtrl: ModalController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {


    }

    ionViewDidLoad() {

        this.cargarSinDatos();

    }

    cargarConDatos() {
        var self = this;
        this.storage.get('conexion').then((conexion) => {
            self.cargar = true;
            self.items = null;
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.nomina', [['id', '!=', '0']],
                        ['name', 'semana', 'city_id', 'pax_pago', 'total_rub',
                            'total_eur', 'total_usd', 'total_res', 'total_metro', 'state']).then(
                        function (nomina) {

                            var ids = [];
                            for (let key in nomina) {

                                nomina[key].visible = true;
                                ids.push(nomina[key].semana)
                                nomina[key].pago = [];
                            }

                            odoo.search_read('tours.pago.guia', [['semana', 'in', ids]],
                                ['name', 'semana', 'tours_id', 'guia_user_id', 'city_id',
                                    'pax_pago', 'total_rub', 'total_eur', 'total_usd', 'total_res', 'total_metro', 'concepto', 'state']).then(
                                function (pago) {

                                    console.log(pago)
                                    for (let key_no in nomina) {
                                        for (let key_p in pago) {
                                            if (nomina[key_no].semana == pago[key_p].semana) {

                                                pago[key_p].tours_id.name = pago[key_p].tours_id[1];
                                                pago[key_p].tours_id.id = pago[key_p].tours_id[0];
                                                nomina[key_no].pago.push({
                                                    pago_id: pago[key_p].id,
                                                    name: pago[key_p].name,
                                                    dateStart: new Date(pago[key_p].name).toISOString(),
                                                    semana: pago[key_p].semana,
                                                    tours_id: pago[key_p].tours_id,
                                                    guia_user_id: pago[key_p].guia_user_id[1],
                                                    city_id: pago[key_p].city_id,
                                                    pax_pago: pago[key_p].pax_pago,
                                                    total_rub: pago[key_p].total_rub,
                                                    total_eur: pago[key_p].total_eur,
                                                    total_usd: pago[key_p].total_usd,
                                                    total_res: pago[key_p].total_res,
                                                    total_metro: pago[key_p].total_metro,
                                                    concepto: pago[key_p].concepto,
                                                    state: pago[key_p].state,
                                                })
                                            }
                                        }
                                    }
                                    //console.log(nomina);
                                    //self.items = nomina;

                                    self.nomina = nomina;
                                    self.initItems();
                    
                                    self.storage.set('nomina', self.nomina);
                                    self.cargar = false;
                                },
                                function () {
                                    self.presentAlert('Falla', 'Imposible Cargar Datos.');
                                    self.cargar = false;
                                }
                                );
                        },
                        function () {
                            self.presentAlert('Falla', 'Imposible Cargar Datos.');
                            self.cargar = false;

                        }
                        );

                },
                function () {
                    self.presentAlert('Falla', 'Imposible Cargar Datos.');
                    self.cargar = false;
                }
            );
        });
    }

    cargarSinDatos() {

        var self = this;
        self.cargar = true;
        this.storage.get('nomina').then((nomina) => {

            if (nomina != null) {
                //self.items = nomina;
                //self.cargar = false;

                self.nomina = nomina;
                self.initItems();
                self.cargar = false;
            } else {
                self.cargarConDatos();
            }
        });
    }

    private initItems(){

        for (var i = 0; i <  this.nomina.length && i < this.max; i++) {
            this.items.push(this.nomina[i]);
        }
    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.nomina.length && i < this.max + 10 ; i++) {
            this.items.push(this.nomina[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }

    presentAlert(titulo, texto) {
        const alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    }

    ejecute(item) {
        //        console.log(NomDetailPage);
        this.navCtrl.push(NomDetailPage, {item: item});
    }

    refresh() {
        this.cargarConDatos();
    }

    buscar() {
        var self = this;
        let profileModal = this.modalCtrl.create(NomFilterPage);
        profileModal.onDidDismiss(data => {
            if (data != null) {

                if (data.semanaIni > 0 || data.semanaFin > 0) {
                    for (let key in self.items) {

                        self.items[key].visible = false;

                        if (self.items[key].semana >= data.semanaIni && self.items[key].semana <= data.semanaFin) {

                            if (data.estado = 'todos') {
                                self.items[key].visible = true;
                            } else if (data.estado = 'pagados' && self.items[key].state == 'pagado') {
                                self.items[key].visible = true;
                            } else if (data.estado = 'pedientes' && self.items[key].state == 'pedientes') {
                                self.items[key].visible = true;
                            }

                        }
                    }
                } else {
                    for (let key in self.items) {

                        self.items[key].visible = true;
                    }
                }
            }
        });
        profileModal.present();
    }
}

