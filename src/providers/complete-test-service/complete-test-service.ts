//import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AutoCompleteService} from 'ionic2-auto-complete';

@Injectable()
export class CompleteTestServiceProvider implements AutoCompleteService {

    labelAttribute = "name";
    
    constructor() {
        console.log('Hello CompleteTestServiceProvider Provider');
    }

    getResults(keyword: string) {
        return [{name:'hola'}];
    }

}
