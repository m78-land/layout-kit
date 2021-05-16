import React from 'react';
import { MediaQuery, MediaQueryMeta, useMediaQuery } from '@m78/layout-kit';
import { GridColProps, GridRowProps } from '../types';

const MAX_COLUMN = 24;
const ONE_COLUMN = 100 / MAX_COLUMN;

function Grid(props: GridRowProps) {
  const { children } = props;
  return <div className="m78-grids">{children}</div>;
}

function GridItem(props: GridColProps) {
  const { col = 0, xs, sm, md, lg, xl, xxl, children } = props;

  function getFirst(cols: (number | undefined)[]) {
    return cols.find(item => !!item) || 0;
  }

  // 一个类似此函数的帮助函数，从{xs, sm, md}这样的对象中以指定规则取值
  // MediaQuery支持接收 xs={xx} sm={xx} 配置，并根据生效情况在meta中返回
  function getColumn(meta: MediaQueryMeta) {
    let colNum = col;
    /** 取值顺序 */
    const cols = [xxl, xl, lg, md, sm, xs, col];

    if (meta.isXXL()) {
      colNum = getFirst(cols);
    }

    if (meta.isXL()) {
      colNum = getFirst(cols.slice(1));
    }

    if (meta.isLG()) {
      colNum = getFirst(cols.slice(2));
    }

    if (meta.isMD()) {
      colNum = getFirst(cols.slice(3));
    }

    if (meta.isSM()) {
      colNum = getFirst(cols.slice(4));
    }

    if (meta.isXS()) {
      colNum = getFirst(cols.slice(5));
    }

    return colNum;
  }

  function getHidden() {
    // if (col === 0) return 'none';
  }

  return (
    <MediaQuery>
      {meta => (
        <div className="m78-grids_col" style={{ width: `${getColumn(meta) * ONE_COLUMN}%` }}>
          {children}
        </div>
      )}
    </MediaQuery>
  );
}

/* 当前区间没有指定栅格大小时，会取此位置前第一个生效的栅格大小 */
/*
 * 因为支持小数点，所以可以只需要12列栅格即可完成非常精细的布局
 * */

Grid.Item = GridItem;

export { Grid, GridItem };
