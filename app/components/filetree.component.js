// ES6 Component
// Import React
import React  from 'react';
import FileTreeItem from './filetree/ft_item.component';
import ContextMenu from './context_menu.component';
import {orderCompare} from '../js/helpers';

// FileTree component created as a class
class FileTree extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      context_menu_item: null,
      context_menu_pos: null
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  _handleRequestOpenFile(file_path) {
    if (this.props.onRequestOpenFile) {
      this.props.onRequestOpenFile(file_path);
    }
  }

  _handleRequestContextMenu(file_item, pos) {
    this.setState(prevState => ({
      context_menu_item: file_item,
      context_menu_pos: pos
    }));
  }

  _onCreateFile(file_item) {
    console.log("_onCreateFile " + file_item.fullpath);
  }

  _onNewFolder(file_item) {
    console.log("_onNewFolder " + file_item.fullpath);
  }

  _onDeleteFile(file_item) {
    console.log("_onDeleteFile " + file_item.fullpath);
  }

  _onRenameFile(file_item) {
    console.log("_onRenameFile " + file_item.fullpath);
  }

  _createContextMenuItems(file_item) {
    // common
    var result = [
      {name: 'Delete', icon: 'trash', callback: this._onDeleteFile.bind(this, file_item), _order: 21},
      {name: 'Rename', icon: 'text cursor', callback: this._onRenameFile.bind(this, file_item), _order: 31}
    ];

    if (file_item.is_dir) {
      result = result.concat([
        {name: 'New file', icon: 'file', callback: this._onCreateFile.bind(this, file_item), _order: 1},
        {name: 'New folder', icon: 'folder', callback: this._onNewFolder.bind(this, file_item), _order: 11},
        {name: '---', _order: 12}
      ]);
    } else {
      result = result.concat([

      ])
    }
    result.sort(orderCompare);

    return result;
  }

  _renderContextMenu() {
    if (!this.state.context_menu_item) {
      throw "Invalid state of file tree. Trying to render context menu for a null item";
    }

    return (
      <ContextMenu
        key     = {"context_menu_file_tree"}
        items   = {this._createContextMenuItems(this.state.context_menu_item)}
        pos     = {this.state.context_menu_pos}
        visible = {this.state.context_menu_item != null}
        />
    )
  }

  render() {
    var self = this;
    function renderItemRecursively(item) {
      if (!item)
        return null;

      return (
        <FileTreeItem
          item                  = {item}
          key                   = {item.fullpath}
          onDoubleClickFile     = {self._handleRequestOpenFile.bind(self)}
          onRequestContextMenu  = {self._handleRequestContextMenu.bind(self)}
          />
        );
    }

    const items = renderItemRecursively(this.props.files);
    return (
            <div id="editor-ft" className="left-pane">
              <div className="editor-ft-projpath">{this.props.project_path}</div>
              <div className="editor-ft-projtree ui list">{items}</div>
                {this.state.context_menu_item &&
                  this._renderContextMenu()
                }
            </div>
        );
  }
}

FileTree.propTypes = {
  onRequestOpenFile: React.PropTypes.func
};

FileTree.defaultProps = {
  onRequestOpenFile: null
}

// Export for re-use
export default FileTree
