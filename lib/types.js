"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIEventType = exports.Platforms = exports.PluginType = void 0;
;
;
;
;
;
;
/** 插件类型 */
var PluginType;
(function (PluginType) {
    PluginType["Module"] = "rn_module";
    PluginType["UIComponent"] = "rn_ui_component";
    PluginType["NULL"] = "null";
})(PluginType || (exports.PluginType = PluginType = {}));
;
/** 适用平台 */
var Platforms;
(function (Platforms) {
    Platforms["iOS"] = "ios";
    Platforms["Android"] = "android";
    Platforms["All"] = "all";
})(Platforms || (exports.Platforms = Platforms = {}));
;
/** UI事件类型 */
var UIEventType;
(function (UIEventType) {
    UIEventType["Bubbling"] = "bubbling";
    UIEventType["Direct"] = "direct"; // 直接事件，仅当前视图可处理
})(UIEventType || (exports.UIEventType = UIEventType = {}));
