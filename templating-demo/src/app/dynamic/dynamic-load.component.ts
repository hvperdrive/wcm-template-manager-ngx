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
            selectors.push('page');
            selectors.push('page-' + this.componentData.title.toLowerCase());
            selectors.push('page-' + this.componentData.uuid);
        } else if (this.componentData.hasOwnProperty('viewReference')) {
            selectors.push('view');
            selectors.push('view-' + this.componentData.title.toLowerCase());
            selectors.push('view-' + this.componentData.viewReference);
        } else if (this.componentData.meta.hasOwnProperty('contentType')) {
            selectors.push('content');
            selectors.push('content-' + this.componentData.meta.slug);
            selectors.push('content-' + this.componentData.meta.contentType);
        } else {
            console.log('nothing to process');
            return false;
        }

        if (selectors.length > 0) {
            let component;
            for (let i = 0; i < availableComponents.length; i++) {
                if (typeof availableComponents[i].selectComponent !== 'undefined') {
                    const componentSelector = availableComponents[i].selectComponent.selector;
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
