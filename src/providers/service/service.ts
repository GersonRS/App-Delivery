import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AlertController, Events} from "ionic-angular";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

    constructor (
        public http: HttpClient,
        private alertCtrl: AlertController,
        public eventEmitter: Events
    ) {
        this.header = new HttpHeaders().set('Accept', 'application/json');
    }

    protected url: string;
    private  header: HttpHeaders;

    request() {
        return this.http;
    }

    setAccessToken ( token = null) {
        this.header.set('Authorization', 'Bearer  '+ token);
    }

    removeAccessToken () {
        this.header.delete('Authorization');
    }

    builder (resource: string) {
        this.url = 'http://site.app/' + resource;
        return this;
    }

    list () {
        let observable = this.http.get(this.url, {headers: this.header});
        return this.toPromise(observable);
    }

    view (id: number) {
        let observable = this.http.get(this.url + '/' + id, {headers: this.header});
        return this.toPromise(observable);
    }

    update(id: number, data: object) {
        let observable = this.http.put(this.url + '/' + id, data, {headers: this.header});
        return this.toPromise(observable);
    }

    insert (data: Object) {
        let observable = this.http.post(this.url, data, {headers: this.header});
        return this.toPromise(observable);
    }

    delete (id: number) {
        let observable = this.http.delete(this.url + '/' + id, {headers: this.header});
        return this.toPromise(observable);
    }

    protected toPromise(request) {
        return request.toPromise()
            .then((res) => {
                let data = res.json();
                return data || {};
            })
            .catch((err) => {
                let message = 'Algo deu errado no servidor, informe o erro ' + err.status + ' ao administrador';
                if (err.status === 401) {
                    message = 'Você não tem permissão para ver isso, informe um usuário e senha válidos';
                    this.eventEmitter.publish('user');
                }

                if (err.status === 422) {
                    message = 'Falha de validação, verifique os campos';
                }

                if (err.status === 404) {
                    message = 'Impossível se conectar ao servidor, verifique sua conexão ou tente novamente em alguns minutos';
                }

                this.showAlert(message);

                return Observable.throw(err.json().error || message);
            });
    }

    protected showAlert(message) {
        let prompt = this.alertCtrl.create({
            title: 'Algo deu errado',
            message: message,
            buttons: [
                {
                    text: 'Ok',
                    handler: data => {
                        console.log('Btn "ok" in Alert control clicked')
                    }
                }
            ]
        });
        prompt.present();
    }

}
