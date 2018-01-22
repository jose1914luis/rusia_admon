import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Nav} from 'ionic-angular';

import {Storage} from '@ionic/storage';

import {HomePage} from '../../pages/home/home';
import {ListPage} from '../../pages/list/list';
import {AsignarPage} from '../../pages/asignar/asignar';
import {CiudadPage} from '../../pages/ciudad/ciudad';
import {ClientesPage} from '../../pages/clientes/clientes';
import {NomPage} from '../../pages/nom/nom';
import {PagoPage} from '../../pages/pago/pago';
import {SalarioPage} from '../../pages/salario/salario';
import {SolPage} from '../../pages/sol/sol';

@IonicPage()
@Component({
    selector: 'page-panel',
    templateUrl: 'panel.html',
})
export class PanelPage {
    @ViewChild(Nav) nav: Nav;
    pages: Array<{title: string, component: any}>;

    rootPage: any = AsignarPage;
    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

        var self = this;
        this.storage.get('conexion').then((conexion) => {

            console.log(conexion);
            if (conexion.is_guia) {

                self.pages = [
                   
                    {title: 'Tours Asignados', component: AsignarPage},                   
                    {title: 'Nomina', component: NomPage},
                    {title: 'Pago Diario', component: PagoPage},
                    {title: 'Salir', component: ListPage}
                ];
                
            } else if (conexion.is_chofer) {

                self.pages = [
                    {title: 'Tours Asignados', component: AsignarPage},
                    {title: 'Salir', component: ListPage}
                ];
            } else {
                self.pages = [
                    {title: 'Ciudades', component: CiudadPage},
                    {title: 'Asignar Guía', component: AsignarPage},
                    {title: 'Clientes', component: ClientesPage},
                    {title: 'Solicitudes', component: SolPage},
                    {title: 'Nomina', component: NomPage},
                    {title: 'Pago Diario', component: PagoPage},
                    {title: 'Salario Guías', component: SalarioPage},
                    {title: 'Gastos Extras', component: HomePage},
                    {title: 'Salir', component: ListPage}
                ];
            }
        });


    }

    openPage(page) {

        if (page.title == "Salir") {
            this.nav.setRoot(page.component, {borrar: true});
        } else {
            this.nav.setRoot(page.component);
        }

    }

}
