import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select } from '@storybook/addon-knobs';
import { Combobox, Icon } from '../src';

const options = [
  { label: 'Alaska', value: 'AK' },
  { label: 'Alabama', value: 'AL' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Washington, D.C.', value: 'DC' },
  { label: 'Delaware', value: 'DE' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Maine', value: 'ME' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Montana', value: 'MT' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New York', value: 'NY' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Washington', value: 'WA' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wyoming', value: 'WY' },
  { label: 'U.S. Armed Forces Americas', value: 'AA' },
  { label: 'U.S. Armed Forces Europe', value: 'AE' },
  { label: 'U.S. Armed Forces Pacific', value: 'AP' },
  { label: 'American Samoa', value: 'AS' },
  { label: 'Micronesia', value: 'FM' },
  { label: 'Guam', value: 'GU' },
  { label: 'Marshall Islands', value: 'MH' },
  { label: 'Northern Mariana Islands', value: 'MP' },
  { label: 'Puerto Rico', value: 'PR' },
  { label: 'Virgin Islands', value: 'VI' }
];

export default {
  title: 'Combobox',
  component: Combobox,
};

export const LiveExample = () => {
  const [value, setValue] = useState();
  return (
    <Combobox
      direction={select('direction', ['', 'down', 'up'], '')}
      onChange={setValue}
      options={options}
      value={value}
      disabled={boolean('disabled', Combobox.defaultProps.disabled)}
      noResultsLabel={text('noResultsLabel', Combobox.defaultProps.noResultsLabel)}
      placeholder={text('placeholder', Combobox.defaultProps.placeholder)}
      inputClassName={text('inputClassName', '')}
    />
  );
};

export const Multi = () => {
  const [value, setValue] = useState();
  return (
    <Combobox
      multi
      direction={select('direction', ['', 'down', 'up'], '')}
      onChange={setValue}
      options={options}
      value={value}
      disabled={boolean('disabled', Combobox.defaultProps.disabled)}
      noResultsLabel={text('noResultsLabel', Combobox.defaultProps.noResultsLabel)}
      placeholder={text('placeholder', Combobox.defaultProps.placeholder)}
      inputClassName={text('inputClassName', '')}
    />
  );
};

export const Grouped = () => {
  const [value, setValue] = useState();
  return (
    <Combobox
      multi={boolean('multi', false)}
      direction={select('direction', ['', 'down', 'up'], '')}
      onChange={setValue}
      options={[{ label: 'Colors', options: [{ label: 'Red', value: 'red' }, { label: 'Blue', value: 'blue' }] }, { label: 'States', options }]}
      value={value}
      disabled={boolean('disabled', Combobox.defaultProps.disabled)}
      noResultsLabel={text('noResultsLabel', Combobox.defaultProps.noResultsLabel)}
      placeholder={text('placeholder', Combobox.defaultProps.placeholder)}
      inputClassName={text('inputClassName', '')}
      menuMaxHeight="20rem"
    />
  );
};

export const CreatableOptions = () => {
  const [value, setValue] = useState();
  const [opts, setOpts] = useState(options);

  const onCreate = (str) => {
    const newOpt = { value: str, label: str };
    setOpts([...opts, newOpt]);

    return newOpt.value;
  };

  return (
    <Combobox
      direction={select('direction', ['', 'down', 'up'], '')}
      onChange={setValue}
      onCreate={onCreate}
      options={opts}
      value={value}
      disabled={boolean('disabled', Combobox.defaultProps.disabled)}
      noResultsLabel={text('noResultsLabel', Combobox.defaultProps.noResultsLabel)}
      placeholder={text('placeholder', Combobox.defaultProps.placeholder)}
      inputClassName={text('inputClassName', '')}
    />
  );
};

export const CustomOptions = () => {
  const [value, setValue] = useState();
  const [asyncOptions, setAsyncOptions] = useState([]);
  const [searching, setSearching] = useState(false);

  const renderOption = option => (
    <div>
      <Icon name={option.type === 'address' ? 'home' : 'user'} className="mr-2 py-4" />
      { option.label }
    </div>
  );

  const renderInputValue = option => (
    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {option.label}
    </div>
  );

  const search = val => {
    action('onInputChange')(val);
    setSearching(true);

    new Promise((resolve) => {
      setTimeout(resolve, 1000);
    }).then(() => {
      const newOpts = options.map(opt => (
        Object.assign({}, opt, { label: `${val} ${opt.label}` })
      ));
      setAsyncOptions(newOpts);
      setSearching(false);
    });
  };

  const onChange = val => {
    action('onChange')(val);
    setValue(val);
  };

  return (
    <Combobox
      multi
      onChange={onChange}
      onInputChange={search}
      options={asyncOptions}
      value={value}
      renderOption={renderOption}
      renderInputValue={renderInputValue}
      menuMaxHeight="20rem"
      icon={searching ? <Icon name="spinner" spin /> : undefined}
    />
  );
};
