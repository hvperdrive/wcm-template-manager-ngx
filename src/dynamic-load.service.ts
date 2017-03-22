export class DynamicLoadService {
    constructor(private components) {}

    public getViewComponents() {
        return this.components.filter((comp) => {
            return comp.selectComponent.type === 'view' ? true : false ;
        });
    }

    public getPartialComponents() {
        return this.components.filter((comp) => {
            return comp.selectComponent.type === 'partial' ? true : false ;
        });
    }

    public getContentComponents() {
        return this.components.filter((comp) => {
            return comp.selectComponent.type === 'content' ? true : false ;
        });
    }
}
