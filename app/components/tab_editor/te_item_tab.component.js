// ES6 Component
// Import React
import React  from 'react';

const Input = require('../../js/input');

class TabEditorItemTab extends React.Component {

  constructor(props) {
    super(props);
  }

  _handleRequestClose() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  }

  _handleRequestActive() {
    if (this.props.onRequestActive)
      this.props.onRequestActive();
  }

  onClickTab(e) {
    e.preventDefault();
    e.stopPropagation();

    switch (e.button) {
      case Input.Mouse.LeftButton:
        this._handleRequestActive();
      break;

      case Input.Mouse.MiddleButton:
        this._handleRequestClose();
      break;
    }
  }

  onClickCloseIcon(e) {
    e.preventDefault();
    e.stopPropagation();

    switch (e.button) {
      case Input.Mouse.LeftButton:
      case Input.Mouse.MiddleButton:
        this._handleRequestClose();
      break;
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const active_class = this.props.active ? "active item" : "item";

    return (
      <div className={active_class} onClick={this.onClickTab.bind(this)}>
      {this.props.file_info.name}
      <i className="close icon" onClick={this.onClickCloseIcon.bind(this)}></i>
      </div>
    );
  }
}

TabEditorItemTab.propTypes = {
  onRequestActive: React.PropTypes.func,
  onRequestClose: React.PropTypes.func
};

TabEditorItemTab.defaultProps = {
  onRequestActive: null,
  onRequestClose: null
}

// Export for re-use
export default TabEditorItemTab
