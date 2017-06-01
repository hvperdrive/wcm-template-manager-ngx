"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dynamic_load_service_1 = require("./dynamic-load.service");
var dynamic_load_component_1 = require("./dynamic-load.component");
// We use an exported function to prevent AoT complications when using the DynamicLoadService in forRoot()
function DynamicLoadFactory(cmps) {
    return new dynamic_load_service_1.DynamicLoadService(cmps);
}
exports.DynamicLoadFactory = DynamicLoadFactory;
exports.ENTRIES = new core_1.InjectionToken("ENTRIES");
var DynamicLoadModule = DynamicLoadModule_1 = (function () {
    function DynamicLoadModule() {
    }
    DynamicLoadModule.forRoot = function (components) {
        return {
            ngModule: DynamicLoadModule_1,
            providers: [{
                    // This first provider takes the components which are passed from the app.module
                    // It then adds hem to the ComponentFactory with 'ANALYZE_FOR_ENTRY_COMPONENTS'
                    // 'ANALYZE_FOR_ENTRY_COMPONENTS' is an opaqueToken which is built-into Angular2 for doing so
                    provide: core_1.ANALYZE_FOR_ENTRY_COMPONENTS,
                    useValue: components,
                    multi: true
                },
                {
                    // The second provider creates the token 'Entries'
                    // This is needed because 'ANALYZE_FOR_ENTRY_COMPONENTS' is not part of the dependency injection tree
                    provide: exports.ENTRIES,
                    useValue: components
                },
                {
                    // Lastly we inject 'ENTRIES' in the DynamicLoadService
                    // This is were we need the exported function 'DynamicLoadFactory' to prevent AoT problems
                    provide: dynamic_load_service_1.DynamicLoadService,
                    useFactory: DynamicLoadFactory,
                    deps: [[new core_1.Inject(exports.ENTRIES)]]
                }]
        };
    };
    return DynamicLoadModule;
}());
DynamicLoadModule = DynamicLoadModule_1 = __decorate([
    core_1.NgModule({
        declarations: [
            dynamic_load_component_1.DynamicLoadComponent
        ],
        exports: [
            dynamic_load_component_1.DynamicLoadComponent
        ]
    })
], DynamicLoadModule);
exports.DynamicLoadModule = DynamicLoadModule;
var DynamicLoadModule_1;
//# sourceMappingURL=dynamic-load.module.js.map