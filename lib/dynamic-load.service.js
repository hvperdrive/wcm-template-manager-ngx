"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DynamicLoadService = (function () {
    function DynamicLoadService(components) {
        this.components = components;
    }
    DynamicLoadService.prototype.getViewComponents = function () {
        return this.components.filter(function (comp) {
            return comp && comp.selectComponent && comp.selectComponent.type === 'view' ? true : false;
        });
    };
    DynamicLoadService.prototype.getPartialComponents = function () {
        return this.components.filter(function (comp) {
            return comp && comp.selectComponent && comp.selectComponent.type === 'partial' ? true : false;
        });
    };
    DynamicLoadService.prototype.getContentComponents = function () {
        return this.components.filter(function (comp) {
            return comp && comp.selectComponent && comp.selectComponent.type === 'content' ? true : false;
        });
    };
    DynamicLoadService.prototype.selectComponent = function (type, data) {
        var availableComponents = [];
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
    };
    DynamicLoadService.prototype._findComponent = function (availableComponents, data, checks) {
        return availableComponents.find(function (comp) { return !!checks.find(function (check) {
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
        }); });
    };
    return DynamicLoadService;
}());
exports.DynamicLoadService = DynamicLoadService;
//# sourceMappingURL=dynamic-load.service.js.map