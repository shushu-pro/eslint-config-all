/**
 * Topic配置组件
 */
import React from 'react';
import { Form, Icon, Button, } from 'antd';
import { PRODUCT_FIELDS, INSTANCE_NAME_RULE } from '../_constant';
import { SelectItem } from '../../components';
import { InputItem, InputNumItem } from '../../../FormItem';
import styles from './index.less';

let id = 1;

class TopicConfig extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      topicKeysList: [0],
    };
  }

  componentWillReceiveProps(nextProps) {
    const keyList = this.getTopicKeysList(nextProps);
    id = keyList.length ? keyList[keyList.length - 1] + 1 : 0;
  }

  getTopicKeysList = () => {
    const { form } = this.props;
    const { topicKeysList } = this.state;
    const keyList = form.getFieldValue('topicKeysList') || topicKeysList;
    return keyList;
  }

  onAdd = () => {
    const { form } = this.props;
    const keyList = this.getTopicKeysList();
    form.setFieldsValue({
      topicKeysList: keyList.concat(id++),
    });
  };

  onMove = key => {
    const { form } = this.props;
    const keyList = this.getTopicKeysList();
    keyList.splice(key, 1);
    form.setFieldsValue({
      topicKeysList: keyList,
    });
  };


  renderTopic = (key, index) => {
    const { productType, form, optionList, specTypeGroupId } = this.props;
    const list = form.getFieldValue('topicLists') || [];
    const data = list[key] || {};
    return (
      <div key={key} className={styles.topicList}>
        <span style={{ marginRight: '20px' }}>
          <Form.Item>
            <InputItem
              id={`topicList.${key}.${PRODUCT_FIELDS.TOPIC}`}
              form={form}
              validator={(rule, value, callback) => {
                const ruleType = INSTANCE_NAME_RULE[productType];
                if (!ruleType) return callback();
                const pattern = ruleType.rlue;
                if (value && !pattern.test(value)) {
                  return callback(new Error('格式不正确'));
                }
                return callback();
              }}
              placeholder="Topic"
              maxLength={64}
              initialValue={data && data[PRODUCT_FIELDS.TOPIC]}
            />
          </Form.Item>
        </span>
        {form.getFieldDecorator(`topicList.${key}.specList.0.specTypeGroupId`, {
          initialValue: specTypeGroupId || data && data.specTypeGroupId,
        })}

        <Form.Item>
          <SelectItem
            label=""
            id={[`topicList.${key}.specList.0.groupsSpecTypeId`, `topicList.${key}.${PRODUCT_FIELDS.MESSAGE_TYPE}`]}
            form={form}
            optionData={optionList}
            placeholder="消息类型"
            initialValue={data && data.specList && data.specList[0].groupsSpecTypeId}
          />
        </Form.Item>
        <span style={{ marginRight: '20px' }}>
          <InputNumItem
            form={form}
            id={`topicList.${key}.${PRODUCT_FIELDS.TOPIC_NUM}`}
            placeholder="Topic个数"
            min={1}
            max={9999999}
            initialValue={data && data[PRODUCT_FIELDS.TOPIC_NUM]}
          />
        </span>
        <InputItem
          form={form}
          id={`topicList.${key}.${PRODUCT_FIELDS.AUTHORIZR_ACCOUNT}`}
          placeholder="授权账户"
          label='授权账户'
          otherPlacehoder='当输入多个时请用逗号隔开' // placeholder不要‘请选择’开头时使用
          maxLength={255}
          formItemLayout={{
            labelCol: {
              span: 7
            },
            wrapperCol: {
              span: 15
            }
          }}
          initialValue={data && data[PRODUCT_FIELDS.AUTHORIZR_ACCOUNT]}
        />
        {key !== 0 && <Icon style={{ color: '#1890ff', fontSize: '20px', margin: '-16px 8px 24px 10px' }} onClick={() => this.onMove(index)} type="minus-circle-o" /> ||
          <span style={{ display: 'inline-block', width: '38px', height: '36px' }}></span>}

      </div>
    );
  }

  render() {
    const { form, formItemLayout } = this.props;
    const { topicKeysList } = this.state;
    const idList = form.getFieldValue('topicKeysList') || topicKeysList;
    return (
      <>
        <Form.Item
          required
          label="Topic"
          {...formItemLayout}
          extra={(
            <>
              <div>1.“CID”和“GID”是Group ID的保留字段，Topic命名不能以“CID”和“GID”开头</div>
              <div>2.Topic只能包含英文、数字、短横线(-)和下划线(_)。</div>
              <div>3.长度限制在3-64字节之间。</div>
            </>
          )}
        >
          {form.getFieldDecorator('topicLists')}
          {form.getFieldDecorator('topicKeysList', {
            initialValue: topicKeysList,
            rules: [
              {
                type: 'array',
              },
            ],
          })}
          {idList.map(((key, index) => {
            return this.renderTopic(key, index);
          }))}

        </Form.Item>
        <Form.Item {...{
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }}
        >
          <Button type="dashed" onClick={this.onAdd}><Icon type="plus-circle-o" />添加Topic</Button>
        </Form.Item>
      </>
    );
  }
}

export default TopicConfig;
