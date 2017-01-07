// ES6 Component
// Import React
import React  from 'react';
import FileTreeItem from './filetree/ft_item.component';

const FileProvider = require('../js/filesprovider.js');

// FileTree component created as a class
class FileTree extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      files: null
    }
  }

  componentDidMount() {
    this.setState({
      files: FileProvider.list(this.props.project_path)
    });
  }

  componentWillUnmount() {
  }

  render() {
    function renderItemRecursively(item) {
      if (!item)
        return null;

      return (
        <FileTreeItem
          item={item}
          key={item.fullpath}
          />
        );
    }

    const items = renderItemRecursively(this.state.files);
    return (
            <div id="editor-ft" className="left-pane">
              <div className="editor-ft-projpath">{this.props.project_path}</div>
              <div className="editor-ft-projtree ui list">{items}</div>
            </div>
        );
  }
}

// Export for re-use
export default FileTree
