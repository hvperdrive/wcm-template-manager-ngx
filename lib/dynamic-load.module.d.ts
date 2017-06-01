import { Component, InjectionToken, Inject } from '@angular/core';
import { DynamicLoadService } from './dynamic-load.service';
export declare function DynamicLoadFactory(cmps: any): DynamicLoadService;
export declare const ENTRIES: InjectionToken<Component[]>;
export declare class DynamicLoadModule {
    static forRoot(components: any[]): {
        ngModule: typeof DynamicLoadModule;
        providers: ({
            provide: InjectionToken<any>;
            useValue: any[];
            multi: boolean;
        } | {
            provide: InjectionToken<Component[]>;
            useValue: any[];
        } | {
            provide: typeof DynamicLoadService;
            useFactory: (cmps: any) => DynamicLoadService;
            deps: Inject[][];
        })[];
    };
}
