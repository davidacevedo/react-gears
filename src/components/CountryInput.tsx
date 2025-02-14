import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Input from './Input';
import { InputProps } from 'reactstrap'
import COUNTRIES from './address/Countries'; // TODO i18n country names based on locale

interface CountryInputProps extends
  Omit<InputProps, 'type' | 'onChange'> {
  onChange?: (value: string | null) => void;
  placeholder?: string;
  value?: string;
}

const defaultProps = {
  onChange: () => {},
};

const CountryInput: React.FunctionComponent<CountryInputProps> = ({
  onChange = defaultProps.onChange,
  ...otherProps
}) => {
  const {
    className,
    disabled,
    id,
    name,
    placeholder,
    ...props
  } = otherProps;

  const classNames = classnames('custom-select', className);

  return (
    <Input
      type="select"
      {...props}
      className={classNames}
      disabled={disabled}
      id={id}
      name={name}
      onChange={e => onChange(e.target.value === '' ? null : e.target.value)}
    >
      <option value="">{placeholder}</option>
      {COUNTRIES.map(country =>
        <option value={country.value} key={country.value}>{country.label}</option>)}
    </Input>
  );
};

CountryInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

CountryInput.defaultProps = defaultProps;

CountryInput.displayName = 'CountryInput';

export default CountryInput;
