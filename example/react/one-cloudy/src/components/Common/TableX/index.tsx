import React, { Component } from 'react';
import { Table } from 'antd';
import isEqual from 'lodash-es/isEqual';
import isEmpty from 'lodash-es/isEmpty';
import { TableProps, SorterResult, TableCurrentDataSource } from 'antd/lib/table';
import { PaginationConfig } from 'antd/lib/pagination';
import { SpinProps } from 'antd/lib/spin';

/**
 * T:dataSource的单个元素
 * Y:请求参数params
 */

type ResData = any;
type BeforeRequest<T> = (
  pagination: PaginationConfig,
  filters: Record<keyof T, string[]>,
  sorter: SorterResult<T>,
  extra: TableCurrentDataSource<T>
) => {};

interface afterRequestData<T> {
  data: {
    total: number;
    list: T[];
    [other: string]: any;
  };
  [other: string]: any;
}

export interface TableXProps<T, Y> extends TableProps<T> {
  params?: Y;
  dataSource?: T[];
  autoRefresh?: boolean;
  beforeRequest?: BeforeRequest<T>;
  api?(...arg: any): Promise<ResData>;
  afterRequest?(res: ResData): afterRequestData<T>;
}

interface TableXState<T, Y> {
  dataList: T[];
  pagination: PaginationConfig;
  loading: boolean | SpinProps;
  params: Y;
  onTableChange: [
    // PaginationConfig,
    Record<keyof T, string[]>,
    SorterResult<T>,
    TableCurrentDataSource<T>
  ];
}

export default class TableX<T = any, Y = {}> extends Component<
  TableXProps<T, Y>,
  TableXState<T, Y>
  > {
  static defaultProps = {
    beforeRequest: ((pagination, filters, sorter) => ({
      currPage: pagination.current,
      pageSize: pagination.pageSize,
      filters,
      sorter,
    })) as BeforeRequest<any>,
    afterRequest: (res: ResData) => ({
      list: res.list,
      total: res.totalCount,
    }),
    autoRefresh: true,
    pagination: {}, // 防止取到undefined
    loading: {}, // 防止取到undefined
  };

  Table: Table<T>;
  defaultPagination: any;
  readonly state: TableXState<T, Y>;
  constructor(props: TableXProps<T, Y>) {
    super(props);
    this.defaultPagination = {
      current: 1,
      pageSize: 10,
    };
    let pagination = {};
    let loading = {};
    if (props.pagination) {
      // 如果props.pagination存在，则将初始值赋给state用于请求
      pagination = {
        current: props.pagination.current || this.defaultPagination.current,
        pageSize: props.pagination.pageSize || this.defaultPagination.pageSize,
      };
    }
    if (typeof props.loading !== 'boolean') {
      // 如果props.loading存在，则将初始值赋给state用于获取配置
      loading = {
        delay: props.loading.delay || 0,
        spinning: props.loading.spinning || false,
      };
    } else {
      loading = props.loading;
    }
    this.state = {
      dataList: [],
      pagination,
      loading,
      params: {} as Y, // 父组件传入得待合并请求参数
      onTableChange: [
        // beforeRequest的入参
        {} as Record<keyof T, string[]>,
        {} as SorterResult<T>,
        {} as TableCurrentDataSource<T>,
      ],
    };
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps: TableXProps<T, Y>) {
    const checkData = this.checkData(nextProps);
    if (nextProps.autoRefresh) {
      if (checkData === 1 && !isEqual(nextProps.dataSource, this.props.dataSource)) {
        this.getData(nextProps);
      }
      if (
        checkData === 2 &&
        (!isEqual(nextProps.params, this.props.params) || !isEqual(nextProps.api, this.props.api))
      ) {
        this.setState({ pagination: isEmpty(nextProps.pagination) ? this.defaultPagination : nextProps.pagination }, () => {
          this.getDataFromServer();
        });
      }
    }
  }

  init() {
    const checkData = this.checkData();
    if (checkData === 1) return this.getData();
    if (checkData === 2) return this.getDataFromServer();
  }

  checkData = (props = this.props) => {
    const { dataSource, api } = props;
    if (dataSource) return 1;
    if (api) return 2;
    return 0;
  };

  getDataFromServer = (props = this.props) => {
    const { loading, pagination, onTableChange } = this.state;
    const { api, params } = props;
    const tableParams = this.props.beforeRequest(pagination, ...onTableChange);
    const sendData = Object.assign({}, params, tableParams);
    this.setState({
      loading: Object.assign({}, loading, { spinning: true }),
    });
    api(sendData)
      .then(res => {
        const response = props.afterRequest ? props.afterRequest(res) : res;
        const { list, total } = response;
        const pagination = Object.assign({}, this.state.pagination, { total });
        this.setState({
          dataList: list,
          pagination,
        });
      })
      .finally(() => {
        this.setState({
          loading: Object.assign({}, loading, { spinning: false }),
        });
      });
  };

  refresh = () => {
    this.getDataFromServer();
  };

  getData(props = this.props) {
    const { dataSource } = props;
    const pagination = Object.assign({}, this.state.pagination, { total: dataSource.length });
    this.setState({
      dataList: dataSource,
      pagination,
    });
  }

  onTableChange: TableProps<T>['onChange'] = (pagination, filters, sorter, extra) => {
    this.props.getFilters && this.props.getFilters(filters.productCode, sorter.order);
    this.props.onChange && this.props.onChange(pagination, filters, sorter, extra);
    this.setState({ pagination, onTableChange: [filters, sorter, extra] }, () => {
      this.checkData() === 2 && this.getDataFromServer();
    });
  };

  render() {
    const { dataList, loading: stateLoading } = this.state;
    const {
      api,
      dataSource,
      loading: propsLoading,
      pagination: propsPagination,
      ...arg
    } = this.props;

    // 有问题需要处理
    // 将props和state的pagination合并，state优先
    const pagination = propsPagination
      ? Object.assign({}, propsPagination, this.state.pagination)
      : false;
    // 将props和state的loading合并，state优先
    const loading =
      typeof propsLoading === 'boolean'
        ? stateLoading || propsLoading
        : Object.assign({}, propsLoading, stateLoading);

    return (
      <Table
        ref={ref => (this.Table = ref)}
        {...arg}
        loading={loading}
        onChange={this.onTableChange}
        dataSource={JSON.parse(JSON.stringify(dataList))}
        pagination={pagination}
      />
    );
  }
}
