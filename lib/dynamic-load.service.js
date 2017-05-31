"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DynamicLoadService = (function () {
    function DynamicLoadService(components) {
        this.components = components;
    }
    DynamicLoadService.prototype.getViewComponents = function () {
        return this.components.filter(function (comp) {
            return comp.selectComponent.type === 'view' ? true : false;
        });
    };
    DynamicLoadService.prototype.getPartialComponents = function () {
        return this.components.filter(function (comp) {
            return comp.selectComponent.type === 'partial' ? true : false;
        });
    };
    DynamicLoadService.prototype.getContentComponents = function () {
        return this.components.filter(function (comp) {
            return comp.selectComponent.type === 'content' ? true : false;
        });
    };
    return DynamicLoadService;
}());
exports.DynamicLoadService = DynamicLoadService;
//# sourceMappingURL=dynamic-load.service.js.map