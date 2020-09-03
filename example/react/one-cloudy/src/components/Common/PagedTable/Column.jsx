import PropTypes from 'prop-types'

/**
 *
  title?: React.ReactNode;
  key?: string;
  dataIndex?: string;
  render?: (text: any, record: T, index: number) => React.ReactNode;
  filters?: { text: string; value: string }[];
  onFilter?: (value: any, record: T) => boolean;
  filterMultiple?: boolean;
  filterDropdown?: React.ReactNode;
  sorter?: boolean | ((a: any, b: any) => number);
  colSpan?: number;
  width?: string | number;
  className?: string;
  fixed?: boolean | ('left' | 'right');
  filteredValue?: any[];
  sortOrder?: boolean | ('ascend' | 'descend');
 */

export default function Column () {
  return null
}

Column.propTypes = {
  children: PropTypes.func,
  title: PropTypes.node.isRequired,
  dataIndex: PropTypes.string,
}
Column.defaultProps = {
  dataIndex: undefined,
  children: undefined,
}
