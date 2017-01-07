// ES6 Component
// Import React
import React  from 'react';

// FileTreeItem component created as a class
class FileTreeItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      item: props.item,
      subitems: props.subitems,
      is_collapsed: true
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  // render method is most important
  // render method returns JSX template
  render() {
    const has_subfiles = this.state.item.files && this.state.item.files.length > 0;
    return (
      <div className="item noselect">
        {has_subfiles && <i className="dropdown icon"></i>}
        <i className={this.state.item.is_dir ? "folder icon" : "file icon"}></i>
        <div className="content">
          <div className="header">{this.state.item.name}</div>
        {
          (has_subfiles) &&
          <div key={this.state.item.fullpath} className="list">{this.state.subitems}</div>
        }
        </div>
      </div>
      );
  }
}

// Export for re-use
export default FileTreeItem
