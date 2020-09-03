// 查看项目accesskey
import React from 'react';
import { Modal, Table } from 'antd';
// import styles from './index.less';


class CheckAccessKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

    handleOk =() => {

    }

    handleCancel =() => {
      const { changeCheckAccessKeyVisible } = this.props;
      changeCheckAccessKeyVisible && changeCheckAccessKeyVisible();
    }

    getUserList = () => {
      // const { dispatch } = this.props;
      // dispatch({
      //   type:'',
      //   payload:{

      //   },
      //   callback:e=>{
      //     if(e.code===200){
      //       this.setState({
      //         resData:e.resData
      //       })
      //     }
      //   }
      // })
    }

    render() {
      const columns = [
        {
          title: 'DT',
          dataIndex: 'name',
          acessKey: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: '部门',
          dataIndex: 'dept',
          acessKey: 'dept',
        },
        {
          title: '区域',
          dataIndex: 'area',
          acessKey: 'area',
        },
        {
          title: 'key',
          dataIndex: 'key',
          acessKey: 'key',
        },
      ];

      const data = [
        {
          key: '1',
          name: 'John Brown',
          dept: 32,
          area: 'New York No. 1 Lake Park',
          acessKey: '1111',
        },
        {
          key: '2',
          name: 'Jim Green',
          dept: 42,
          area: 'London No. 1 Lake Park',
          acessKey: '1111',
        },
        {
          key: '3',
          name: 'Joe Black',
          dept: 32,
          area: 'Sidney No. 1 Lake Park',
          acessKey: '1111',
        },
      ];

      const { visible } = this.props;
      return (
        <Modal
          title="部门AccessKey"
          visible={visible}
          width="1200px"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={false}
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </Modal>
      );
    }
}
export default CheckAccessKey;