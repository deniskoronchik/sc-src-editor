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

  // render method is most important
  // render method returns JSX template
  render() {
    function renderItemRecursively(item) {
      if (!item)
        return null;

      if (item.is_dir) {
        const subitems = item.files.map((sub_item, index) => {
          return renderItemRecursively(sub_item);
        });

        return (
          <FileTreeItem
            item={item}
            subitems={subitems}
            key={item.fullpath}
            />
          );
      }

      return (
        <FileTreeItem
          item={item}
          subitems={null}
          key={item.fullpath}
          />
        );
    }

    const items = renderItemRecursively(this.state.files);
    return (
            <div id="editor-ft" className="left-pane">
              <div className="editor-ft-projpath">{this.props.project_path}</div>
              <ul className="editor-ft-projtree ui list">{items}</ul>
            </div>
        );
  }
}

// Export for re-use
export default FileTree
