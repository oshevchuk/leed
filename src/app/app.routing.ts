/**
 * Created by Oshevchuk on 20.03.2017.
 */

import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AuthGuard} from "./auth.guard";
import {CityComponent} from "./components/city/city.component";

const appRoutes: Routes =[
    {
        path:'',
        component: HomeComponent
    },{
        path:'profile',
        component: ProfileComponent,
        canActivate:[AuthGuard]
    },{
        path:'city',
        component: CityComponent,
        canActivate:[AuthGuard]
    }
];

export const appRoutingProviders: any[] = [];
export const routing:ModuleWithProviders =  RouterModule.forRoot(appRoutes);