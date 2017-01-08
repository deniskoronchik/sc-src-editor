// ES6 Component
// Import React
import React  from 'react';

import ContextMenuItem from './menu/ctx_menu_item.component';

/* Class implements ContextMenu logic with custom actions.
 * You can construct item, by passing items property:
 * items: [
    {
      name: "New file",
      icon: "file", // look there http://semantic-ui.com/elements/icon.html#computer-and-file-system
      callback: function() {}
    },
    {
      name: "---" // separator
    }
    ...
   ]
 */
class ContextMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible
    }
    this.handlers_registered = false;

    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._handleHide = this._handleHide.bind(this);
  }

  registerHandlers() {
    if (!this.handlers_registered) {
      document.addEventListener('mousedown', this._handleOutsideClick);
      document.addEventListener('ontouchstart', this._handleOutsideClick);
      document.addEventListener('scroll', this._handleHide);
      document.addEventListener('contextmenu', this._handleHide);
      window.addEventListener('resize', this._handleHide);

      this.handlers_registered = true;
    }
  }

  unregisterHandlers() {
    if (this.handlers_registered) {
      document.removeEventListener('mousedown', this._handleOutsideClick);
      document.removeEventListener('ontouchstart', this._handleOutsideClick);
      document.removeEventListener('scroll', this._handleHide);
      document.removeEventListener('contextmenu', this._handleHide);
      window.removeEventListener('resize', this._handleHide);
      this.handlers_registered = false;
    }
  }

  _handleOutsideClick(e) {
    if (!this.menu.contains(e.target)) {
      this._handleHide();
    }
  }

  _handleHide() {
    this.unregisterHandlers();
    this.setState(prevState => ({visible: false}));
  }

  _update() {
    if (this.state.visible) {
      const req_pos = this.props.pos;
      const pos = this.getMenuPosition(req_pos[0], req_pos[1]);

      this.menu.style.left = pos[0] + 'px';
      this.menu.style.top  = pos[1] + 'px';

      this.registerHandlers();
    }
  }

  componentDidMount() {
    this._update();
  }

  componentDidUpdate() {
    this._update();
  }

  componentWillUnmount() {
    this.unregisterHandlers();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => ({
      visible: nextProps.visible
    }));
  }

  getMenuPosition(x, y) {
    const {scrollTop: scrollX, scrollLeft: scrollY} = document.documentElement;
    const { innerWidth, innerHeight } = window;
    const rect = this.menu.getBoundingClientRect();
    const menu_pos = [x + scrollX, y + scrollY];

    if (y + rect.height > innerHeight) {
      menu_pos[1] -= rect.height;
    }

    if (x + rect.width > innerWidth) {
      menu_pos[0] -= rect.width;
    }

    if (menu_pos[1] < 0) {
      menu_pos[1] = (rect.height < innerHeight) ? (innerHeight - rect.height) / 2 : 0;
    }

    if (menu_pos[0] < 0) {
      menu_pos[0] = (rect.width < innerWidth) ? (innerWidth - rect.width) / 2 : 0;
    }

    return menu_pos;
  }

  onItemClick(callback) {
    if (callback) {
      callback();
    }

    this._handleHide();
  }

  _renderItems() {


    return this.props.items.map((item) => {
      return (
        <ContextMenuItem
          key       = {item.name}
          name      = {item.name}
          icon      = {item.icon}
          callback  = {this.onItemClick.bind(this, item.callback)}
          />
      );
    });
  }

  menuRef(c) {
    this.menu = c;
  }

  render() {
    const hidden_class = this.state.visible ? "" : "hidden"
    return (
      <div ref={this.menuRef.bind(this)} className={hidden_class + " ui list context-menu"}>
        {this._renderItems()}
      </div>
    );
  }
}

ContextMenu.propTypes = {
  visible: React.PropTypes.bool,
  items: React.PropTypes.array,
  pos: React.PropTypes.array  //  [x, y]
}

ContextMenu.defaultProps = {
  visible: false,
  items: [],
  pos: [0, 0]
}

// Export for re-use
export default ContextMenu
