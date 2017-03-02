import { OpaqueToken, Inject } from '@angular/core';
import { DynamicLoadService } from './dynamic-load.service';
export declare function DynamicLoadFactory(cmps: any): DynamicLoadService;
export declare class DynamicLoadModule {
    static forRoot(components: any[]): {
        ngModule: typeof DynamicLoadModule;
        providers: ({
            provide: OpaqueToken;
            useValue: any[];
            multi: boolean;
        } | {
            provide: string;
            useValue: any[];
        } | {
            provide: typeof DynamicLoadService;
            useFactory: (cmps: any) => DynamicLoadService;
            deps: Inject[][];
        })[];
    };
}
