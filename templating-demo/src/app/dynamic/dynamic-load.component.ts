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
        // The 'ViewContainerRef' has the 'createComponent()' function we need to get the Component in our DOM
        private vcr: ViewContainerRef,
        // The 'ComponentFactoryResolver' gets the component out of the ComponentFactory
        // This can only be done using the component's name
        private cfr: ComponentFactoryResolver,
        // That's where our DynamicLoadService steps in
        // Thanks to the 'ENTRIES' we injected in it
        // .getComponents() now returns an array of all the components that we passed into the 'dynamic-load.module'
        private dynamicLoadService: DynamicLoadService
    ) {}

    ngOnChanges() {
        // First, if a component is already loaded, we keep track of it in 'this.currentComponent'
        // This way we can destroy it before loading a new one
        if (typeof this.currentComponent !== 'undefined') { this.currentComponent.destroy(); }

        const   availableComponents = this.dynamicLoadService.getComponents(),
                selectors = [],
                selectedComponent = '';

        // First we devide the componentData to create a couple scenarios
        if (this.componentData.hasOwnProperty('pageContent')) {
            // The first one is if we have data for a 'page'
            selectors.push('page-' + this.componentData.title.toLowerCase());
            selectors.push('page-' + this.componentData.uuid);
            selectors.push('page');
        } else if (this.componentData.hasOwnProperty('viewReference')) {
            // The second one is if we have data for a 'view'
            selectors.push('view-' + this.componentData.title.toLowerCase());
            selectors.push('view-' + this.componentData.viewReference);
            selectors.push('view');
        } else if (this.componentData.meta.hasOwnProperty('contentType')) {
            // The third one is if we have data for 'content'
            selectors.push('content-' + this.componentData.meta.slug);
            selectors.push('content-' + this.componentData.meta.contentType);
            selectors.push('content');
        } else {
            // If it's none of the above, it's data we can't process so we just return false
            console.log('nothing to process');
            return false;
        }

        // If the previous step provided us with selectors we will now cross-reference them with the selector provided in the component
        // This selector needs to be provided through the 'Dynamic' class (see dynamic.ts)
        if (selectors.length > 0) {
            let component;
            // We loop through all components in the array we got from the 'dynamicLoadService' and stop when we have a match
            for (let i = 0; i < availableComponents.length; i++) {
                // If the component has no selector, it's no use cross-referencing it
                if (typeof availableComponents[i].selectComponent !== 'undefined') {
                    const componentSelector = availableComponents[i].selectComponent.selector;
                    // If the selector matches one of the above created options,
                    // store the component in the component variable and break the for loop
                    if ( typeof selectors.find((x) => x.toLowerCase().indexOf(componentSelector) > -1) !== 'undefined') {
                        component = availableComponents[i];
                        break;
                    }
                }
            }

            // Based on what we retrieved in the previous step we now get the component out of the ComponentFactory
            const compFactory = this.cfr.resolveComponentFactory(component);
            // Using the above we now use the 'ViewContainerRef' to get the Component in our DOM
            // We also store the component in our 'currentComponent' if we need to destroy it.
            this.currentComponent = this.vcr.createComponent(compFactory);
            // Lastly we pass the resolved data to the component
            this.currentComponent.instance.data = this.componentData;
        }
    }

    ngOnDestroy() {
        if (typeof this.currentComponent !== 'undefined') { this.currentComponent.destroy(); }
    }
}
