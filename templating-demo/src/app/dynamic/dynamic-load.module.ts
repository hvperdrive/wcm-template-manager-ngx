import {NgModule, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import { DynamicLoadService } from './dynamic-load.service';

import { DynamicLoadComponent } from './dynamic-load.component';

@NgModule({
    declarations: [
        DynamicLoadComponent
    ],
    exports: [
        DynamicLoadComponent
    ]
})
export class DynamicLoadModule {
    static forRoot(components: any[]) {
        return {
            ngModule: DynamicLoadModule,
            providers: [{
                provide: ANALYZE_FOR_ENTRY_COMPONENTS,
                useValue: components,
                multi: true,
            }, {
                provide: DynamicLoadService,
                useValue: new DynamicLoadService(components)
            }]
        };
    }
}
