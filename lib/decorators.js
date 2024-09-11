"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoratorKeys = void 0;
exports.Plugin = Plugin;
exports.Property = Property;
exports.UIEvent = UIEvent;
exports.Method = Method;
exports.Event = Event;
require("reflect-metadata");
const t = __importStar(require("./types"));
/** 装饰器类型枚举 */
var DecoratorKeys;
(function (DecoratorKeys) {
    DecoratorKeys["plugin"] = "plugin";
    DecoratorKeys["method"] = "method";
    DecoratorKeys["event"] = "event";
    DecoratorKeys["uiEvent"] = "uievent";
    DecoratorKeys["property"] = "property";
})(DecoratorKeys || (exports.DecoratorKeys = DecoratorKeys = {}));
/**
 * 插件装饰器
 * @param name RN 插件名，必填
 * @param version RN 插件版本号（版本号最多支持4位），必填
 * @param type 插件类型，必填
 * @param owners 负责人，必填
 * @param options 装饰器元数据可选项，非必填
 */
function Plugin(name, version, type, owners, options = {}) {
    return (target) => {
        const { platform = t.Platforms.All, deprecated = false } = options;
        const data = { name, version, owners, type, platform, deprecated };
        Reflect.defineMetadata(DecoratorKeys.plugin, data, target);
    };
}
/**
 * 属性装饰器，RN 自定义UI组件时需要使用，RN 自定义模块不支持添加属性
 * iOS: RCT_CUSTOM_VIEW_PROPERTY
 * android：ReactProp 注解
 * @param options 选项
 */
function Property(options = {}) {
    return (target, key) => {
        const { available = '', platform = t.Platforms.All, deprecated = false } = options;
        const data = { available, platform, deprecated };
        Reflect.defineMetadata(DecoratorKeys.property, data, target, key);
    };
}
/**
 * UI 事件装饰器，RN 自定义UI组件时需要使用，方法名需要以 on 开头
 * iOS：RCTDirectEventBlock or RCTBubblingEventBlock
 * android：
 * @param type 事件类型
 * @param options 选项
 */
function UIEvent(type = t.UIEventType.Direct, options = {}) {
    return (target, propertyKey, descriptor) => {
        const { available = '', platform = t.Platforms.All, deprecated = false } = options;
        const data = { available, platform, deprecated, type };
        Reflect.defineMetadata(DecoratorKeys.uiEvent, data, target, propertyKey);
    };
}
/**
 * 桥接方法装饰器
 * iOS：RCT_EXPORT_METHOD、RCT_REMAP_METHOD ...
 * android：ReactMethod 注解
 * @param options 选项
 */
function Method(options = {}) {
    return (target, propertyKey, descriptor) => {
        const { available = '', platform = t.Platforms.All, deprecated = false } = options;
        const data = { available, platform, deprecated };
        Reflect.defineMetadata(DecoratorKeys.method, data, target, propertyKey);
    };
}
/**
 * 事件装饰器，原生模块直接向 js 端发送事件
 * iOS: RCTEventEmitter
 * android：RCTDeviceEventEmitter
 * @param options 选项
 */
function Event(options = {}) {
    return (target, propertyKey, descriptor) => {
        const { available = '', platform = t.Platforms.All, deprecated = false } = options;
        const data = { available, platform, deprecated };
        Reflect.defineMetadata(DecoratorKeys.event, data, target, propertyKey);
    };
}
