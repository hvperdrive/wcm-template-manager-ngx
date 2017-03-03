"use strict";
var core_1 = require('@angular/core');
var dynamic_load_service_1 = require('./dynamic-load.service');
var DynamicLoadComponent = (function () {
    function DynamicLoadComponent(
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
    DynamicLoadComponent.prototype.ngOnChanges = function () {
        // First, if a component is already loaded, we keep track of it in 'this.currentComponent'
        // This way we can destroy it before loading a new one
        if (typeof this.currentComponent !== 'undefined') {
            this.currentComponent.destroy();
        }
        var availableComponents = this.dynamicLoadService.getComponents(), selectors = [], selectedComponent = '';
        // First we devide the componentData to create a couple scenarios
        if (this.componentData.hasOwnProperty('pageContent')) {
            // The first one is if we have data for a 'page'
            selectors.push('page-' + this.componentData.title.toLowerCase());
            selectors.push('page-' + this.componentData.uuid);
            selectors.push('page');
        }
        else if (this.componentData.hasOwnProperty('viewReference')) {
            // The second one is if we have data for a 'view'
            selectors.push('view-' + this.componentData.title.toLowerCase());
            selectors.push('view-' + this.componentData.viewReference);
            selectors.push('view');
        }
        else if (this.componentData.meta.hasOwnProperty('contentType')) {
            // The third one is if we have data for 'content'
            selectors.push('content-' + this.componentData.meta.slug);
            selectors.push('content-' + this.componentData.meta.contentType);
            selectors.push('content');
        }
        else {
            // If it's none of the above, it's data we can't process so we just return false
            console.log('nothing to process');
            return false;
        }
        // If the previous step provided us with selectors we will now cross-reference them with the selector provided in the component
        // This selector needs to be provided through the 'Dynamic' class (see dynamic.ts)
        if (selectors.length > 0) {
            var component = void 0;
            // Loop through the selectors
            var _loop_1 = function(i) {
                // Check if any of the options can be found in the availableComponents
                component = availableComponents.find(function (comp) { return comp.selectComponent.selector.toLowerCase() === selectors[i]; });
                // If a usable component is found, break the for-loop
                if (typeof component !== 'undefined') {
                    return "break";
                }
            };
            for (var i = 0; i < selectors.length; i++) {
                var state_1 = _loop_1(i);
                if (state_1 === "break") break;
            }
            if (typeof component !== 'undefined') {
                // Based on what we retrieved in the previous step we now get the component out of the ComponentFactory
                var compFactory = this.cfr.resolveComponentFactory(component);
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
    };
    DynamicLoadComponent.prototype.ngOnDestroy = function () {
        if (typeof this.currentComponent !== 'undefined') {
            this.currentComponent.destroy();
        }
    };
    DynamicLoadComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-dynamic-load',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    DynamicLoadComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.ViewContainerRef,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.ComponentFactoryResolver,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [dynamic_load_service_1.DynamicLoadService,] },] },
    ]; };
    DynamicLoadComponent.propDecorators = {
        'componentData': [{ type: core_1.Input },],
    };
    return DynamicLoadComponent;
}());
exports.DynamicLoadComponent = DynamicLoadComponent;
//# sourceMappingURL=dynamic-load.component.js.map