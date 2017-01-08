// ES6 Component
// Import React
import React  from 'react';

import ScsEditor from './editors/scs_editor.component';

/* Class implements wrapped for a file editor.
 * It get file content and create suitable editor to edit this content
 */
class FileEditor extends React.Component {

  propTypes: {
    fullpath: React.PropTypes.string.isRequired;
    active: React.PropTypes.boolean.isRequired
  }

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
    /// TODO: implement editor selection

    return (
      <div className="editor-wrap">
        <ScsEditor
          fullpath={this.props.fullpath}
          active={this.props.active}
          />
      </div>
    );
  }
}

// Export for re-use
export default FileEditor