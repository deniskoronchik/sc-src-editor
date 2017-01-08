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

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    if (this.state.item.is_dir) {
      this.setState(prevState => ({
        collapsed: !prevState.collapsed
      }));
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
            item={sub_item}
            key={sub_item.fullpath}
            />
          );
      });
    }

    return (
      <div className="item noselect">
        {has_subfiles && <i className={is_collapsed ? "plus square outline icon" : "minus square outline icon"}></i>}
        <i className={this.state.item.is_dir ? "folder icon" : "file icon"}></i>
        <div className="content">
          <div className="header" onClick={this.onClick}>{this.state.item.name}</div>
        {
          (subitems) &&
          <div key={this.state.item.fullpath} className="list">{subitems}</div>
        }
        </div>
      </div>
      );
  }
}

// Export for re-use
export default FileTreeItem
