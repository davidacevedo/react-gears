import React, { FunctionComponent, KeyboardEvent, SyntheticEvent, HTMLAttributes } from 'react';
import classnames from 'classnames';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  onClick: (e: SyntheticEvent) => void;
  tag?: React.ElementType;
}

/**
 * Accessible generic container component that responds to click events
 * */
const ClickableContainer: FunctionComponent<ContainerProps> = ({ className, onClick, tag: Tag = 'div', ...props }) => {
  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <>
      <Tag
        tabIndex={0}
        onClick={onClick}
        onKeyPress={onKeyPress}
        role="button"
        {...props}
        className={classnames('rg-ClickableContainer', className)}
      />
      <style jsx>{`
        .rg-ClickableContainer:focus {
          outline: thin dotted;
        }
      `}
      </style>
    </>
  );
};

ClickableContainer.displayName = 'ClickableContainer';

export default ClickableContainer;
