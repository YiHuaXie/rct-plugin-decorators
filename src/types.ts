export interface Double {}
export interface Float {}
export interface Integer {}
export interface PromiseCb {}
export interface SuccessCb {}
export interface FailureCb {}

/** 插件类型 */
export enum PluginType {
    Module = 'rn_module', // RN 原生模块
    UIComponent = 'rn_ui_component', // RN 原生UI组件
    NULL = 'null', // 用来占位，没有意义
}

/** 适用平台 */
export enum Platforms {
    iOS = 'ios',
    Android = 'android',
    All = 'all'
}

/** UI事件类型 */
export enum UIEventType {
    Bubbling = 'bubbling', // 冒泡事件，根据组件层级向上传递
    Direct = 'direct' // 直接事件，仅当前视图可处理
}


