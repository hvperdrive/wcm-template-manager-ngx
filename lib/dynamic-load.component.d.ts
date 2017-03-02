import { ViewContainerRef, ComponentFactoryResolver, OnChanges, OnDestroy } from '@angular/core';
export declare class DynamicLoadComponent implements OnChanges, OnDestroy {
    private vcr;
    private cfr;
    componentData: any;
    private currentComponent;
    constructor(vcr: ViewContainerRef, cfr: ComponentFactoryResolver);
    ngOnChanges(): void;
    ngOnDestroy(): void;
}
