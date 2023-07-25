import {Inject, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app-component/app.component';
import {RouterModule} from '@angular/router';
//import "@angular/compiler"
import {BASE_ROUTES, LoadingComponent, RouteLoaderServiceLite} from "./route-loader-lite.service";


@NgModule({
    declarations: [AppComponent, LoadingComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(
            BASE_ROUTES
        ),
    ],
    providers: [
        RouteLoaderServiceLite
    ],
    bootstrap: [AppComponent]
})
export class RemoteEntryModule {
    constructor(private al: RouteLoaderServiceLite) {
    }

    public setLoadFunc(data) {
        console.log("LOAD FUNC",data)
        this.al.setLoadFunc(data)
    }
}
