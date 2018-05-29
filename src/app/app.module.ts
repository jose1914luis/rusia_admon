import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {AsignarPage} from '../pages/asignar/asignar';
import {CiudadPage} from '../pages/ciudad/ciudad';
import {ClientesPage} from '../pages/clientes/clientes';
import {NomPage} from '../pages/nom/nom';
import {PagoPage} from '../pages/pago/pago';
import {SalarioPage} from '../pages/salario/salario';
import {SolPage} from '../pages/sol/sol';
import {SincPage} from '../pages/sinc/sinc';
import {ReservasPage} from '../pages/reservas/reservas';
import {FuturasPage} from '../pages/futuras/futuras';
import {PanelPage} from '../pages/panel/panel';
import {CaledarioGenPage } from '../pages/caledario-gen/caledario-gen';
import {CaledarioGuiaPage } from '../pages/caledario-guia/caledario-guia';

import {TabsPage} from '../pages/tabs/tabs';

import {CityDetailPage} from '../pages/city-detail/city-detail';
import {TourDetailPage} from '../pages/tour-detail/tour-detail';
import {SalarioDetailPage} from '../pages/salario-detail/salario-detail';
import {PagoDetailPage} from '../pages/pago-detail/pago-detail';
import {ClienteDetailPage} from '../pages/cliente-detail/cliente-detail';
import {NomDetailPage} from '../pages/nom-detail/nom-detail';
import {AsignarDetailPage} from '../pages/asignar-detail/asignar-detail';
import {ResDetailPage} from '../pages/res-detail/res-detail';
import {NomFilterPage} from '../pages/nom-filter/nom-filter';
import {GastosFilterPage} from '../pages/gastos-filter/gastos-filter';
import {BuscarTourPage} from '../pages/buscar-tour/buscar-tour';


import {IonicStorageModule} from '@ionic/storage';
import {Network} from '@ionic-native/network';
import {NgCalendarModule} from 'ionic2-calendar';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { UtilProvider } from '../providers/util/util';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        AsignarPage,
        CiudadPage,
        ClientesPage,
        NomPage,
        PagoPage,
        SalarioPage,
        SolPage,
        SincPage,
        CityDetailPage,
        TourDetailPage,
        SalarioDetailPage,
        PagoDetailPage,
        ClienteDetailPage,
        NomDetailPage,
        AsignarDetailPage,
        ReservasPage, 
        FuturasPage,
        TabsPage,
        ResDetailPage,
        NomFilterPage,
        PanelPage,
        GastosFilterPage,
        BuscarTourPage,
        CaledarioGenPage,
        CaledarioGuiaPage
    ],
    imports: [
        BrowserModule,
        NgCalendarModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        CaledarioGenPage,
        ListPage,
        AsignarPage,
        CiudadPage,
        ClientesPage,
        NomPage,
        PagoPage,
        SalarioPage,
        SolPage,
        SincPage,
        CityDetailPage,
        TourDetailPage,
        SalarioDetailPage,
        PagoDetailPage,
        ClienteDetailPage,
        NomDetailPage,
        AsignarDetailPage,
        ReservasPage,
        FuturasPage,
        TabsPage,
        ResDetailPage,
        NomFilterPage,
        PanelPage,
        GastosFilterPage,
        BuscarTourPage,
        CaledarioGuiaPage
    ],
    providers: [
        Clipboard,
        Network,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilProvider
    ]
})
export class AppModule {}
