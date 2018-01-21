import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {AsignarPage} from '../pages/asignar/asignar';
import {CiudadPage} from '../pages/ciudad/ciudad';
import {ClientesPage} from '../pages/clientes/clientes';
import {NomPage} from '../pages/nom/nom';
import {PagoPage} from '../pages/pago/pago';
import {SalarioPage} from '../pages/salario/salario';
import {SolPage} from '../pages/sol/sol';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = ListPage;

    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
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

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        
        if(page.title == "Salir"){
            this.nav.setRoot(page.component, {borrar:true});
        }else{
            this.nav.setRoot(page.component);
        }        
        
    }
}
