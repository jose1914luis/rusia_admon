import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Nav} from 'ionic-angular';

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
import {CaledarioGenPage } from '../../pages/caledario-gen/caledario-gen';
import {CaledarioGuiaPage } from '../../pages/caledario-guia/caledario-guia';

//@IonicPage()
@Component({
    selector: 'page-panel',
    templateUrl: 'panel.html',
})
export class PanelPage {
    @ViewChild(Nav) nav: Nav;
    pages: Array<{title: string, component: any}>;

    rootPage: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

        var self = this;
        this.storage.get('conexion').then((conexion) => {

//            console.log('-----x-----');
            console.log(conexion);
            if (conexion.is_guia || conexion.is_promotor) {
// console.log(conexion.is_guia);
                self.pages = [
                   
                    {title: 'Tours Asignados', component: AsignarPage},      
                    {title: 'Calendario General', component: CaledarioGenPage},
                    {title: 'Calendario Guía', component: CaledarioGuiaPage},             
                    {title: 'Nomina', component: NomPage},
                    {title: 'Pago Diario', component: PagoPage},
                    {title: 'Salir', component: ListPage}
                ];
                
            } else if (conexion.is_chofer) {

                self.pages = [
                    {title: 'Tours Asignados', component: AsignarPage},
                    {title: 'Calendario General', component: CaledarioGenPage},
                    {title: 'Calendario Guía', component: CaledarioGuiaPage},
                    {title: 'Salir', component: ListPage}
                ];
            } else {
                console.log('deberia entrar aca');
                self.pages = [
                    {title: 'Ciudades', component: CiudadPage},
                    {title: 'Asignar Guía', component: AsignarPage},
                    {title: 'Calendario General', component: CaledarioGenPage},
                    {title: 'Calendario Guía', component: CaledarioGuiaPage},
                    {title: 'Clientes', component: ClientesPage},
                    {title: 'Solicitudes', component: SolPage},
                    {title: 'Nomina', component: NomPage},
                    {title: 'Pago Diario', component: PagoPage},
                    {title: 'Salario Guías', component: SalarioPage},
                    {title: 'Gastos Extras', component: HomePage},
                    {title: 'Salir', component: ListPage}
                ];
            }

            self.rootPage = AsignarPage;
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
