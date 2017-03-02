import { ViewContainerRef, ComponentFactoryResolver, OnChanges, OnDestroy } from '@angular/core';
import { DynamicLoadService } from './dynamic-load.service';
export declare class DynamicLoadComponent implements OnChanges, OnDestroy {
    private vcr;
    private cfr;
    private dynamicLoadService;
    componentData: any;
    private currentComponent;
    constructor(vcr: ViewContainerRef, cfr: ComponentFactoryResolver, dynamicLoadService: DynamicLoadService);
    ngOnChanges(): boolean;
    ngOnDestroy(): void;
}
