"use strict";
var core_1 = require('@angular/core');
var dynamic_load_service_1 = require('./dynamic-load.service');
var dynamic_load_component_1 = require('./dynamic-load.component');
// We use an exported function to prevent AoT complications when using the DynamicLoadService in forRoot()
function DynamicLoadFactory(cmps) {
    return new dynamic_load_service_1.DynamicLoadService(cmps);
}
exports.DynamicLoadFactory = DynamicLoadFactory;
var DynamicLoadModule = (function () {
    function DynamicLoadModule() {
    }
    DynamicLoadModule.forRoot = function (components) {
        return {
            ngModule: DynamicLoadModule,
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
                    provide: 'ENTRIES',
                    useValue: components
                },
                {
                    // Lastly we inject 'ENTRIES' in the DynamicLoadService
                    // This is were we need the exported function 'DynamicLoadFactory' to prevent AoT problems
                    provide: dynamic_load_service_1.DynamicLoadService,
                    useFactory: DynamicLoadFactory,
                    deps: [[new core_1.Inject('ENTRIES')]]
                }]
        };
    };
    DynamicLoadModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        dynamic_load_component_1.DynamicLoadComponent
                    ],
                    exports: [
                        dynamic_load_component_1.DynamicLoadComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    DynamicLoadModule.ctorParameters = function () { return []; };
    return DynamicLoadModule;
}());
exports.DynamicLoadModule = DynamicLoadModule;
//# sourceMappingURL=dynamic-load.module.js.map