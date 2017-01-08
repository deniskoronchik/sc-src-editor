// ES6 Component
// Import React
import React  from 'react';
import '../../../node_modules/codemirror/lib/codemirror.css';
import '../../../node_modules/codemirror/addon/hint/show-hint.css';
import '../../../node_modules/scs-editor/scs.css';

const SCsEditorImpl = require('scs-editor');
const FileSystem = require('fs');

class SCsEditor extends React.Component {

  propTypes: {
    fullpath: React.PropTypes.string.isRequired;
    active: React.PropTypes.boolean.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      content: props.content
    };
    this.editor = null;
  }

  componentDidMount() {
    const content = FileSystem.readFileSync(this.props.fullpath).toString();

    this.editor = new SCsEditorImpl.ScsEditor({
      container: document.getElementById(this.getContainerID()),
      value: content
    });
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.content != this.state.content) {
      this.state.setContent(this.state.content);
    }

    if (prevProps.active != this.props.active) {
      this.editor.refresh();
    }
  }

  getContainerID() {
    return this.props.fullpath;
  }

  render() {
    return (
      <div id={this.getContainerID()}></div>
    );
  }
}

// Export for re-use
export default SCsEditor
