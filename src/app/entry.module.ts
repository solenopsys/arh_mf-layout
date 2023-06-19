import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], {initialNavigation: 'enabledBlocking'}),
    ],
    providers: [],
})
export class RemoteEntryModule {
}
