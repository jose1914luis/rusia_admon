import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController, NavParams} from 'ionic-angular';
import {global} from '../../components/credenciales/credenciales';
import {NuevoPage} from '../../pages/nuevo/nuevo';
import {TabsPage} from '../../pages/tabs/tabs';

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
    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

    }

    ionViewDidLoad() {

        var self = this;
        this.storage.get('conexion').then((conexion) => {
            
            self.item = this.navParams.get('item');
            console.log(self.item);
            
            var odoo = new OdooApi(global.url, conexion.db);
            self.cargar = true;
            self.calendar.eventSource = [];
            self.events = [];
            odoo.login(conexion.username, conexion.password).then(
                function (uid) {
                    odoo.search_read('tours.guia', [['id', '<>', '0']], ['id', 'guia_id', 'tour_id', 'date_begin',
                        'date_end', 'personas_terceros', 'personas_all_in', 'total_personas', 'total_rublo', 'total_dolar', 'total_rublo_res'
                        , 'total_euro_res', 'total_dolar_res', 'pay_pal', 'tarjeta', 'is_free', 'personas_pago', 'is_private', 'entregado', 'state', 'observaciones']).then(
                        function (value) {
                            //                        console.log(value);
                            for (var key in value) {
                                var dateStart = new Date(String((value[key]).date_begin).replace(' ', 'T'));
                                var dateEnd = new Date(String((value[key]).date_end).replace(' ', 'T'));
                                var startTime = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), dateStart.getHours(), dateStart.getMinutes());
                                var endTime = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate(), dateEnd.getHours(), dateEnd.getMinutes());
                                value[key].startTime = startTime;
                                value[key].endTime = endTime;
                                value[key].title = (value[key]).tour_id[1];
                                value[key].allDay = false;
                                value[key].reservas = [];
                                value[key].guia_id = value[key].guia_id ? value[key].guia_id : '';
                                value[key].observaciones = value[key].observaciones ? value[key].observaciones : '';

                            }

                            odoo.search_read('tours.clientes.middle', [['name', '<>', '0']],
                                ['tour_id', 'guia_id', 'name', 'telefono', 'email',
                                    'nombre_hotel', 'personas_terceros', 'personas_all_in', 'total_personas', 'personas_pago',
                                    'abonor_rublo', 'abono_euros', 'abono_dolar', 'dolar_exportado', 'euros_exportado', 'rublo_exportado', 'pay_pal', 'tarjeta', 'asistencia', 'observaciones', 'fecha']).then(
                                function (value2) {


                                    for (var key in value) {

                                        for (var key2 in value2) {
                                            //value[key].reserva_id = value2[key2].id;
                                            if (value[key].tour_id[0] == value2[key2].tour_id[0]) {
                                                value[key].reservas.push(value2[key2]);
                                                //console.log(value2[key2]);
                                            }
                                        }
                                        self.events.push(value[key]);

                                    }
                                    self.cargar = false;

                                    console.log(value2);
                                    console.log(value);
                                    self.calendar.eventSource = self.events;


                                },
                                function () {
                                    //                                self.presentAlert('Falla', 'Imposible Conectar');
                                }
                                );
                        },
                        function () {

                        }
                        )

                },
                function () {

                }
            );
        });

    }

    refresh() {
        this.ionViewDidLoad();
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
        console.log(evt);
        this.navCtrl.push(TabsPage, {item: evt});
    }
    addEvent() {
        this.navCtrl.push(NuevoPage);
    }
}
