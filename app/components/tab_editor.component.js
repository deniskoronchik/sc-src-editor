// ES6 Component
// Import React
import React  from 'react';
import TabEditorItemTab from './tab_editor/te_item_tab.component';
import TabEditorItemContent from './tab_editor/te_item_content.component';

// FileTree component created as a class
class TabEditor extends React.Component {

  propTypes: {
    active: React.PropTypes.string.isRequired;
    tabs: React.PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      tabs: props.tabs,
      active: props.active
    }
  }

  onTabClick(key, e) {
    e.preventDefault();
    this.setState(prevState => ({
      active: key
    }));
  }

  onAddTab(file_item) {

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.active != this.state.active) {
      return true;
    }

    return false;
  }

  _renderTabs() {

    return this.state.tabs.map((file_info, index) => {
      const is_active = (file_info.fullpath === this.state.active);
      const key = file_info.fullpath + "_tab";

      return (
        <TabEditorItemTab
          key={key}
          file_info={file_info}
          active={is_active}
          onClick={this.onTabClick.bind(this, file_info.fullpath)}
        />);
    });
  }

  _renderContents() {
    return this.state.tabs.map((file_info, index) => {
      const is_active = (file_info.fullpath === this.state.active);
      return (
        <TabEditorItemContent
          key={file_info.fullpath + "_content"}
          file_info={file_info}
          active={is_active}
        />);
    });
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div key="tab-editor-main" id='tab-editor'>
        <div key="tab-editor-main-bar" className="ui top attached tabular menu">
        {this._renderTabs()}
        </div>
        {this._renderContents()}
      </div>
        );
  }
}

// Export for re-use
export default TabEditor
