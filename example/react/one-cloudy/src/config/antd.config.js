import TableX from '@/components/Common/TableX';

TableX.defaultProps.beforeRequest = ({ current, pageSize }, filters, sorter) => ({
  page: current,
  limit: pageSize,
  filters,
  sorter,
});

TableX.defaultProps.afterRequest = ({ resData: { list, totalCount } }) => ({
  list,
  total: totalCount,
});
