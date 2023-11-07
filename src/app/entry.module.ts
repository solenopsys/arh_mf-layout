import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {BASE_ROUTES, LoadingComponent, RouteLoaderServiceLite} from "./route-loader-lite.service";
import {UINavigateModule} from "@solenopsys/ui-navigate";
import {NgxsModule, Store} from "@ngxs/store";
import {HttpClientModule} from "@angular/common/http";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";
import {BaseTemplateComponent} from "./base-template/base-template.component";

import {Subject} from "rxjs";
import {InterfaceState,  MenuState, SetTabs, UITemplatesModule} from "@solenopsys/ui-templates";

import {LayoutEntry, trailingSlash} from "@solenopsys/fl-globals";


const $logo = new Subject();

@NgModule({
    declarations: [ LoadingComponent, BaseTemplateComponent,
        ],
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
            {provide: "logo", useValue: $logo},
        ]),

    ],
    bootstrap: [BaseTemplateComponent]
})
export class RemoteEntryModule implements LayoutEntry{
    constructor(private al: RouteLoaderServiceLite, private store: Store) {

    }


    public setConfigSource(
        data: { navigate: { [route: string]: { title: string } }, logo: string, title: string },
        func: any,
        mapping: { [key: string]: { module:string,data:any } }
    ) {
        $logo.next(data.logo)

        let nav = data.navigate;
        let keys = Object.keys(nav);

        const tabs = keys.map((key) => {
            return {id: key, title: nav[key].title};
        });

        this.store.dispatch(
            new SetTabs(tabs)
        );

        this.al.setLoadFunc(func, mapping)


    }
}

trailingSlash();