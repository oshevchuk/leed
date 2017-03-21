/**
 * Created by Oshevchuk on 21.03.2017.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';

var obj:string="some text";

@Injectable()
export class HttpService{
    constructor(private http:Http){}

    // postData(obj:string){
    //     // const body=JSON.stringify(obj);
    //     const body=obj;
    //     let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    //
    //     return this.http.post('http://http://clibakend:83/index.php', body, {headers: headers})
    //         .map((resp:Response) => resp)
    //         // .map((resp:Response) => resp.json())
    //         .catch((error:any)=>{return Observable.throw(error);});
    // }
}
