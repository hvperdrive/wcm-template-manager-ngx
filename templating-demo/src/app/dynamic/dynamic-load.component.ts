import {Component, ViewContainerRef, ComponentFactoryResolver, OnChanges, OnDestroy, Input } from '@angular/core';
import { DynamicLoadService } from './dynamic-load.service';

@Component({
    selector: 'app-dynamic-load',
    template: ''
})
export class DynamicLoadComponent implements OnChanges, OnDestroy {
    @Input()
    componentData: any;

    private currentComponent: any;

    constructor(
        private vcr: ViewContainerRef,
        private cfr: ComponentFactoryResolver,
        private dynamicLoadService: DynamicLoadService
    ) {}

    ngOnChanges() {
        let selectedComponent: string;

        if (this.componentData.hasOwnProperty('pageContent')) {
            if (this.componentData.uuid === '5e2754be-ff90-47e8-8cfe-1ed67693e574') {
                selectedComponent = 'blog';
            } else if (this.componentData.uuid === '77be3fc4-9165-4e98-aaa3-a1cb451433af') {
                selectedComponent = 'faq';
            }
        } else if (this.componentData.hasOwnProperty('viewReference')) {
            selectedComponent = 'view';
        } else if (this.componentData.meta.hasOwnProperty('contentType')) {
            selectedComponent = 'blogpost';
        } else {
            console.log('nothing to process');
            return false;
        }

        if (selectedComponent !== '') {
            if (typeof this.currentComponent !== 'undefined') { this.currentComponent.destroy(); }

            const   components = this.dynamicLoadService.getComponents(),
                    component: any = components.find((x) => x.name.toLowerCase().indexOf(selectedComponent) > -1),
                    compFactory = this.cfr.resolveComponentFactory(component);

            this.currentComponent = this.vcr.createComponent(compFactory);
            this.currentComponent.instance.data = this.componentData;
        }
    }

    ngOnDestroy() {
        if (typeof this.currentComponent !== 'undefined') { this.currentComponent.destroy(); }
    }
}
