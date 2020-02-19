export declare class DynamicLoadService {
    private components;
    constructor(components: any);
    getViewComponents(): any;
    getPartialComponents(): any;
    getContentComponents(): any;
    selectComponent(type: string, data: any): boolean;
    private _findComponent;
}
