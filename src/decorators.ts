import 'reflect-metadata';
import * as t from './types';

/** 装饰器类型枚举 */
export enum DecoratorKeys {
    plugin = 'plugin',
    method = 'method',
    event = 'event',
    uiEvent = 'uievent',
    property = 'property',
}

/** 装饰器可选项， */
export type DecoratorMetaOptions = {
    available?: string,
    platform?: t.Platforms,
    deprecated?: boolean
}

/** 装饰器元数据 */
export interface DecoratorMeta {
    available: string,
    platform: t.Platforms,
    deprecated: boolean
}

export interface PluginMeta {
    name: string,
    version: string,
    type: t.PluginType,
    owners: string[],
    platform: t.Platforms,
    deprecated: boolean
}

export interface MethodMeta extends DecoratorMeta { }

export interface EventMeta extends DecoratorMeta { }

export interface PropertyMeta extends DecoratorMeta { }

export interface UIEventMeta extends DecoratorMeta {
    type: t.UIEventType
}

/**
 * 插件装饰器
 * @param name RN 插件名，必填
 * @param version RN 插件版本号（版本号最多支持4位），必填
 * @param type 插件类型，必填
 * @param owners 负责人，必填
 * @param options 装饰器元数据可选项，非必填
 */
export function Plugin(name: string, version: string, type: t.PluginType, owners: string[], options: DecoratorMetaOptions = {}) {
    return (target: any) => {
        const { platform = t.Platforms.All, deprecated = false } = options;
        const data: PluginMeta = { name, version, owners, type, platform, deprecated };
        Reflect.defineMetadata(DecoratorKeys.plugin, data, target);
    }
}

/**
 * 属性装饰器，RN 自定义UI组件时需要使用，RN 自定义模块不支持添加属性
 * iOS: RCT_CUSTOM_VIEW_PROPERTY
 * android：ReactProp 注解
 * @param options 选项
 */
export function Property(options: DecoratorMetaOptions = {}) {
    return (target: any, key: string) => {
        const { available = '', platform = t.Platforms.All, deprecated = false } = options;
        const data: PropertyMeta = { available, platform, deprecated };
        Reflect.defineMetadata(DecoratorKeys.property, data, target, key);
    }
}

/**
 * UI 事件装饰器，RN 自定义UI组件时需要使用，方法名需要以 on 开头
 * iOS：RCTDirectEventBlock or RCTBubblingEventBlock
 * android：
 * @param type 事件类型
 * @param options 选项
 */
export function UIEvent(type: t.UIEventType = t.UIEventType.Direct, options: DecoratorMetaOptions = {}) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const { available = '', platform = t.Platforms.All, deprecated = false } = options;
        const data: UIEventMeta = { available, platform, deprecated, type };
        Reflect.defineMetadata(DecoratorKeys.uiEvent, data, target, propertyKey);
    }
}

/**
 * 桥接方法装饰器
 * iOS：RCT_EXPORT_METHOD、RCT_REMAP_METHOD ...
 * android：ReactMethod 注解
 * @param options 选项
 */
export function Method(options: DecoratorMetaOptions = {}) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const { available = '', platform = t.Platforms.All, deprecated = false } = options;
        const data: MethodMeta = { available, platform, deprecated };
        Reflect.defineMetadata(DecoratorKeys.method, data, target, propertyKey);
    }
}

/**
 * 事件装饰器，原生模块直接向 js 端发送事件
 * iOS: RCTEventEmitter
 * android：RCTDeviceEventEmitter
 * @param options 选项
 */
export function Event(options: DecoratorMetaOptions = {}) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const { available = '', platform = t.Platforms.All, deprecated = false } = options;
        const data: EventMeta = { available, platform, deprecated };
        Reflect.defineMetadata(DecoratorKeys.event, data, target, propertyKey);
    }
}
