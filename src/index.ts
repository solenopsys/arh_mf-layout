

export * from './app/entry.module';
import {RemoteEntryModule} from "./app/entry.module";

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";




export function init(dataPath,loadFunc,mapping){
    platformBrowserDynamic()
        .bootstrapModule(RemoteEntryModule).then((module)=>{

            // @ts-ignore
            module.instance.setConfigSource(dataPath,loadFunc,mapping);

        })
        .catch((err) => console.error(err));
}




