/**
 * Created by Oshevchuk on 20.03.2017.
 */
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Auth} from "../../services/auth.service";

// localStorage.setItem('id_token', authResult.idToken);

import {HttpService} from "../../services/http.service";

@Component({
    moduleId: module.id,
    selector: 'profile',
    templateUrl: './profile.component.html',
    providers: [HttpService]
})
export class ProfileComponent implements OnInit{
    profile:any;
    constructor(private auth:Auth, private httpService:HttpService){
        this.profile=JSON.parse(localStorage.getItem('profile'));
        // console.log(this.profile);
        // console.log(this.httpService.getData());5
    }

    ngOnInit(){
        this.httpService.getData().subscribe((data:Response) => console.log(data));
    }
}
