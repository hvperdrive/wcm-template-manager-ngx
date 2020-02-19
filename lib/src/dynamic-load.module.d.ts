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
            useFactory?: undefined;
            deps?: undefined;
        } | {
            provide: InjectionToken<Component[]>;
            useValue: any[];
            multi?: undefined;
            useFactory?: undefined;
            deps?: undefined;
        } | {
            provide: typeof DynamicLoadService;
            useFactory: typeof DynamicLoadFactory;
            deps: Inject[][];
            useValue?: undefined;
            multi?: undefined;
        })[];
    };
}
