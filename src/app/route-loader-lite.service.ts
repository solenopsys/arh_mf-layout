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


const loadWrapper = (key, modName, fn): any => { //  const remoteEntry = host + `remoteEntry.js`;
    return {
        path: key,
        loadChildren: () => fn(modName).then(m => {
            return m.MICRO
        })
    };
};


@Injectable({
    providedIn: "root"
})
export class RouteLoaderServiceLite {
    loadMod: any;
    mapping: { [key: string]: string } = {};

    loadedModules: { [key: string]: boolean } = {}

    public setLoadFunc(data: { load, mapping }) {
        this.loadMod = data.load
        this.mapping = data.mapping
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
                        const rs = [];

                        rs.push(loadWrapper(path, mappingElement, this.loadMod));
                        console.log("RS", rs)
                        this.router.resetConfig([...rs, ...BASE_ROUTES]);
                        this.loadedModules[firstSegmentOfUrl] = true;
                        this.router.navigate([firstSegmentOfUrl])
                    }
                }
            }
        });
    }
}
