// taken with small edits from: https://gist.github.com/erikras/5ca8dc618bae5dbc8faf7d2324585d01
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import autobind from 'class-autobind';

export default class Wysiwyg extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      value: this.rteValue(props.value),
      typing: false,
      typingTimeOut: 0,
    };

    this.toolbarConfig = {
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
      INLINE_STYLE_BUTTONS: [
        {label: 'Bold', style: 'BOLD'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'},
      ],
      BLOCK_TYPE_DROPDOWN: [
        {label: 'Normal', style: 'unstyled'},
        {label: 'Heading Large', style: 'header-one'},
        {label: 'Heading Medium', style: 'header-two'},
        {label: 'Heading Small', style: 'header-three'},
      ],
      BLOCK_TYPE_BUTTONS: [
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'},
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined) { // eslint-disable-line
      // eslint-disable-next-line react/no-set-state
      this.setState({
        ...this.state,
        value: this.rteValue(nextProps.value),
      });
    }
  }

  rteValue(value) {
    return value === '' ? RichTextEditor.createEmptyValue() : RichTextEditor.createValueFromString(value, 'html');
  }

  handleChange(value) {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    // 0.25sec timeout for sending text value to redux state for performance
    // eslint-disable-next-line react/no-set-state
    this.setState({
      value,
      typing: false,
      typingTimeout: setTimeout(() => {
        const isEmpty = !value.getEditorState().getCurrentContent().hasText();
        const val = isEmpty ? '' : value.toString('html');
        this.props.onChange(val);
      }, 250),
    });
  }

  render() {
    const {value} = this.state;

    return (<RichTextEditor value={value} onChange={this.handleChange} toolbarConfig={this.toolbarConfig} />);
  }
}

Wysiwyg.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};
