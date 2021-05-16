import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridItem, MediaQuery, MediaQueryContext, useMediaQuery } from '../index';

import './style.css';

const Play = () => {
  return (
    <div>
      <Grid>
        <GridItem xs={2}>1</GridItem>
        <GridItem xs={2}>2</GridItem>
        <GridItem xs={4}>3</GridItem>
        <GridItem xs={4}>4</GridItem>
        <GridItem xs={4} md={12} xxl={24}>
          5
        </GridItem>
      </Grid>
    </div>
  );
};

ReactDOM.render(<Play />, document.getElementById('root'));
