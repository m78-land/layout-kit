import { ReactElement, ReactNode } from 'react';

/*
 * ########################################
 * 媒体查询
 * ########################################
 * */

export interface _Size {
  width: number;
  height: number;
}

/**
 * MediaQuery context结构
 * */
export interface _MediaQueryTypeContext {
  /** 派发通知到所有useMediaQuery.onChange方法 */
  onChange: (size: _Size) => void;
  /** useMediaQuery挂载的所有监听函数 */
  changeListeners: Array<(meta: MediaQueryMeta) => void>;
  /** 当前meta信息 */
  meta: MediaQueryMeta | null;
  /** 是否是跟节点，为true是应该监听窗口变更 */
  isRoot?: boolean;
}

/**
 * MediaQuery的所有类型
 * 判断是否在某一类型的方式为 当前宽度大于等于该类型的值且小于下一类型的值
 * */
export enum MediaQueryTypeValues {
  XS = 0,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1600,
}

/**
 * MediaQuery的所有类型
 * 判断是否在某一类型的方式为 当前宽度大于等于该类型的值且小于下一类型的值
 * */
export enum MediaQueryTypeKeys {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl',
}

/** 额外配置 */
export interface MediaQueryConf {
  /** 延迟响应变更的时间(ms) */
  debounce?: number;
  /**
   * 'type' | 监听类型
   * - 为type时，只在MediaQueryTypeKey变更时更新, 需要注意的时，此时的width和height值为更新时的快照值, 不应该依赖其进行一些计算操作
   * - 为size时，会在每一次尺寸变更时更新, size模式建议开启debounce, 防止频繁render
   * */
  listenType?: 'type' | 'size';
}

/** MediaQuery 完整元信息 */
export interface MediaQueryMeta {
  /** 当前容器宽度 */
  width: number;
  /** 当前容器高度 */
  height: number;
  /** 当前类型 */
  type: MediaQueryTypeKeys;
  /** 检测是否为指定类型 */
  isXS: () => boolean;
  isSM: () => boolean;
  isMD: () => boolean;
  isLG: () => boolean;
  isXL: () => boolean;
  isXXL: () => boolean;
  /** 当前尺寸是 xs或sm */
  isSmall: () => boolean;
  /** 当前尺寸是 md或lg */
  isMedium: () => boolean;
  /** 当前尺寸大于 lg */
  isLarge: () => boolean;
}

export interface MediaQueryProps extends MediaQueryConf {
  children: (meta: MediaQueryMeta) => ReactElement<any, any> | null;
}

export interface MediaQueryListenerProps {
  onChange: (meta: MediaQueryMeta) => void;
}

/*
 * ########################################
 * 栅格系统
 * ########################################
 * */

export interface GridRowProps {
  /** 'start' | 主轴对齐方式 */
  mainAlign?: 'center' | 'start' | 'end' | 'around' | 'between' | 'evenly';
  /** 'start' | 交叉轴对齐方式 */
  crossAlign?: 'stretch' | 'start' | 'end' | 'center';
  /** 内容，一般是一组GridCol */
  children?: ReactNode;
  /** 间隔，支持响应式设置 */
  gutter?: [number, number] | number;
  /** true | 是否允许换行 */
  wrap?: boolean;
}

export interface GridColProps {
  /** 内容 */
  children?: ReactNode;
  /** 占用栅格列数 */
  col?: number;
  /** 设置指定尺寸屏幕下的col, 会覆盖col设置 */
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  /** 左侧间隔列 */
  offset?: number;
  /** 向左移动指定列 */
  pull?: number;
  /** 向右移动指定列 */
  push?: number;
  /** 控制顺序 */
  order?: number;
  /** 手动指定该列的flex值 */
  flex?: string | number;
  /** 指定尺寸下隐藏 */
  hidden?: MediaQueryTypeKeys | MediaQueryTypeValues;
}
