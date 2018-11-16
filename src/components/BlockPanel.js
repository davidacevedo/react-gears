import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Button from './Button';
import Card from './Card';
import CardBody from './CardBody';
import CardHeader from './CardHeader';
import CardTitle from './CardTitle';
import ClickableContainer from './ClickableContainer';
import Collapse from './Collapse';
import Icon from './Icon';

function BlockPanelTitle({ expandable, onClick, ...props }) {
  return expandable ?
    <ClickableContainer onClick={onClick} {...props} /> :
    <div {...props} />;
}

BlockPanelTitle.propTypes = {
  expandable: PropTypes.bool,
  onClick: PropTypes.func
};

class BlockPanel extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    controls: PropTypes.node,
    className: PropTypes.string,
    expandable: PropTypes.bool,
    headerClassName: PropTypes.string,
    hideOnToggle: PropTypes.bool,
    onEdit: PropTypes.func,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
  };

  static defaultProps = {
    className: '',
    open: true,
    expandable: false,
    hideOnToggle: false,
    onToggle: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      closed: !props.open
    };
  }

  toggle = () => {
    const open = !this.state.open;
    const newState = open ?
      { open, closed: false } :
      { open };
    this.setState(newState, () => this.props.onToggle(open));
  };

  onClosed = () => {
    this.setState({ closed: true });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      if (nextProps.open) {
        this.setState({ open: true, closed: false });
      } else {
        this.setState({ open: false });
      }
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { children, className, color, controls, expandable, hideOnToggle, title, onEdit, onToggle, headerClassName, ...props } = this.props;
    const { closed, open } = this.state;

    // TODO simplify - these styles should be default Card, CardHeader styles in theme, not util classes
    const headerClassNames = classnames(
      'd-flex',
      'flex-wrap',
      'align-items-center',
      'justify-content-between',
      'py-2',
      'pr-2',
      {
        'pl-2': expandable,
        [`bg-${color}`]: color,
        'text-white': color === 'primary' || color === 'dark'
      },
      headerClassName
    );

    return (
      <Card className={className} {...props}>
        <CardHeader
          className={headerClassNames}
        >
          <BlockPanelTitle className="d-inline-flex align-items-center" expandable={expandable} onClick={this.toggle}>
            {expandable ?
              <Icon
                className={`${(color !== 'primary' && color !== 'dark') ? 'text-muted' : ''} mr-1`}
                name="caret-right"
                rotate={open ? 90 : undefined}
                fixedWidth
                style={{ transition: 'transform 200ms ease-in-out' }}
              /> : null}
            <CardTitle tag="h2" className="h5 m-0 my-1 mr-auto">
              {title}
            </CardTitle>
          </BlockPanelTitle>
          <div className="d-inline-flex">
            {controls && controls}
            {onEdit && (
              <Button
                color="link"
                className={`${(color === 'primary' || color === 'dark') ? 'text-white' : ''} p-0 ml-2 mr-1`}
                onClick={onEdit}
              >
                edit
              </Button>
            )}
          </div>
        </CardHeader>
        {children && (
          <Collapse
            isOpen={children && (!expandable || open)}
            onExited={() => this.onClosed()}
          >
            {(!expandable || hideOnToggle || !closed) ?
              <CardBody>
                {children}
              </CardBody> :
              null}
          </Collapse>
        )}
      </Card>
    );
  }
}

export default BlockPanel;
