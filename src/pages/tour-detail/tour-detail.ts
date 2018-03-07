import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {Storage} from '@ionic/storage';

declare var OdooApi: any;
@Component({
    selector: 'page-tour-detail',
    templateUrl: 'tour-detail.html',
})
export class TourDetailPage {

    item;
    editable = false;
    cargar = false;
    constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, public alertCtrl: AlertController) {
        this.item = this.navParams.get('item');
        if (this.item == null) {
            this.item = {
                company_id: ['', ''],
                codigo: '',
                name: '', init_hours: '',
                end_hours: '',
                no_show: '', pax_maximo: '',
                price_tour: '', salario_maximo: '',
                gastos_minimos: '', gastos_extra: '',
                gastos_tour: '', cost_one: '',
                cost_two: '', cost_three: '',
                cost_four: '', cost_five: '',
                cost_six: '', cost_seven: '',
                cost_eight: '', cost_nine: '',
                cost_ten: '', cost_more_ten: '',
                gasto_one: '', gasto_two: '',
                gasto_three: '', gasto_four: '',
                gasto_five: '', gasto_six: '',
                gasto_seven: '', gasto_eight: '',
                gasto_nine: '', gasto_ten: '',
                gasto_more_ten: '', is_museo: '',
                porcentaje_museo: '', is_extra: '',
                is_private: '', is_free: '', description: ''
            }
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TourDetailPage');
    }

    editar() {

        if (!this.editable) {
            this.editable = true;
        } else {
            this.editable = false;
        }
    }
    guardar() {

        this.cargar = true;
        var self = this;
        this.storage.get('conexion').then((conexion) => {
            var odoo = new OdooApi(global.url, conexion.bd);
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {

                    odoo.write('tours', self.item.id, {
                        codigo: self.item.codigo,
                        name: self.item.name, init_hours: self.item.init_hours,
                        end_hours: self.item.end_hours,
                        no_show: self.item.no_show, pax_maximo: self.item.pax_maximo,
                        price_tour: self.item.price_tour, salario_maximo: self.item.salario_maximo,
                        gastos_minimos: self.item.gastos_minimos, gastos_extra: self.item.gastos_extra,
                        gastos_tour: self.item.gastos_tour, cost_one: self.item.cost_one,
                        cost_two: self.item.cost_two, cost_three: self.item.cost_three,
                        cost_four: self.item.cost_four, cost_five: self.item.cost_five,
                        cost_six: self.item.cost_six, cost_seven: self.item.cost_seven,
                        cost_eight: self.item.cost_eight, cost_nine: self.item.cost_nine,
                        cost_ten: self.item.cost_ten, cost_more_ten: self.item.cost_more_ten,
                        gasto_one: self.item.gasto_one, gasto_two: self.item.gasto_two,
                        gasto_three: self.item.gasto_three, gasto_four: self.item.gasto_four,
                        gasto_five: self.item.gasto_five, gasto_six: self.item.gasto_six,
                        gasto_seven: self.item.gasto_seven, gasto_eight: self.item.gasto_eight,
                        gasto_nine: self.item.gasto_nine, gasto_ten: self.item.gasto_ten,
                        gasto_more_ten: self.item.gasto_more_ten, is_museo: self.item.is_museo,
                        porcentaje_museo: self.item.porcentaje_museo, is_extra: self.item.is_extra,
                        is_private: self.item.is_private, is_free: self.item.is_free, description: self.item.description
                    }).then(
                        function (value2) {
                            if (!value2) {
                                self.presentAlert('Falla', 'Error al Guardar, intente nuevamente');
                            }
                            self.cargar = false;
                            //console.log(value2);
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
