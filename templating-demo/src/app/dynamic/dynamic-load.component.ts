import { Component, ViewContainerRef, ComponentFactoryResolver, OnChanges, OnDestroy, Input } from '@angular/core';
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
        if (typeof this.currentComponent !== 'undefined') { this.currentComponent.destroy(); }

        const   availableComponents = this.dynamicLoadService.getComponents(),
                selectors = [],
                selectedComponent = '';

        if (this.componentData.hasOwnProperty('pageContent')) {
            selectors.push('page-' + this.componentData.title.toLowerCase());
            selectors.push('page-' + this.componentData.uuid);
            selectors.push('page');
        } else if (this.componentData.hasOwnProperty('viewReference')) {
            selectors.push('view-' + this.componentData.title.toLowerCase());
            selectors.push('view-' + this.componentData.viewReference);
            selectors.push('view');
        } else if (this.componentData.meta.hasOwnProperty('contentType')) {
            selectors.push('content-' + this.componentData.meta.slug);
            selectors.push('content-' + this.componentData.meta.contentType);
            selectors.push('content');
        } else {
            console.log('nothing to process');
            return false;
        }

        if (selectors.length > 0) {
            let component;
            for (let i = 0; i < availableComponents.length; i++) {
                if (typeof availableComponents[i].selectComponent !== 'undefined') {
                    const componentSelector = availableComponents[i].selectComponent.selector;
                    console.log('selector: ' + componentSelector);
                    if ( typeof selectors.find((x) => x.toLowerCase().indexOf(componentSelector) > -1) !== 'undefined') {
                        component = availableComponents[i];
                        break;
                    }
                }
            }

            const compFactory = this.cfr.resolveComponentFactory(component);

            this.currentComponent = this.vcr.createComponent(compFactory);
            this.currentComponent.instance.data = this.componentData;
        }
    }

    ngOnDestroy() {
        if (typeof this.currentComponent !== 'undefined') { this.currentComponent.destroy(); }
    }
}
