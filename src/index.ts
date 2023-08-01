

export * from './app/entry.module';
import {RemoteEntryModule} from "./app/entry.module";

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

type XsModuleConnector={
    init: (layoutConf,loadFunc,mapping)=>void
}



export function init(layoutConf,loadFunc,mapping){

    platformBrowserDynamic()
        .bootstrapModule(RemoteEntryModule).then((module)=>{

            // @ts-ignore
            module.instance.setConfigSource(layoutConf,loadFunc,mapping);

        })
        .catch((err) => console.error(err));
}




