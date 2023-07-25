export * from './app/entry.module';
import {RemoteEntryModule} from "./app/entry.module";

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";


export const MICRO=RemoteEntryModule;

export function init(mod,data){
    platformBrowserDynamic()
        .bootstrapModule(mod).then((module)=>{

            // @ts-ignore
            module.instance.setLoadFunc(data);
        })

        .catch((err) => console.error(err));
}

