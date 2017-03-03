"use strict";
var DynamicLoadService = (function () {
    function DynamicLoadService(components) {
        this.components = components;
    }
    DynamicLoadService.prototype.getComponents = function () {
        return this.components;
    };
    return DynamicLoadService;
}());
exports.DynamicLoadService = DynamicLoadService;
//# sourceMappingURL=dynamic-load.service.js.map