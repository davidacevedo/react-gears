import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash.uniqueid';
import Header from './SortableTable/Header';
import Button from './Button';
import Icon from './Icon';
import Label from './Label';
import Table from './Table';

function generateColumnClassName(column, truncate = false) {
  return classnames(
    truncate && 'text-truncate',
    column.align && `text-${column.align}`,
    column.className
  );
}

function defaultRenderRow(row, columns, rowClassName, rowExpanded, rowOnClick, truncate, rowSelected) {
  const expanded = rowExpanded(row);
  return [
    <tr
      key={row.key}
      className={classnames({ 'table-primary': rowSelected && rowSelected(row) }, rowClassName(row))}
      onClick={e => rowOnClick && rowOnClick(row, e)}
      role={rowOnClick ? 'button' : null}
    >
      {columns.map(column => (
        <td key={column.key} className={generateColumnClassName(column, truncate)}>
          {column.cell(row, expanded)}
        </td>
      ))}
    </tr>,
    expanded && <tr key={row.key ? `${row.key}-hidden` : null} hidden />,
    expanded && (
      <tr
        key={row.key ? `${row.key}-expanded` : null}
        className={classnames({ 'table-primary': rowSelected && rowSelected(row) }, 'tr-expanded')}
      >
        <td className="border-top-0" colSpan={columns.length}>
          {expanded}
        </td>
      </tr>
    ),
  ];
}

class SortableTable extends React.Component {
  static propTypes = {
    ...Table.propTypes,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        align: PropTypes.oneOf(['left', 'center', 'right']),
        active: PropTypes.bool,
        ascending: PropTypes.bool,
        cell: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        footer: PropTypes.node,
        header: PropTypes.node,
        key: PropTypes.string,
        onSort: PropTypes.func,
        width: PropTypes.string
      })
    ).isRequired,
    rows: PropTypes.oneOfType(
      [
        PropTypes.arrayOf(PropTypes.shape({
          key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) // ensure each row has a unique key
        })),
        PropTypes.object,
      ]
    ),
    expandableColumn: PropTypes.object,
    header: PropTypes.node,
    footer: PropTypes.node,
    rowClassName: PropTypes.func,
    onExpand: PropTypes.func,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    rowExpanded: PropTypes.func,
    rowSelected: PropTypes.func,
    rowOnClick: PropTypes.func,
    allSelected: PropTypes.bool,
    truncate: PropTypes.bool,
    renderRow: PropTypes.func,
    // TODO? support sort type icons (FontAwesome has numeric, A->Z, Z->A)
  };

  static defaultProps = {
    ...Table.defaultProps,
    expandableColumn: {},
    rows: [],
    rowClassName: () => undefined,
    rowExpanded: () => false,
    truncate: false,
    renderRow: defaultRenderRow,
  };

  render() {
    const {
      columns, header, footer, rowClassName, rowOnClick, rows, style, truncate,
      allSelected, onSelect, onSelectAll, rowSelected,
      expandableColumn, onExpand, rowExpanded, renderRow,
      ...props
    } = this.props;
    const selectable = rowSelected;
    const expandable = onExpand;
    const showColgroup = selectable || expandable || columns.some(column => column.width);
    const showFooter = columns.some(column => column.footer);
    const tableStyle = {
      tableLayout: truncate ? 'fixed' : 'auto',
      ...style
    };

    const cols = [...columns];

    if (selectable) {
      const selectAllId = uniqueId('select-all-');
      cols.unshift({
        align: 'center',
        key: 'select',
        header: (
          <>
            <Label for={selectAllId} hidden>Select all rows</Label>
            <input
              type="checkbox"
              className="mx-1"
              id={selectAllId}
              checked={allSelected}
              onClick={e => e.stopPropagation()}
              onChange={e => onSelectAll(e.target.checked)}
            />
          </>
        ),
        cell: (row) => {
          const selectRowId = uniqueId('select-row-');
          return (
            <>
              <Label for={selectRowId} hidden>Select row</Label>
              <input
                id={selectRowId}
                type="checkbox"
                className="mx-1"
                checked={rowSelected(row)}
                onClick={e => e.stopPropagation()}
                onChange={e => onSelect(row, e.target.checked)}
              />
            </>);
        },
        width: '2rem'
      });
    }

    if (expandable) {
      cols.push({
        align: 'center',
        key: 'expand',
        cell: (row, expanded) => (
          <Button
            className="px-2 py-0"
            color="link"
            onClick={() => onExpand(row)}
            aria-label="Expand row"
          >
            <Icon name={expanded ? 'angle-up' : 'angle-down'} />
          </Button>
        ),
        width: '2rem',
        ...expandableColumn
      });
    }

    return (
      <Table
        style={tableStyle}
        {...props}
      >
        {showColgroup &&
          <colgroup>
            {cols.map(column => (
              <col key={column.key} style={{ width: column.width }} />
            ))}
          </colgroup>
        }
        <thead>
          {header}
          <tr>
            {cols.map((column, index) => (
              <Header
                active={column.active}
                ascending={column.ascending}
                className={generateColumnClassName(column, truncate)}
                key={index}
                onSort={column.onSort ? () => column.onSort(!column.ascending) : null}
              >
                {column.header}
              </Header>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => renderRow(row, cols, rowClassName, rowExpanded, rowOnClick, truncate, rowSelected))}
        </tbody>
        {(showFooter || footer) && (
          <tfoot>
            {showFooter && (
              <tr>
                {cols.map(column => (
                  <td
                    key={column.key}
                    className={generateColumnClassName(column, truncate)}
                  >
                    {column.footer}
                  </td>
                ))}
              </tr>
            )}
            {footer}
          </tfoot>
        )}
      </Table>
    );
  }
}
export default SortableTable;
