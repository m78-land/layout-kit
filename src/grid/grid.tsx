import React from 'react';
import {
  MediaQuery,
  mediaQueryGetter,
  MediaQueryMeta,
  MediaQueryObject,
  useMediaQuery,
  GridColProps,
  GridRowProps,
  GridColNumberOrMediaQueryProps,
  GridColMediaQueryProps,
} from '@m78/layout-kit';
import { useFn } from '@lxjx/hooks';
import { isNumber, isObject, isTruthyOrZero } from '@lxjx/utils';
import { getCurrentMqProps } from './common';

const MAX_COLUMN = 12;
const ONE_COLUMN = 100 / MAX_COLUMN;

const getStyleValue = (n?: number) => {
  if (isNumber(n)) {
    return `${n * ONE_COLUMN}%`;
  }
  return undefined;
};

function Grid(props: GridRowProps) {
  const { children } = props;
  return <div className="m78-grids">{children}</div>;
}

function GridItem(props: GridColProps) {
  const { children } = props;

  const mqMeta = useMediaQuery();

  // 一个类似此函数的帮助函数，从{xs, sm, md}这样的对象中以指定规则取值

  if (!mqMeta) return null;

  const current = getCurrentMqProps(mqMeta, props);
  const { col, offset, move, order, flex, hidden } = current;

  console.log(current, mqMeta.type);

  return (
    <div
      className="m78-grids_col"
      style={{
        width: getStyleValue(col),
        marginLeft: getStyleValue(offset),
        left: getStyleValue(move),
        order,
        flex,
        display: hidden ? 'none' : undefined,
      }}
    >
      {children}
    </div>
  );
}

// TODO: MediaQuery支持接收 xs={xx} sm={xx} 配置，并根据生效情况在meta中返回
/* 当前区间没有指定栅格大小时，会取此位置前第一个生效的栅格大小 */
/*
 * 因为支持小数点，所以可以只需要12列栅格即可完成非常精细的布局
 * */

Grid.Item = GridItem;

export { Grid, GridItem };
