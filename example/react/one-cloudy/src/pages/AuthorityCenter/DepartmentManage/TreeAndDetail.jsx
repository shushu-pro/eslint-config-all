// 组织树和点击组织后显示的区域和财务主体
import React from 'react';
import { connect } from 'dva';
import { Radio, Spin } from 'antd';
import TreeSelect from '@/components/TreeSelect';
import styles from './index.less';


@connect(({ ACdepartment, loading }) => ({
  ...ACdepartment,
  loading: !!loading.effects['ACdepartment/getDtDeptTree'],
}))

class TreeAndDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DTlist: [
        {
          value: '1',
          label: '互联网DT',
        },
        {
          value: '2',
          label: '专有云DT',
        },
        {
          value: '3',
          label: '公安DT',
        },
      ],
      DTvalue: '1',
      DTname: '互联网DT',
      arealist: [
        {
          value: 'cloud-public',
          label: '互联网',
          key: '1',
          type: '1',
        },
        {
          value: 'cloud-private',
          label: '专有云-政务',
          key: '2',
          type: '2',
        },
        {
          value: 'cloud-industry-pub',
          label: '行业政法-政法',
          key: '2',
          type: '3',
        },
        {
          value: 'cloud-industry-secu',
          label: '公安',
          key: '3',
          type: '4',
        },
      ],
      bodylist: [],
      newAddList: [], // 渲染部门区域和财务主体的数组
    };
  }

  componentDidMount() {
    const { onRef } = this.props;
    if (onRef) {
      onRef(this);
    }
    this.getFinanceDepartmentList();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.chosenList !== this.props.chosenList) {
      this.mergeNewAddListAndChosenList(nextProps.chosenList, nextProps.ocDeptList);
    }
  }

  // 获得财务主题列表
  getFinanceDepartmentList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ACdepartment/getFinanceDepartmentList',
      payload: {
      },
      callback: (e) => {
        if (e.successful) {
          const { list } = e.resData;
          list.forEach((item) => {
            item.label = item.name;
            item.value = item.id;
          });
          this.setState({
            bodylist: list
          });
        }
      }
    });
  }

  // 将已匹配的部门数组加入到右侧渲染部门区域和财务主体的数组中
  mergeNewAddListAndChosenList = (chosenList, ocDeptList) => {
    const { newAddList } = this.state;
    // chosenList 手动匹配后产生的数据
    // ocDeptList 历史数据，可能没有财务主体的数据
    // 将ocDeptList和chosenList合并去重后产生完整的列表
    let totalList = [...chosenList, ...ocDeptList];
    const hash = {};
    totalList = totalList.reduce((item, next) => {
      hash[next.cloudDeptId] ? '' : hash[next.cloudDeptId] = true && item.push(next);
      return item;
    }, []);

    if (totalList && totalList.length > 0) {
      newAddList.push(...totalList);
    }
    this.setState({
      newAddList
    });
  }

  onRegionChange = (e) => {
    const { getDtDeptTree } = this.props;
    const { value, title } = e.target;
    this.setState({
      DTvalue: value,
      DTname: title,
      newAddList: [],
    }, () => {
      getDtDeptTree && getDtDeptTree(value);
    });
  };

  // 修改选中列表项的区域
  changeArea = (key, e) => {
    const { newAddList } = this.state;

    newAddList.forEach((item) => {
      if (item.cloudDeptId === key) {
        item.cloudRegion = e.target.value;
        item.areaType = e.target.radioType;
        item.ocFinanceDepartmentId = '';
      }
    });
    this.setState({
      newAddList,
    });
  };

  // 修改选中列表项的区域
  changeBody = (key, e) => {
    const { newAddList } = this.state;

    newAddList.forEach((item) => {
      if (item.cloudDeptId === key) {
        item.ocFinanceDepartmentId = e.target.value;
      }
    });
    this.setState({
      newAddList,
    });
  };

  // 渲染选中项的区域和财务主体
  renderList = () => {
    const {
      newAddList, arealist, bodylist, DTname, DTvalue
    } = this.state;

    // 过滤对应DT的区域
    const filterList = arealist.filter(item => item.key === DTvalue) || [];

    return newAddList && newAddList.map(item => (
      <div key={item.key} className={styles.listItem}>
        <div className={styles.listItemTitle}>{DTname} - {item.name}</div>
        <div className={styles.listItemName}>该部门支持的区域：</div>
        <div>
          <Radio.Group
            value={item.cloudRegion}
            onChange={this.changeArea.bind(this, item.key)}
          >
            {filterList.map(areaitem => (
              <Radio
                value={areaitem.value}
                key={areaitem.value}
                radioType={areaitem.type}
              >
                {areaitem.label}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        <div className={styles.listItemName}>该区域数据的财务主体：</div>
        <div>
          <Radio.Group
            value={item.ocFinanceDepartmentId}
            onChange={this.changeBody.bind(this, item.key)}
          >
            {bodylist && bodylist.length > 0 && bodylist.map(bodyitem => (
              <Radio
                value={bodyitem.value}
                key={bodyitem.value}
                disabled={this.checkDTAndFinance(item, bodyitem)}
              >{bodyitem.label}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      </div>));
  }

  // 匹配云区名字和areaType
  matchCloudRegion = (cloudRegion) => {
    const { arealist } = this.state;
    let type;
    arealist.map((item) => {
      if (item.value === cloudRegion) {
        // eslint-disable-next-line prefer-destructuring
        type = item.type;
      }
    });

    return type;
  }

  // DT和财务主体的对应关系，判断是否可点击
  checkDTAndFinance = (item, bodyitem) => {
    const { DTvalue } = this.state;
    const { areaType, cloudRegion } = item;
    const { type } = bodyitem;
    const cloudRegionType = this.matchCloudRegion(cloudRegion);

    // 先根据数据自带的云区，再根据区域切换后的数据，最后根据左侧云区切换的数据
    // eslint-disable-next-line no-mixed-operators
    const value = cloudRegionType && Number(cloudRegionType) || Number(areaType) || (DTvalue === '3' ? 4 : Number(DTvalue));

    if (value === 1 && type === 3) {
      return true;
    }
    if (value === 2 && (type === 2 || type === 3)) {
      return true;
    }
    if (value === 3 && (type === 1 || type === 3)) {
      return true;
    }
    if (value === 4 && type === 2) {
      return true;
    }
    return false;
  }

  // 设置选中项，选中或取消选中
  setList = (obj, checked) => {
    const { newAddList } = this.state;
    let Objindex = -1;
    if (checked) {
      newAddList.push(obj);
    } else {
      newAddList && newAddList.forEach((item, index) => {
        if (item.name === obj.name || item.key === obj.key) {
          Objindex = index;
        }
      });
      if (Objindex > -1) {
        newAddList.splice(Objindex, 1);
      }
    }

    this.setState({
      newAddList
    });
  }

  render() {
    const { DTvalue, DTlist, } = this.state;
    const {
      treeData, chosenList, OCdepartmentId, loading
    } = this.props;

    return (
      <Spin spinning={loading}>
        <div className={styles.treeAndDetail}>
          <div className={styles.tree}>

            <div className={styles.title}>
              匹配的DT部门:
            </div>
            <div className={styles.treeBody}>
              <Radio.Group
                value={DTvalue}
                onChange={this.onRegionChange}
                style={{ marginBottom: '10px' }}
              >
                {DTlist && DTlist.length > 0 && DTlist.map(item => (
                  <Radio.Button
                    value={item.value}
                    key={item.value}
                    title={item.label}
                  >{item.label}
                  </Radio.Button>
                ))}
              </Radio.Group>
              <div>
                <TreeSelect
                  onRef={(ref) => { this.treeSelect = ref; }}
                  isCheckable
                  haveSearch
                  setList={this.setList}
                  treeData={treeData}
                  chosenList={chosenList}
                  OCdepartmentId={OCdepartmentId}
                  treeStyles={{ height: '465px' }}
                />
              </div>
            </div>

          </div>
          <div className={styles.detail}>
            <div className={styles.title}>
              部门对应的区域与财政主体:
            </div>
            <div className={styles.detailBody}>
              {this.renderList()}
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}
export default TreeAndDetail;