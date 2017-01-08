// ES6 Component
// Import React
import React  from 'react';

// FileTreeItem component created as a class
class FileTreeItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      item: props.item,
      collapsed: true
    };
  }

  onContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    this._handleRequestContextMenu([e.pageX, e.pageY]);
  }

  onDoubleClick(e) {
    e.preventDefault();
    if (this.state.item.is_dir) {
      this.setState(prevState => ({
        collapsed: !prevState.collapsed
      }));
    } else {
      if (this.props.onDoubleClickFile) {
        this.props.onDoubleClickFile(this.props.item);
      }
    }
  }

  _handleRequestContextMenu(pos) {
    if (this.props.onRequestContextMenu) {
      this.props.onRequestContextMenu(this.props.item, pos);
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  // render method is most important
  // render method returns JSX template
  render() {
    const has_subfiles = this.state.item.files && this.state.item.files.length > 0;
    const is_collapsed = this.state.collapsed;

    var subitems = null;
    if (has_subfiles && !is_collapsed) {
      subitems = this.state.item.files.map((sub_item, index) => {
        return (
          <FileTreeItem
            item                  = {sub_item}
            key                   = {sub_item.fullpath}
            onDoubleClickFile     = {this.props.onDoubleClickFile}
            onRequestContextMenu  = {this.props.onRequestContextMenu}
            />
          );
      });
    }

    return (
      <div className="item noselect">
        {has_subfiles && <i className={is_collapsed ? "caret right icon" : "caret down icon"}></i>}
        <i className={this.state.item.is_dir ? "folder icon" : "file icon"}></i>
        <div className="content">
          <div className="header"
               onDoubleClick = {this.onDoubleClick.bind(this)}
               onContextMenu  = {this.onContextMenu.bind(this)}>
            {this.state.item.name}
          </div>
        {
          (subitems) &&
          <div key={this.state.item.fullpath} className="list">{subitems}</div>
        }
        </div>
      </div>
      );
  }
}

FileTreeItem.propTypes = {
  onDoubleClickFile: React.PropTypes.func,
  /* Receive parameters:
   * - item - file item to show menu
   * - pos - position to show menu ([x, y])
   */
  onRequestContextMenu: React.PropTypes.func
};

FileTreeItem.defaultProps = {
  onDoubleClickFile: null,
  onRequestContextMenu: null
}

// Export for re-use
export default FileTreeItem
