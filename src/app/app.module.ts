import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';



import {AppComponent} from './app.component';
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {Auth} from "./services/auth.service";
import {AuthGuard} from "./auth.guard";

// import {AUTH_PROVIDERS} from 'angular2-jwt';

//AUTH_PROVIDERS - fix
// export function authFactory(http: Http, options: RequestOptions) {
//     return new AuthHttp(new AuthConfig({
//         // Config options if you want
//     }), http, options);
// };
//
// // Include this in your ngModule providers
// export const authProvider = {
//     provide: AuthHttp,
//     deps: [Http, RequestOptions],
//     useFactory: authFactory
// };

@NgModule({
    imports: [
        BrowserModule,
        routing,
        HttpModule,

    ],
    declarations: [
        AppComponent, HomeComponent, ProfileComponent
    ],
    providers: [
        appRoutingProviders,
        // AUTH_PROVIDERS,
        Auth,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
