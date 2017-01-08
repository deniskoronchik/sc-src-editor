// ES6 Component
// Import React
import React  from 'react';

import FileEditor from '../file_editor.component';

// TabEditorItemContent component created as a class
class TabEditorItemContent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  // render method is most important
  // render method returns JSX template
  render() {
    const active_class = this.props.active ? "active" : "";
    return (
      <div className={active_class + " ui bottom attached tab segment"}>
        <FileEditor
          fullpath = {this.props.file_info.fullpath}
          active = {this.props.active}
        />
      </div>
    );
  }
}

// Export for re-use
export default TabEditorItemContent
