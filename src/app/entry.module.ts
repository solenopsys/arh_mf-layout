import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app-component/app.component';
import {RouterModule} from '@angular/router';
import {BASE_ROUTES, LoadingComponent, RouteLoaderServiceLite} from "./route-loader-lite.service";
import {UINavigateModule} from "@solenopsys/ui-navigate";
import {InterfaceState, MenuState, SetTabs, UITemplatesModule} from "@solenopsys/ui-templates";
import {NgxsModule, Store} from "@ngxs/store";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";



@NgModule({
    declarations: [AppComponent, LoadingComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(
            BASE_ROUTES
        ),
        NgxsModule.forRoot(
            [InterfaceState, MenuState],
        ),
        NgxsLoggerPluginModule.forRoot(),
        NgxsRouterPluginModule.forRoot(),
        UINavigateModule,
        UITemplatesModule,
    ],
    providers: [
        RouteLoaderServiceLite,
        ...([
            {provide: "assets_dir", useValue: ""},
            {provide: "logo", useValue: "/endpoints/new/robotization/assets/logo.svg"},
        ]),
    ],
    bootstrap: [AppComponent]
})
export class RemoteEntryModule {
    constructor(private al: RouteLoaderServiceLite, private store: Store, private http: HttpClient) {

    }


    public setConfigSource(source: string,func:any,mapping: { [key: string]: string }) {
        this.http.get(source).subscribe((data: { navigate:{[route:string]: { title:string }} }) => {
            let nav = data.navigate;
            let keys = Object.keys( nav);

            const tabs=keys.map((key) => {
                return {id:key, title:nav[key].title};
            });

            this.store.dispatch(
                new SetTabs(tabs)
            );

            this.al.setLoadFunc(func,mapping)
        });


    }
}
