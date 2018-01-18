import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {AsignarDetailPage} from '../../pages/asignar-detail/asignar-detail';

declare var OdooApi: any;
@Component({
    selector: 'page-asignar',
    templateUrl: 'asignar.html',
})
export class AsignarPage {

    mensaje = '';
    cargar = true;
    viewTitle = '';
    calendar = {
        eventSource: [],
        mode: 'month',
        currentDate: new Date(),
        formatDayHeader: 'E',
        noEventsLabel: 'Sin Eventos',
        formatMonthTitle: 'MMMM yyyy',
        allDayLabel: 'Todo el día',
        formatWeekTitle: 'MMMM yyyy, Se $n'
    };
    item;
    tours;
    events = [];
    constructor(public navCtrl: NavController, public navParams: NavParams) {

        this.item = this.navParams.get('item');
        console.log(this.item);
        var self = this;
        var odoo = new OdooApi(global.url, global.db);


        odoo.login(global.username, global.password).then(
            function (uid) {
                odoo.search_read('tours', [['id', '<>', '0']], ['codigo',
                    'name', 'init_hours', 'end_hours', 'company_id',
                    'no_show', 'pax_maximo', 'price_tour', 'salario_maximo',
                    'gastos_minimos', 'gastos_extra', 'gastos_tour', 'cost_one', 'cost_two', 'cost_three',
                    'cost_four', 'cost_five', 'cost_six', 'cost_seven', 'cost_eight', 'cost_nine', 'cost_ten',
                    'cost_more_ten', 'gasto_one', 'gasto_two', 'gasto_three', 'gasto_four', 'gasto_five', 'gasto_six',
                    'gasto_seven', 'gasto_eigh', 'gasto_nine', 'gasto_ten', 'gasto_more_ten', 'is_museo',
                    'porcentaje_museo', 'is_extra', 'is_private', 'is_free', 'description']).then(
                    function (value2) {
                        console.log(value2);

                        //self.tours = value2;
                        //hacerla desde el principio y guardarla en un store
                        odoo.search_read('tours.guia', [['id', '<>', '0']], ['id', 'guia_id', 'tour_id', 'date_begin',
                            'date_end', 'personas_terceros', 'personas_all_in', 'total_personas', 'total_rublo', 'total_dolar', 'total_rublo_res'
                            , 'total_euro_res', 'total_dolar_res', 'pay_pal', 'tarjeta', 'is_free', 'is_private', 'entregado', 'state', 'observaciones']).then(
                            function (value) {
                                console.log(value);
                                for (var key in value) {
                                    var dateStart = new Date(String((value[key]).date_begin).replace(' ', 'T'));
                                    var dateEnd = new Date(String((value[key]).date_end).replace(' ', 'T'));
                                    var startTime = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), dateStart.getHours(), dateStart.getMinutes());
                                    var endTime = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate(), dateEnd.getHours(), dateEnd.getMinutes());

                                    for (var key2 in value2) {
                                        if (value2[key2].id == (value[key]).tour_id[0]) {
                                            var evento = {
                                                title: (value2[key2]).name,
                                                startTime: startTime,
                                                endTime: endTime,
                                                allDay: false,
                                                description: (value2[key2]).description,
                                                guia: (value[key]).guia_id[1],
                                                ubicacion: (value2[key2]).company_id[1],
                                                tour_id: value[key].id,
                                                entregado: value[key].entregado,
                                                personas_terceros: value[key].personas_terceros,
                                                personas_all_in: value[key].personas_all_in,
                                                total_personas: value[key].total_personas,
                                                total_rublo: value[key].total_rublo,
                                                total_dolar: value[key].total_dolar,
                                                total_rublo_res: value[key].total_rublo_res,
                                                total_euro_res: value[key].total_euro_res,
                                                pay_pal: value[key].pay_pal,
                                                tarjeta: value[key].tarjeta,
                                                observaciones: value[key].observaciones,
                                                home: false
                                            }
                                            self.events.push(evento);
                                            break;
                                        }
                                    }
                                }

                                self.cargar = false;
                                self.calendar.eventSource = self.events;
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

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }
    onEventSelected(evt) {

        this.navCtrl.push(AsignarDetailPage, {item: evt});
    }

}
