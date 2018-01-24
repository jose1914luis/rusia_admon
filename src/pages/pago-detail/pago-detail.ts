import {Component} from '@angular/core';
import {NavController, ModalController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {Storage} from '@ionic/storage';
import {BuscarTourPage} from '../../pages/buscar-tour/buscar-tour';

declare var OdooApi: any;
@Component({
    selector: 'page-pago-detail',
    templateUrl: 'pago-detail.html',
})
export class PagoDetailPage {

    item;
    editable = false;
    cargar = false;
    tem_date_begin;
    constructor(public modalCtrl: ModalController, public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {
        this.item = this.navParams.get('item');
        console.log(this.item)
        this.item.tours_id.name = this.item.tours_id[1];
        this.item.tours_id.id = this.item.tours_id[0];
        
        var dateStart = new Date(this.item.name);        
        this.tem_date_begin = dateStart.toISOString();                
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PagoDetailPage');
    }

    editar() {

        if (!this.editable) {
            this.editable = true;
        } else {
            this.editable = false;
        }
    }

    buscarTour() {
        if (this.editable) {
            var self = this;
            let profileModal = this.modalCtrl.create(BuscarTourPage);
            profileModal.onDidDismiss(data => {
                if (data != null) {
                    self.item.tours_id = data;
                    console.log(self.item.tours_id.name);
                }
            });
            profileModal.present();
        }
    }
    
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }


    guardar() {

        var self = this;
        this.cargar = true;
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {

//                    console.log({
//                        name: self.formatDate(self.tem_date_begin),
//                        semana: self.item.semana,
//                        total_eur: self.item.total_eur,
//                        total_usd: self.item.total_usd,
//                        total_res: self.item.total_res,
//                        total_rub: self.item.total_rub,
//                        total_metro: self.item.total_metro,
//                        pax_pago: self.item.pax_pago,
//                        tours_id: self.item.tours_id.id
//                    });

                    odoo.write('tours.pago.guia', self.item.id, {
                        name: self.formatDate(self.tem_date_begin),
                        semana: self.item.semana,
                        total_eur: self.item.total_eur,
                        total_usd: self.item.total_usd,
                        total_res: self.item.total_res,
                        total_rub: self.item.total_rub,
                        total_metro: self.item.total_metro,
                        pax_pago: self.item.pax_pago,
//                        tours_id: self.item.tours_id.id
                    }).then(
                        function (value2) {
                            console.log(value2);
                            if (!value2) {
                                self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                            }
                            self.cargar = false;
                        },
                        function () {
                            self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                        }
                        );
                },
                function () {

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

}
