import { Component, ViewContainerRef, ComponentFactoryResolver, OnChanges, OnDestroy, Input, Inject } from '@angular/core';
import { DynamicLoadService } from './dynamic-load.service';

@Component({
    selector: 'app-dynamic-load',
    template: '',
    styles:  [':host { display: block; }']
})
export class DynamicLoadComponent implements OnChanges, OnDestroy {
    @Input()
    componentData: any;
    @Input()
    type: string;

    private currentComponent: any;

    constructor(
        // The 'ViewContainerRef' has the 'createComponent()' function we need to get the Component in our DOM
        @Inject(ViewContainerRef) private vcr,
        // The 'ComponentFactoryResolver' gets the component out of the ComponentFactory
        // This can only be done using the component's name
        @Inject(ComponentFactoryResolver) private cfr,
        // That's where our DynamicLoadService steps in
        // Thanks to the 'ENTRIES' we injected in it
        // .getComponents() now returns an array of all the components that we passed into the 'dynamic-load.module'
        @Inject(DynamicLoadService) private dynamicLoadService
    ) {}

    ngOnChanges() {
        // First, if a component is already loaded, we keep track of it in 'this.currentComponent'
        // This way we can destroy it before loading a new one
        if (typeof this.currentComponent !== 'undefined') { this.currentComponent.destroy(); }

        let     availableComponents = [],
                selectedComponent;

        if (!this.componentData) {
            return;
        }

        // First we divide the componentData to create a couple scenarios
        if (this.componentData.err !== null && this.type === 'view') {
            // The first one is if we have data for a 'view'
            availableComponents = this.dynamicLoadService.getViewComponents();
                // tslint:disable max-line-length
            selectedComponent = availableComponents.find((comp) => comp.selectComponent.viewReference === this.componentData.viewReference);
            if (typeof selectedComponent === 'undefined') { selectedComponent = availableComponents.find((comp) => comp.selectComponent.viewType === this.componentData.viewType); }
            if (typeof selectedComponent === 'undefined') { selectedComponent = availableComponents.find((comp) => comp.selectComponent.contentType === this.componentData.contentType); }
            if (typeof selectedComponent === 'undefined') { selectedComponent = availableComponents.find((comp) => comp.selectComponent.fallback === true); }
                // tslint:enable max-line-length
        } else if (this.componentData.err !== null && this.type === 'partial') {
            // The second one is if we have data for 'partial'
            availableComponents = this.dynamicLoadService.getPartialComponents();
                // tslint:disable max-line-length
            selectedComponent = availableComponents.find((comp) => comp.selectComponent.safeLabel === this.componentData.meta.safeLabel);
            if (typeof selectedComponent === 'undefined') { selectedComponent = availableComponents.find((comp) => comp.selectComponent.contentType === this.componentData.meta.contentType); }
            if (typeof selectedComponent === 'undefined') { selectedComponent = availableComponents.find((comp) => comp.selectComponent.fallback === true); }
                // tslint:enable max-line-length
        } else if (this.componentData.err !== null && this.type === 'content') {
            // The third one is if we have data for 'content'
            availableComponents = this.dynamicLoadService.getContentComponents();
                // tslint:disable max-line-length
            selectedComponent = availableComponents.find((comp) => comp.selectComponent.slug === this.componentData.meta.slug);
            if (typeof selectedComponent === 'undefined') { selectedComponent = availableComponents.find((comp) => comp.selectComponent.safeLabel === this.componentData.meta.safeLabel); }
            if (typeof selectedComponent === 'undefined') { selectedComponent = availableComponents.find((comp) => comp.selectComponent.contentType === this.componentData.meta.contentType); }
            if (typeof selectedComponent === 'undefined') { selectedComponent = availableComponents.find((comp) => comp.selectComponent.fallback === true); }
                // tslint:enable max-line-length
        } else {
            // If it's none of the above, it's data we can't process so we just return false
            console.log('Please provide the type attribute to let the module know to load a view, partial or content');
            return false;
        }

        // After checking for a component which matches the criteria, render it
        if (typeof selectedComponent !== 'undefined') {
            // Based on what we retrieved in the previous step we now get the component out of the ComponentFactory
            const compFactory = this.cfr.resolveComponentFactory(selectedComponent);
            // Using the above we now use the 'ViewContainerRef' to get the Component in our DOM
            // We also store the component in our 'currentComponent' if we need to destroy it.
            this.currentComponent = this.vcr.createComponent(compFactory);
            // Lastly we pass the resolved data to the component
            this.currentComponent.instance.data = this.componentData;
        } else {
            console.log('there was no component found');
        }
    }

    ngOnDestroy() {
        if (typeof this.currentComponent !== 'undefined') { this.currentComponent.destroy(); }
    }
}
