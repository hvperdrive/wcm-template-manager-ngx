"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dynamic_load_service_1 = require("./dynamic-load.service");
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
        var _this = this;
        // First, if a component is already loaded, we keep track of it in 'this.currentComponent'
        // This way we can destroy it before loading a new one
        if (typeof this.currentComponent !== 'undefined') {
            this.currentComponent.destroy();
        }
        var availableComponents = [], selectedComponent;
        // First we divide the componentData to create a couple scenarios
        if (this.componentData.err !== null && this.type === 'view') {
            // The first one is if we have data for a 'view'
            availableComponents = this.dynamicLoadService.getViewComponents();
            // tslint:disable max-line-length
            selectedComponent = availableComponents.find(function (comp) { return comp.selectComponent.viewReference === _this.componentData.viewReference; });
            if (typeof selectedComponent === 'undefined') {
                selectedComponent = availableComponents.find(function (comp) { return comp.selectComponent.viewType === _this.componentData.viewType; });
            }
            if (typeof selectedComponent === 'undefined') {
                selectedComponent = availableComponents.find(function (comp) { return comp.selectComponent.contentType === _this.componentData.contentType; });
            }
            if (typeof selectedComponent === 'undefined') {
                selectedComponent = availableComponents.find(function (comp) { return comp.selectComponent.fallback === true; });
            }
            // tslint:enable max-line-length
        }
        else if (this.componentData.err !== null && this.type === 'partial') {
            // The second one is if we have data for 'partial'
            availableComponents = this.dynamicLoadService.getPartialComponents();
            // tslint:disable max-line-length
            selectedComponent = availableComponents.find(function (comp) { return comp.selectComponent.safeLabel === _this.componentData.meta.safeLabel; });
            if (typeof selectedComponent === 'undefined') {
                selectedComponent = availableComponents.find(function (comp) { return comp.selectComponent.contentType === _this.componentData.meta.contentType; });
            }
            if (typeof selectedComponent === 'undefined') {
                selectedComponent = availableComponents.find(function (comp) { return comp.selectComponent.fallback === true; });
            }
            // tslint:enable max-line-length
        }
        else if (this.componentData.err !== null && this.type === 'content') {
            // The third one is if we have data for 'content'
            availableComponents = this.dynamicLoadService.getContentComponents();
            // tslint:disable max-line-length
            selectedComponent = availableComponents.find(function (comp) { return comp.selectComponent.slug === _this.componentData.meta.slug; });
            if (typeof selectedComponent === 'undefined') {
                selectedComponent = availableComponents.find(function (comp) { return comp.selectComponent.safeLabel === _this.componentData.meta.safeLabel; });
            }
            if (typeof selectedComponent === 'undefined') {
                selectedComponent = availableComponents.find(function (comp) { return comp.selectComponent.contentType === _this.componentData.meta.contentType; });
            }
            if (typeof selectedComponent === 'undefined') {
                selectedComponent = availableComponents.find(function (comp) { return comp.selectComponent.fallback === true; });
            }
            // tslint:enable max-line-length
        }
        else {
            // If it's none of the above, it's data we can't process so we just return false
            console.log('Please provide the type attribute to let the module know to load a view, partial or content');
            return false;
        }
        // After checking for a component which matches the criteria, render it
        if (typeof selectedComponent !== 'undefined') {
            // Based on what we retrieved in the previous step we now get the component out of the ComponentFactory
            var compFactory = this.cfr.resolveComponentFactory(selectedComponent);
            // Using the above we now use the 'ViewContainerRef' to get the Component in our DOM
            // We also store the component in our 'currentComponent' if we need to destroy it.
            this.currentComponent = this.vcr.createComponent(compFactory);
            // Lastly we pass the resolved data to the component
            this.currentComponent.instance.data = this.componentData;
        }
        else {
            console.log('there was no component found');
        }
    };
    DynamicLoadComponent.prototype.ngOnDestroy = function () {
        if (typeof this.currentComponent !== 'undefined') {
            this.currentComponent.destroy();
        }
    };
    return DynamicLoadComponent;
}());
__decorate([
    core_1.Input()
], DynamicLoadComponent.prototype, "componentData", void 0);
__decorate([
    core_1.Input()
], DynamicLoadComponent.prototype, "type", void 0);
DynamicLoadComponent = __decorate([
    core_1.Component({
        selector: 'app-dynamic-load',
        template: '',
        styles: [':host { display: block; }']
    }),
    __param(0, core_1.Inject(core_1.ViewContainerRef)),
    __param(1, core_1.Inject(core_1.ComponentFactoryResolver)),
    __param(2, core_1.Inject(dynamic_load_service_1.DynamicLoadService))
], DynamicLoadComponent);
exports.DynamicLoadComponent = DynamicLoadComponent;
//# sourceMappingURL=dynamic-load.component.js.map