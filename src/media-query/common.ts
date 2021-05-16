import {
  _MediaQueryTypeContext,
  _Size,
  MediaQueryMeta,
  MediaQueryTypeKeys,
  MediaQueryTypeValues,
} from '../types';
import { isArray } from '@lxjx/utils';

/**
 * 根据尺寸检测是何种类型
 * */
export function calcType(size: number) {
  if (size >= MediaQueryTypeValues.XXL) {
    return MediaQueryTypeKeys.XXL;
  }

  if (size >= MediaQueryTypeValues.XL && size < MediaQueryTypeValues.XXL) {
    return MediaQueryTypeKeys.XL;
  }

  if (size >= MediaQueryTypeValues.LG && size < MediaQueryTypeValues.XL) {
    return MediaQueryTypeKeys.LG;
  }

  if (size >= MediaQueryTypeValues.MD && size < MediaQueryTypeValues.LG) {
    return MediaQueryTypeKeys.MD;
  }

  if (size >= MediaQueryTypeValues.SM && size < MediaQueryTypeValues.MD) {
    return MediaQueryTypeKeys.SM;
  }

  return MediaQueryTypeKeys.XS;
}

/**
 * 抽取onChange公共逻辑
 * 如果传入了skipEmit，会跳过通知Listeners并改为返回meta对象
 * */
export function onChangeHandle(
  { width, height }: _Size,
  ctx: _MediaQueryTypeContext,
  skipEmit?: boolean,
) {
  const type = calcType(width);

  const changeListeners = ctx.changeListeners;

  const size = {
    width,
    height,
  };

  const is = {
    isXS: () => type === MediaQueryTypeKeys.XS,
    isSM: () => type === MediaQueryTypeKeys.SM,
    isMD: () => type === MediaQueryTypeKeys.MD,
    isLG: () => type === MediaQueryTypeKeys.LG,
    isXL: () => type === MediaQueryTypeKeys.XL,
    isXXL: () => type === MediaQueryTypeKeys.XXL,
    isSmall: () => is.isXS() || is.isSM(),
    isMedium: () => is.isMD() || is.isLG(),
    isLarge: () => !is.isSmall() && !is.isMedium(),
  };

  const full: MediaQueryMeta = { ...size, type, ...is };
  ctx.meta = full;

  if (skipEmit) {
    return ctx.meta;
  }
  if (isArray(changeListeners)) {
    changeListeners.forEach(fn => fn(full));
  }
}
