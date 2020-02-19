var DynamicLoadModule_1;
import * as tslib_1 from "tslib";
import { NgModule, InjectionToken, ANALYZE_FOR_ENTRY_COMPONENTS, Inject } from '@angular/core';
import { DynamicLoadService } from './dynamic-load.service';
import { DynamicLoadComponent } from './dynamic-load.component';
// We use an exported function to prevent AoT complications when using the DynamicLoadService in forRoot()
export function DynamicLoadFactory(cmps) {
    return new DynamicLoadService(cmps);
}
export const ENTRIES = new InjectionToken('ENTRIES');
let DynamicLoadModule = DynamicLoadModule_1 = class DynamicLoadModule {
    static forRoot(components) {
        return {
            ngModule: DynamicLoadModule_1,
            providers: [{
                    // This first provider takes the components which are passed from the app.module
                    // It then adds hem to the ComponentFactory with 'ANALYZE_FOR_ENTRY_COMPONENTS'
                    // 'ANALYZE_FOR_ENTRY_COMPONENTS' is an opaqueToken which is built-into Angular2 for doing so
                    provide: ANALYZE_FOR_ENTRY_COMPONENTS,
                    useValue: components,
                    multi: true
                },
                {
                    // The second provider creates the token 'Entries'
                    // This is needed because 'ANALYZE_FOR_ENTRY_COMPONENTS' is not part of the dependency injection tree
                    provide: ENTRIES,
                    useValue: components
                },
                {
                    // Lastly we inject 'ENTRIES' in the DynamicLoadService
                    // This is were we need the exported function 'DynamicLoadFactory' to prevent AoT problems
                    provide: DynamicLoadService,
                    useFactory: DynamicLoadFactory,
                    deps: [[new Inject(ENTRIES)]]
                }]
        };
    }
};
DynamicLoadModule = DynamicLoadModule_1 = tslib_1.__decorate([
    NgModule({
        declarations: [
            DynamicLoadComponent
        ],
        exports: [
            DynamicLoadComponent
        ]
    })
], DynamicLoadModule);
export { DynamicLoadModule };
//# sourceMappingURL=dynamic-load.module.js.map