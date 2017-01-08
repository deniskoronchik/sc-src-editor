import React, { PropTypes } from 'react'

import {callIfExists} from '../../js/helpers';
import Input from '../../js/input';

class ContextMenuItem extends React.Component {

  constructor(props) {
    super(props);
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();

    switch (e.button) {
      case Input.MouseLeftButton:
        callIfExists(this.props.callback);
      break;
    }
  }

  render () {
    if (this.props.name === '---') {
      return (<hr/>);
    } else {
      return (
        <a className="item noselect" onClick={this.onClick.bind(this)}>
          <i className={this.props.icon + " icon"}></i>
          {this.props.name}
        </a>
      );
    }
  }
}

ContextMenuItem.propTypes = {
  name : React.PropTypes.string.isRequired,
  callback : React.PropTypes.func.isRequired,
  icon : React.PropTypes.string
};

ContextMenuItem.defaultProps = {
  name: "",
  callback: null,
  icon: ""
};

export default ContextMenuItem
