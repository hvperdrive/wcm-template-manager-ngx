import * as tslib_1 from "tslib";
import { Component, ViewContainerRef, ComponentFactoryResolver, Input, Inject } from '@angular/core';
import { DynamicLoadService } from './dynamic-load.service';
let DynamicLoadComponent = class DynamicLoadComponent {
    constructor(
    // The 'ViewContainerRef' has the 'createComponent()' function we need to get the Component in our DOM
    vcr, 
    // The 'ComponentFactoryResolver' gets the component out of the ComponentFactory
    // This can only be done using the component's name
    cfr, 
    // That's where our DynamicLoadService steps in
    // Thanks to the 'ENTRIES' we injected in it
    // .getComponents() now returns an array of all the components that we passed into the 'dynamic-load.module'
    dynamicLoadService) {
        this.vcr = vcr;
        this.cfr = cfr;
        this.dynamicLoadService = dynamicLoadService;
    }
    ngOnChanges() {
        // First, if a component is already loaded, we keep track of it in 'this.currentComponent'
        // This way we can destroy it before loading a new one
        if (typeof this.currentComponent !== 'undefined') {
            this.currentComponent.destroy();
        }
        // Get component based on the data.
        const selectedComponent = this.dynamicLoadService.selectComponent(this.type, this.componentData);
        // After checking for a component which matches the criteria, render it
        if (selectedComponent) {
            // Based on what we retrieved in the previous step we now get the component out of the ComponentFactory
            const compFactory = this.cfr.resolveComponentFactory(selectedComponent);
            // Using the above we now use the 'ViewContainerRef' to get the Component in our DOM
            // We also store the component in our 'currentComponent' if we need to destroy it.
            this.currentComponent = this.vcr.createComponent(compFactory);
            // Lastly we pass the resolved data to the component
            this.currentComponent.instance.data = this.componentData;
        }
        else {
            console.log('there was no component found');
        }
    }
    ngOnDestroy() {
        if (typeof this.currentComponent !== 'undefined') {
            this.currentComponent.destroy();
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DynamicLoadComponent.prototype, "componentData", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DynamicLoadComponent.prototype, "type", void 0);
DynamicLoadComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dynamic-load',
        template: '',
        styles: [':host { display: block; }']
    }),
    tslib_1.__param(0, Inject(ViewContainerRef)),
    tslib_1.__param(1, Inject(ComponentFactoryResolver)),
    tslib_1.__param(2, Inject(DynamicLoadService)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], DynamicLoadComponent);
export { DynamicLoadComponent };
//# sourceMappingURL=dynamic-load.component.js.map