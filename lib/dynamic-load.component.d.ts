import { OnChanges, OnDestroy } from '@angular/core';
export declare class DynamicLoadComponent implements OnChanges, OnDestroy {
    private vcr;
    private cfr;
    private dynamicLoadService;
    componentData: any;
    type: string;
    private currentComponent;
    constructor(vcr: any, cfr: any, dynamicLoadService: any);
    ngOnChanges(): void;
    ngOnDestroy(): void;
}
