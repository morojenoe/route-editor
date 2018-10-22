import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, withStyles } from '@material-ui/core';

const styles = {
  routeItem: {
    padding: 10
  }
};

class RouteListPoint extends Component {
  onDelete(pointName) {
    this.props.commonProps.onDelete(pointName);
  }

  render() {
    const { item, dragHandle, classes } = this.props;
    return dragHandle(
      <Paper>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            {
              (
                <pre className={classes.routeItem}>{item.name}</pre>
              )
            }
          </Grid>
          <Grid item>
            <IconButton aria-label="Delete" onClick={() => this.onDelete(item.name)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(RouteListPoint);
