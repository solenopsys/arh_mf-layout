import {Component, ElementRef, Inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {TopPaneConfig} from "@solenopsys/ui-navigate";
import {ColorSchemesService} from "@solenopsys/ui-themes";
import {APP_SELECTOR, ModulesService} from "@solenopsys/fl-globals";
import {Router} from "@angular/router";
import {Navigate} from "@ngxs/router-plugin";
import {InterfaceStateModel, PanelConfig, SelectTab, SetLeftPanel} from "@solenopsys/ui-templates";


@Component({
    selector: APP_SELECTOR,
    templateUrl: './base-template.component.html',
    styleUrls: ['./base-template.component.scss'],
})
export class BaseTemplateComponent {


    mobileMenu = false;
    title = 'solenopsys';


    $panTopPane: Observable<TopPaneConfig>;
    $leftPanel: Observable<PanelConfig>;


    constructor(private cs: ColorSchemesService,

                private elementRef: ElementRef,
                private router: Router,
                private store: Store,
                private modules: ModulesService,
                @Inject("logo")
                protected $logo: Observable<string>
    ) {
        cs.initColors(this.elementRef.nativeElement.style);
        this.$panTopPane = this.store.select(state => (state.interface as InterfaceStateModel).topToolbar.topPaneConfig);
        this.$leftPanel = this.store.select(state => (state.interface as InterfaceStateModel).leftPanel);
        this.store.dispatch(new SetLeftPanel(
            {
                component:"menu",
                id:"left_menu",
            }
        ))

    }



    selectTab(tab: string) {
        this.store.dispatch(new SelectTab(tab));
        this.store.dispatch(new Navigate([tab]))
    }
}

