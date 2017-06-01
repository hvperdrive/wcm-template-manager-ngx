export class DynamicLoadService {
    constructor(private components) {}

    public getViewComponents() {
        return this.components.filter((comp) => {
            return comp && comp.selectComponent && comp.selectComponent.type === 'view' ? true : false ;
        });
    }

    public getPartialComponents() {
        return this.components.filter((comp) => {
            return comp && comp.selectComponent && comp.selectComponent.type === 'partial' ? true : false ;
        });
    }

    public getContentComponents() {
        return this.components.filter((comp) => {
            return comp && comp.selectComponent && comp.selectComponent.type === 'content' ? true : false ;
        });
    }

    public selectComponent(type: string, data: any): boolean {
        let availableComponents = [];

        switch (type) {
            case 'view':
                // The first one is if we have data for a 'view'
                availableComponents = this.getViewComponents();
                return this._findComponent(availableComponents, data, ['viewReference', 'viewType', 'contentType', 'fallback']);
            case 'partial':
                // The second one is if we have data for 'partial'
                availableComponents = this.getPartialComponents();
                return this._findComponent(availableComponents, data, ['safeLabel', 'meta.contentType', 'fallback']);
            case 'content':
                // The third one is if we have data for 'content'
                availableComponents = this.getContentComponents();
                return this._findComponent(availableComponents, data, ['slug', 'safeLabel', 'meta.contentType', 'fallback']);
            default:
                 console.log('Please provide the type attribute to let the module know to load a view, partial or content');
                return false;
        }
    }

    private _findComponent(availableComponents, data, checks): boolean {
       return availableComponents.find(comp => !!checks.find(check => {
            if (!comp.selectComponent) {
                return false;
            }

            switch (check) {
                case 'viewReference':
                    return data && comp.selectComponent.viewReference === data.viewReference;
                case 'viewType':
                    return data && comp.selectComponent.viewType === data.viewType;
                case 'contentType':
                    return data && comp.selectComponent.contentType === data.contentType;
                case 'meta.contentType':
                    return data && data.meta && comp.selectComponent.contentType === data.meta.contentType;
                case 'safeLabel':
                    return data && data.meta && comp.selectComponent.safeLabel === data.meta.safeLabel;
                case 'fallback':
                default:
                    return !!comp.selectComponent.fallback;
            }
        }));
    }
}
