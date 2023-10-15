import {Component, Injectable, ViewEncapsulation} from "@angular/core";
import {ClusterState} from "@solenopsys/fl-clusters";

import {NavigationStart, Router} from "@angular/router";

@Component({
    template: "Loading..",
    encapsulation: ViewEncapsulation.Emulated
})
export class LoadingComponent {


}


export const BASE_ROUTES = [
    {path: '**', component: LoadingComponent}
]


const loadWrapper = (key, conf:{module:string,data:any}, fn): any => { //  const remoteEntry = host + `remoteEntry.js`;
    return {
        path: key,
        loadChildren: () => fn(conf.module).then(m => {
            return m.ENTRY.module //todo
        }),
        data: conf.data
    };
};


@Injectable({
    providedIn: "root"
})
export class RouteLoaderServiceLite {
    loadMod: any;
    mapping: { [key: string]: { module: string, data: any } } = {};

    loadedModules: { [key: string]: boolean } = {}

    rs = [];

    public setLoadFunc(loadFunc: () => any, mapping: { [key: string]: { module: string, data: any } }) {
        console.log("SET LOAD FUNCTION ", mapping)

        this.loadMod = loadFunc
        this.mapping = mapping
    }

    constructor(
        private router: Router,
    ) {
        router.events.forEach((event) => {


            if (event instanceof NavigationStart) {

                console.log("PRINT ROUTE", event)
                console.log("MODULE MAPPING", this.mapping)
                const strings = event.url.split("/");
                const firstSegmentOfUrl = strings[1]
                if (firstSegmentOfUrl != "" && !this.loadedModules[firstSegmentOfUrl]) {
                    console.log("LOAD OK", firstSegmentOfUrl)
                    const path = firstSegmentOfUrl;
                    let mappingElement = this.mapping[firstSegmentOfUrl];
                    if (mappingElement) {


                        this.rs.push(loadWrapper(path, mappingElement, this.loadMod));

                        this.router.resetConfig([...this.rs, ...BASE_ROUTES]);
                        this.loadedModules[firstSegmentOfUrl] = true;
                        this.router.navigate([firstSegmentOfUrl])
                    }
                }
            }
        });
    }
}
