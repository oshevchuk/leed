/**
 * Created by Oshevchuk on 20.03.2017.
 */
import {Injectable}      from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import {options} from '../auth.options';

import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';

// import $ from "../../../node_modules/@types/jquery";

import * as $ from "jquery";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
// import {JQueryStyleEventEmitter} from "rxjs/observable/FromEventObservable";

import {Observable} from 'rxjs/Observable';
// Avoid name not found warnings
declare var Auth0Lock:any;


@Injectable()
export class Auth {
    // Configure Auth0
    lock = new Auth0Lock('XjgUHctpdTlDVHggBoNWd2SsBbxcS0HA', 'megadevice.auth0.com', {allowSignUp: true});
    // private _http : Http;

    constructor(private http:Http) {
        // $.get("localhost:83", function(data, status){
        //     alert("Data: " + data + "\nStatus: " + status);
        // });
        // console.log($);
        // var xhr = new XMLHttpRequest();
        // xhr.open("GET", "http://clibakend:83/", true);
        // xhr.onreadystatechange = function() {
        //     if (xhr.readyState == 4) {
        //         // WARNING! Might be injecting a malicious script!
        //         console.log(xhr.responseText);
        //     }
        // };
        // xhr.send();

        // // this.http.get('http://clibakend:83/')
        // //     .subscribe((data: Response) => console.log(data));
        // // let bodyString = JSON.stringify("some message");
        // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        // // let headers = new Headers({ 'Content-Type': 'application/json' });
        // var params = new URLSearchParams();
        // params.set('name', 'kl');
        // params.set('nme', 'kl');
        // // let options       = new RequestOptions({ headers: headers });
        // this.http.post('http://clibakend:83/', {"g":"gg"}, { headers: headers })
        //     .subscribe((data: Response) => console.log(data["_body"]));
        // // this.http.post('http://clibakend:83/', bodyString, options) // ...using post request
        // //     .subscribe((data: Response) => console.log(data));


        // let headers = new Headers({'Content-Type': 'application/json'});
        // console.log(headers);
        // let options = new RequestOptions({headers: headers});
        // // let options = new RequestOptions({ headers: headers });
        // // this.http.post('http://clibakend:83/', { "sds" }, options);
        // this.http.post('http://clibakend:83/', {"g":"gg"}, options)
        //     .subscribe((data:Response) => console.log(data));
        // this._http=_http;
        // Add callback for lock `authenticated` event



        this.lock.on("authenticated", (authResult:any) => {
            this.lock.getProfile(authResult.idToken, function (err:any, profile:any) {
                if (err) {
                    throw new Error(err);
                }
                localStorage.setItem('profile', JSON.stringify(profile));
                localStorage.setItem('id_token', authResult.idToken);
                // this._http.get('http://clibakend:83/');
                // this._http.get('http://clibakend:83/')
                //     .toPromise()
                //     .then((response: Response) => response.json())
                
                $.post("http://clibakend:83/", {suggest: JSON.stringify(profile)}, function(result){
                    // alert(result);
                    console.log(result);
                });
            });
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    }

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    }

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    }
}