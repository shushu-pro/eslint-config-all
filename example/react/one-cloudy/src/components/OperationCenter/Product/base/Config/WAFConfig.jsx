/**
 * 通用的配置组件（WAF）
 */
import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { File } from '@/components/OperationCenter/ProjectInfo';
import url from '@/assets/WAF申请表单.xls';
import { RadioButtonItem, Upload } from '../../components';
import { PRODUCT_FIELDS } from '../_constant';
import { Number } from '../index';
import WAFApply from '../../../ApplyFrom/WAFApply';

const dataList = [{ key: 'page', value: '页面申请' }, { key: 'form', value: '附件申请' }];
const formFile = [
  {
    url,
    fileName: 'WAF申请表单.xls',
    fileId: '1',
  },
];

@connect(({ resourceApply }) => ({
  selectedProjectInfo: resourceApply.selectedProjectInfo,
}))
class WAFConfig extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPage: true,
      number: false,
      keyList: [],
    };
  }

  componentDidMount() {
    const { form, initData } = this.props;
    if (!initData) {
      form.setFieldsValue({ [PRODUCT_FIELDS.APPLY_TYPE]: dataList[0].key });
    } else {
      form.setFieldsValue({ [PRODUCT_FIELDS.APPLY_TYPE]: initData.applyType });
      if (initData.applyType === 'page') {
        form.setFieldsValue({ [PRODUCT_FIELDS.QUANTITY]: initData.wafDetailList.length });
      }
    }
  }

  componentWillReceiveProps() {
    const { form, initData } = this.props;
    const state = form.getFieldValue(PRODUCT_FIELDS.APPLY_TYPE);
    if (state.toString() === dataList[0].key) {
      this.setState({
        isPage: true,
      });
    } else {
      this.setState({
        isPage: false,
        number: false,
        keyList: [],
      });
    }
    const applyNumber = form.getFieldValue(PRODUCT_FIELDS.QUANTITY);
    if (applyNumber && applyNumber < 11) {
      let keyList = [];
      if (initData) {
        keyList = initData.wafDetailList;
        const len = keyList.length;
        if (applyNumber > len) {
          for (let i = len; i < applyNumber; i++) {
            keyList.push(i);
          }
        } else {
          for (let i = len; i > applyNumber; i--) {
            keyList.pop();
          }
        }
      } else {
        for (let i = 0; i < applyNumber; i++) {
          keyList.push(i);
        }
      }
      this.setState({
        number: true,
        keyList,
      });
    }
  }

  render() {
    const { form, formItemLayout, initData } = this.props;
    const formProps = { form, formItemLayout };
    const { isPage, number, keyList } = this.state;
    let ossUrl = [];
    if (initData && initData.applyType === 'form') {
      if (!initData[PRODUCT_FIELDS.WAF_FORM_FILE]) {
        ossUrl = [
          {
            fileName: initData.fileName || initData.name,
            url: initData.url,
            ossUrl: initData.ossUrl || initData.ossurl,
          },
        ];
      } else {
        const resultData = Object.values(initData[PRODUCT_FIELDS.WAF_FORM_FILE])[0];
        ossUrl = [
          {
            fileName: resultData.fileName || resultData.name,
            url: resultData.url,
            ossUrl: resultData.ossUrl || resultData.ossurl,
          },
        ];
      }
    }
    return (
      <>
        <Form.Item
          required
          label="申请方式"
          {...formItemLayout}
        >
          <RadioButtonItem form={form} optionData={dataList} id={[PRODUCT_FIELDS.APPLY_TYPE]} />
        </Form.Item>
        {isPage && (
          <Number
            id={PRODUCT_FIELDS.QUANTITY}
            label="申请台数"
            form={form}
            formItemLayout={formItemLayout}
            tip="最多可批量创建10台WAF"
            min={1}
            max={10}
          />
        )}
        {number
          && keyList.map((k, index) => (
            <WAFApply
              key={index}
              formItemLayout={formItemLayout}
              form={form}
              id={index}
              initData={k}
            />
          ))}
        {!isPage && (
          <>
            <File
              label="表格模板"
              data={{ formFile }}
              id="formFile"
              message={
                <span>
                  请下载表格模板，将信息填入后上传，系统会自动识别表格内容并开通资源
                  <br />
                  请勿改动表格表头，将会导致系统无法识别表格内容
                </span>
              }
            />
            <Upload
              initialValue={ossUrl || []}
              formProps={formProps}
              required
              placeholder="表格"
              label="表格上传"
              accept=".xls, .xlsx"
              maxLen={1}
              id={PRODUCT_FIELDS.WAF_FORM_FILE}
            />
          </>
        )}
      </>
    );
  }
}

export default WAFConfig;
