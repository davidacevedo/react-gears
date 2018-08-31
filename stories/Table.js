import React from 'react';
import fecha from 'fecha';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number, object, select } from '@storybook/addon-knobs';
import { Table, SortableTable, UncontrolledTable } from '../src';

const DATA = [
  { key: '111', expanded: false, first: 'Nicole', last: 'Grant', email: 'nicole.grant@example.com', dob: new Date(1968, 6, 15) },
  { key: '222', expanded: false, first: 'Alberto', last: 'Kennedy', email: 'alberto.kennedy@example.com', dob: new Date(1972, 7, 17) },
  { key: '333', expanded: false, first: 'Arron', last: 'Douglas', email: 'arron.douglas@example.com', dob: new Date(1982, 4, 1) },
  { key: '444', expanded: false, first: 'Reginald', last: 'Rhodes', email: 'reginald.rhodes@example.com', dob: new Date(1968, 8, 14) },
  { key: '555', expanded: false, first: 'Jimmy', last: 'Mendoza', email: 'jimmy.mendoza@example.com', dob: new Date(1964, 1, 1) },
  { key: '666', expanded: false, first: 'Georgia', last: 'Montgomery', email: 'georgia.montgomery@example.com', dob: new Date(1960, 6, 4) },
  { key: '777', expanded: true, first: 'Serenity', last: 'Thomas', email: 'serenity.thomas@example.com', dob: new Date(1973, 0, 11) },
  { key: '888', expanded: false, first: 'Tonya', last: 'Elliott', email: 'tonya.elliott@example.com', dob: new Date(1954, 7, 17) },
  { key: '999', expanded: false, first: 'Maxine', last: 'Turner', email: 'maxine.turner@example.com', dob: new Date(1961, 8, 19) },
  { key: '000', expanded: false, first: 'Max', last: 'Headroom', email: 'max.headroom@example.com', dob: new Date(1984, 6, 1) }
];

storiesOf('Table', module)
  .addWithInfo('Live example', () => (
    <Table
      bordered={boolean('bordered', true)}
      striped={boolean('striped', true)}
      hover={boolean('hover', true)}
      size={select('size', ['', 'sm', 'lg'], 'sm')}
    >
      <thead>
        <tr>
          <th>First</th>
          <th>Last</th>
          <th>DOB</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        {DATA.map(row => (
          <tr key={row.name}>
            <td>{row.first}</td>
            <td>{row.last}</td>
            <td>{fecha.format(row.dob, 'MM/DD/YYYY')}</td>
            <td><a href={`mailto:${row.email}`}>{row.email}</a></td>
          </tr>
         ))}
      </tbody>
    </Table>
  ))
  .addWithInfo('SortableTable', () => {
    const column = select('active', ['first', 'last', 'dob', 'email'], 'last');
    const ascending = boolean('ascending', true);
    return (
      <div>
        <p className="text-warning">
          <b>Note:</b> This is an uncontrolled example, will not sort on click.  See 'UncontrolledTable' story.
        </p>
        <SortableTable
          bordered={boolean('bordered', false)}
          hover={boolean('hover', true)}
          size={select('size', ['', 'sm', 'lg'], 'sm')}
          striped={boolean('striped', true)}
          columns={[
            {
              active: column === 'first',
              ascending,
              header: 'First',
              key: 'first',
              cell: row => row.first,
              onSort: action('onSort', 'First')
            },
            {
              active: column === 'last',
              ascending,
              header: 'Last',
              key: 'last',
              cell: row => row.last,
              onSort: action('onSort', 'Last')
            },
            {
              active: column === 'dob',
              ascending,
              header: 'DOB',
              key: 'dob',
              cell: row => fecha.format(row.dob, 'MM/DD/YYYY'),
              onSort: action('onSort', 'DOB')
            },
            {
              active: column === 'email',
              ascending,
              header: <span>Email</span>,
              key: 'email',
              cell: row => <a href={`mailto:${row.email}`}>{row.email}</a>,
              onSort: action('onSort', 'Email')
            }
          ]}
          rows={DATA}
        />
      </div>
    );
  })
  .addWithInfo('UncontrolledTable', () => (
    <div>
      <UncontrolledTable
        columns={[
          {
            header: 'First',
            key: 'first',
            cell: row => row.first,
            width: '20%'
          },
          {
            header: 'Last',
            key: 'last',
            cell: row => row.last,
            width: '30%'
          },
          {
            header: 'DOB',
            key: 'dob',
            cell: row => fecha.format(row.dob, 'MM/DD/YYYY'),
            width: '15%'
          },
          {
            header: 'Email',
            key: 'email',
            cell: row => <a href={`mailto:${row.email}`}>{row.email}</a>,
            width: '35%'
          }
        ]}
        rows={DATA}
        rowExpanded={row => <div>{row.first} {row.last}</div>}
        sort={{ column: 'last', ascending: true }}
        expandable={boolean('expandable', false)}
        selectable={boolean('selectable', false)}
        paginated={boolean('paginated', false)}
        pageSize={number('pageSize', 10)}
        onSelect={action('onSelect')}
      />
    </div>
  ))
  .addWithInfo('Align column', () => (
    <div>
      <p className="text-warning">
        <b>Note:</b> This is an uncontrolled example, will not sort on click.  See 'UncontrolledTable' story.
      </p>
      <SortableTable
        columns={[
          {
            header: 'Default Align',
            key: 'name',
            cell: row => row.first,
          },
          {
            align: 'left',
            header: 'Left Align',
            key: 'last',
            cell: row => row.last,
          },
          {
            align: 'center',
            header: 'Center Align',
            key: 'dob',
            cell: row => fecha.format(row.dob, 'MM/DD/YYYY'),
          },
          {
            align: 'right',
            header: 'Right Align',
            key: 'email',
            cell: row => <a href={`mailto:${row.email}`}>{row.email}</a>,
          }
        ]}
        rows={DATA}
      />
    </div>
  ));

