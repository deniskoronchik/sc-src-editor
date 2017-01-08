// ES6 Component
// Import React
import React  from 'react';

class TabEditorItemTab extends React.Component {

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
    const active_class = this.props.active ? "active item" : "item";

    return (
      <div className={active_class} onClick={this.props.onClick}>{this.props.file_info.name}</div>
    );
  }
}

// Export for re-use
export default TabEditorItemTab
