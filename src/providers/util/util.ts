import {Storage} from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {

  constructor(private storage: Storage) {
    console.log('Hello UtilProvider Provider');
  }

  public getValues(valor):any{
        
        var self = this;
        var promise = new Promise(function (resolve, reject) {
                        
            self.storage.get(valor).then((devolver) => {

                resolve(devolver);
            }).catch(e=>{
                console.log(e)
                reject(null);
            });

        });

        return promise;

    }

}
