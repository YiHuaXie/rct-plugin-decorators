import 'reflect-metadata';
import * as t from './types';
/** 装饰器类型枚举 */
export declare enum DecoratorKeys {
    plugin = "plugin",
    method = "method",
    event = "event",
    uiEvent = "uievent",
    property = "property"
}
/** 装饰器可选项， */
export type DecoratorMetaOptions = {
    available?: string;
    platform?: t.Platforms;
    deprecated?: boolean;
};
/** 装饰器元数据 */
export interface DecoratorMeta {
    available: string;
    platform: t.Platforms;
    deprecated: boolean;
}
export interface PluginMeta {
    name: string;
    version: string;
    type: t.PluginType;
    owners: string[];
    platform: t.Platforms;
    deprecated: boolean;
}
export interface MethodMeta extends DecoratorMeta {
}
export interface EventMeta extends DecoratorMeta {
}
export interface PropertyMeta extends DecoratorMeta {
}
export interface UIEventMeta extends DecoratorMeta {
    type: t.UIEventType;
}
/**
 * 插件装饰器
 * @param name RN 插件名，必填
 * @param version RN 插件版本号（版本号最多支持4位），必填
 * @param type 插件类型，必填
 * @param owners 负责人，必填
 * @param options 装饰器元数据可选项，非必填
 */
export declare function Plugin(name: string, version: string, type: t.PluginType, owners: string[], options?: DecoratorMetaOptions): (target: any) => void;
/**
 * 属性装饰器，RN 自定义UI组件时需要使用，RN 自定义模块不支持添加属性
 * iOS: RCT_CUSTOM_VIEW_PROPERTY
 * android：ReactProp 注解
 * @param options 选项
 */
export declare function Property(options?: DecoratorMetaOptions): (target: any, key: string) => void;
/**
 * UI 事件装饰器，RN 自定义UI组件时需要使用，方法名需要以 on 开头
 * iOS：RCTDirectEventBlock or RCTBubblingEventBlock
 * android：
 * @param type 事件类型
 * @param options 选项
 */
export declare function UIEvent(type?: t.UIEventType, options?: DecoratorMetaOptions): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * 桥接方法装饰器
 * iOS：RCT_EXPORT_METHOD、RCT_REMAP_METHOD ...
 * android：ReactMethod 注解
 * @param options 选项
 */
export declare function Method(options?: DecoratorMetaOptions): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * 事件装饰器，原生模块直接向 js 端发送事件
 * iOS: RCTEventEmitter
 * android：RCTDeviceEventEmitter
 * @param options 选项
 */
export declare function Event(options?: DecoratorMetaOptions): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
