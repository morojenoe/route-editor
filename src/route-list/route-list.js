import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DraggableList from 'react-draggable-list';
import RouteListPoint from './route-list-point';

class RouteList extends Component {
  constructor() {
    super();
    this.onRemoveItem = this.onRemoveItem.bind(this);
  }

  onListChange(newPoints) {
    this.props.onListChange(newPoints);
  }

  onRemoveItem(pointName) {
    this.props.onRemoveItem(pointName);
  }

  render() {
    const { routePoints } = this.props;
    return (
      <DraggableList
        itemKey="name"
        template={RouteListPoint}
        list={routePoints}
        onMoveEnd={newPoints => this.onListChange(newPoints)}
        commonProps={{
          onDelete: (pointName) => this.onRemoveItem(pointName)
        }}
      />
    );
  }
}

RouteList.propTypes = {
  routePoints: PropTypes.array.isRequired,
  onListChange: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired
};

export default RouteList;
