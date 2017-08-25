import PropTypes from 'prop-types';
import React from 'react';
import Icon from './Icon';

import styles from './ExpandableSection.scss';

class ExpandableSection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: props.open
    };
  }

  toggle = () => this.setState({ open: !this.state.open });

  render() {
    const className = `${styles.expandable_section} ${this.props.className}`;

    // TODO use reactstrap <Collapse /> component below - resolve animation issue first.
    return (
      <section className={className}>
        <header onClick={this.toggle} style={{ cursor: 'pointer' }}>
          <Icon
            name='caret-right'
            rotate={this.state.open ? 90 : undefined}
            size="lg"
            fixedWidth
            style={{ transition: 'transform 200ms ease-in-out' }}
          />
          <b style={{ userSelect: 'none' }}>{this.props.title}</b>
        </header>
        {this.state.open ? <section>{this.props.children}</section> : null}
      </section>
    );
  }
}

ExpandableSection.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired
};

ExpandableSection.defaultProps = {
  open: false
};

export default ExpandableSection;
