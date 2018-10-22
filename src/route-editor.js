import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import { YMaps } from 'react-yandex-maps';

import RouteInput from './route-input';
import RouteList from './route-list/route-list';
import RouteMap from './route-map/route-map';

class RouteEditor extends Component {
  constructor() {
    super();
    this.mapInstance = null;
    this.state = {
      routePoints: []
    };
  }

  addPoint(pointName) {
    const points = this.state.routePoints.slice();
    points.push({
      name: pointName,
      coordinates: this.mapInstance.getCenter()
    });
    this.setState({routePoints: points});
  }

  setMapInstance(mapInstance) {
    this.mapInstance = mapInstance;
  }

  onPositionChanged(pointName, newCoordinates) {
    const points = this.state.routePoints.slice();
    const id = points.findIndex(p => p.name === pointName);
    if (id !== -1) {
      points[id].coordinates = newCoordinates;
      this.setState({routePoints: points});
    }
  }

  removePoint(pointName) {
    let points = this.state.routePoints.slice();
    const id = points.findIndex(p => p.name === pointName);
    if (id !== -1) {
      points.splice(id, 1);
      this.setState({routePoints: points});
    }
  }

  setRoutePoints(newRoutePoints) {
    this.setState({routePoints: newRoutePoints});
  }

  render() {
    return (
      <YMaps>
        <Grid
          container
          spacing={24}
          justify="flex-start"
        >
          <Grid item xs={3} lg={2}>
            <Grid container direction="column" spacing={16}>
              <Grid item>
                <RouteInput
                  onEnter={name => this.addPoint(name)}
                  routePoints={this.state.routePoints}
                />
              </Grid>
              <Grid item>
                <RouteList
                  routePoints={this.state.routePoints}
                  onListChange={newList => this.setRoutePoints(newList)}
                  onRemoveItem={pointName => this.removePoint(pointName)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9} lg={10}>
            <RouteMap
              onPositionChanged={
                (pointName, newCoordinates) => this.onPositionChanged(pointName, newCoordinates)
              }
              setMapInstance={map => this.setMapInstance(map)}
              routePoints={this.state.routePoints}
            />
          </Grid>
        </Grid>
      </YMaps>
    );
  }
}

export default RouteEditor;
