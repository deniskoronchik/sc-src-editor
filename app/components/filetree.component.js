// ES6 Component
// Import React
import React  from 'react';
import FileTreeItem from './filetree/ft_item.component';

// FileTree component created as a class
class FileTree extends React.Component {

  constructor(props) {
    super(props);
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

  render() {
    var self = this;
    function renderItemRecursively(item) {
      if (!item)
        return null;

      return (
        <FileTreeItem
          item={item}
          key={item.fullpath}
          onDoubleClickFile={self._handleRequestOpenFile.bind(self)}
          />
        );
    }

    const items = renderItemRecursively(this.props.files);
    return (
            <div id="editor-ft" className="left-pane">
              <div className="editor-ft-projpath">{this.props.project_path}</div>
              <div className="editor-ft-projtree ui list">{items}</div>
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
