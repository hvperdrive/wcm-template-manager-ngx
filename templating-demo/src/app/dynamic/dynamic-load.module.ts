import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS, Inject } from '@angular/core';
import { DynamicLoadService } from './dynamic-load.service';

import { DynamicLoadComponent } from './dynamic-load.component';

export function DynamicLoadFactory(cmps) {
    return new DynamicLoadService(cmps);
}

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
                multi: true
            },
            {
                provide: 'ENTRIES',
                useValue: components
            },
            {
                provide: DynamicLoadService,
                useFactory: DynamicLoadFactory,
                deps: [[new Inject('ENTRIES')]]
            }]
        };
    }
}
