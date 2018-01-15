import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'page-asignar',
    templateUrl: 'asignar.html',
})
export class AsignarPage {

    mensaje = '';
    cargar = false;
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
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AsignarPage');
    }

}
