import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {TourDetailPage} from '../../pages/tour-detail/tour-detail';

declare var OdooApi: any;
@Component({
    selector: 'page-city-detail',
    templateUrl: 'city-detail.html',
})
export class CityDetailPage {

    item;
    tours;
    constructor(public navCtrl: NavController, public navParams: NavParams) {

        this.item = this.navParams.get('item');
        console.log(this.item);
        var self = this;
        var odoo = new OdooApi(global.url, global.db);
        odoo.login(global.username, global.password).then(
            function (uid) {
                odoo.search_read('tours', [['company_id', '=', self.item.id]], ['codigo',
                    'name', 'init_hours', 'end_hours', 'company_id',
                    'no_show', 'pax_maximo', 'price_tour', 'salario_maximo',
                    'gastos_minimos', 'gastos_extra', 'gastos_tour', 'cost_one', 'cost_two', 'cost_three',
                    'cost_four', 'cost_five', 'cost_six', 'cost_seve', 'cost_eigh', 'cost_nine', 'cost_ten',
                    'cost_more_ten', 'gasto_one', 'gasto_two', 'gasto_three', 'gasto_four', 'gasto_five', 'gasto_six',
                    'gasto_seven', 'gasto_eigh', 'gasto_nine', 'gasto_ten', 'gasto_more_ten', 'is_museo',
                    'porcentaje_museo', 'is_extra', 'is_private', 'is_free', 'description']).then(
                    function (value) {
                        console.log(value);

                        self.tours = value;
                        //hacerla desde el principio y guardarla en un store
                        odoo.search_read('tours.guia', [['id', '<>', '0']], ['id', 'guia_id', 'tour_id', 'date_begin', 'date_end']).then(
                            function (value2) {
                                
                                console.log(value2);
                                
                                for (var key in self.tours) {
                                    for (var key2 in value2) {
                                        
                                        if (value2[key2].tour_id[0] == (self.tours[key]).id) {
                                            self.tours[key].date_begin = value2[key2].date_begin;
                                            self.tours[key].date_end = value2[key2].date_end;
                                        }
                                    }
                                }
                            },
                            function () {

                            }
                        )


                    },
                    function () {
                        //self.presentAlert('Falla', 'Imposible Conectar');
                    }
                    );

            },
            function () {

            }
        );
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CityDetailPage');
    }

    ejecute(item){
        this.navCtrl.push(TourDetailPage, {item:item});
    }
}
