import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

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

import {CityDetailPage} from '../pages/city-detail/city-detail';
import {TourDetailPage} from '../pages/tour-detail/tour-detail';

import {IonicStorageModule} from '@ionic/storage';
import {Network} from '@ionic-native/network';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

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
        TourDetailPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
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
        TourDetailPage
    ],
    providers: [
        Network,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
