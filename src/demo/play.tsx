import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridItem, MediaQuery, MediaQueryContext, useMediaQuery } from '../index';

import './style.css';

const Play = () => {
  return (
    <div>
      <Grid>
        {/*<GridItem xs={2}>1</GridItem>*/}
        {/*<GridItem xs={2}>2</GridItem>*/}
        {/*<GridItem xs={4}>3</GridItem>*/}
        {/*<GridItem xs={4}>4</GridItem>*/}
        <GridItem xs={4}>1</GridItem>
        <GridItem md={{ hidden: true }}>2</GridItem>
        <div className="m78-divider"></div>
        <GridItem col={2}>3</GridItem>
      </Grid>
    </div>
  );
};

ReactDOM.render(<Play />, document.getElementById('root'));
