/**
 * 上传通用组件
 * @param initialValue 默认值
 * @param id 在表单中使用的key
 * @param label 显示的label
 * @param maxLen 最大上传数据
 */

import React from 'react'
import { Form, Upload, message, Button, Icon, Input } from 'antd'
import styles from './index.less'

class UploadItem extends React.PureComponent {
  constructor (props) {
    super(props)
    const { initialValue } = props
    const list =
      initialValue &&
      initialValue.map((item, index) => {
        if (!item.uid) {
          return {
            uid: index,
            fileName: item.fileName || item.name,
            url: item.url,
            ossUrl: item.ossUrl || item.ossurl,
          }
        }
        return item
      })
    this.state = {
      uploading: false,
      fileList: list || [],
    }
  }

  componentDidMount () {
    const { fileList } = this.state
    this.onSetValue(fileList)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { initialValue } = nextProps
    const { isEdit } = this.props
    // isEdit用于编辑时删除某个附件，附件全部删除的错误
    if (isEdit && (initialValue !== this.props.initialValue)) {
      const list =
        initialValue &&
        initialValue.map((item, index) => {
          if (!item.uid) {
            return {
              uid: index,
              fileName: item.fileName || item.name,
              url: item.url,
              ossUrl: item.ossUrl || item.ossurl,
            }
          }
          return item
        })
      this.setState({
        uploading: false,
        fileList: list || [],
      }, () => {
        list.length && this.onSetValue(list)
      })
    }
  }

  onSetValue = (valueList) => {
    const { form, id } = this.props
    form.setFieldsValue({
      [id]: valueList,
    })
  };

  onChange = (info) => {
    const { file } = info
    if (file.status === 'uploading') {
      this.setState({
        uploading: true,
        fileList: info.fileList,
      })
    }
    // 上传成功之后的数据处理
    if (file.status === 'done') {
      let newFileList = info.fileList
      // newFileList = newFileList.slice(-2);
      if (info.file.response.code !== 200) {
        message.error('上传失败，请稍后重试')
        newFileList.pop()
      } else {
        // 处理成需要的数据格式
        newFileList = newFileList.map((files) => {
          if (files.response) {
            return {
              uid: files.uid,
              fileName: files.response.fileName,
              url: files.response.downloadurl,
              ossUrl: files.response.url,
            }
          }
          return {
            uid: files.uid,
            fileName: files.fileName,
            url: files.url,
            ossUrl: files.ossUrl,
          }
        })
        // 设置表单的值
        this.onSetValue(newFileList)
        message.success('上传成功')
      }

      // 设置已上传的文件
      this.setState({
        fileList: newFileList,
        uploading: false,
      })
      return false
    }
    if (info.file.status === 'error') {
      info.fileList.pop()
      this.setState({
        uploading: false,
        fileList: info.fileList,
      })
      return message.error('上传失败，请稍后重试')
    }
    return false
  };

  // 删除操作
  onRemove = (file) => {
    const { fileList } = this.state
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)
    this.setState({
      fileList: newFileList,
      uploading: false,
    }, () => {
      console.log(this.state.fileList)
    })
    // 设置表单字段数据
    this.onSetValue(newFileList)
  };

  render () {
    const { uploading, fileList } = this.state
    const {
      form,
      id,
      label,
      initialValue,
      formItemLayout,
      required = true,
      maxLen,
      tip,
      renderContent,
      orgType,
      ...restProps
    } = this.props
    // orgType作为user标记字段，1：政务，2：政法，3：公安；
    const props = {
      // 覆盖 Upload 组件的 onProgress 属性，防止监听 xhr.upload.onprogress 触发 OPTIONS 请求
      // @see https://github.com/ant-design/ant-design/pull/5260
      onProgress: null,
      action: `${window.location.origin}/oc/sys/oss/upload`,
      name: 'file',
      onChange: this.onChange,
      onRemove: this.onRemove,
      showUploadList: false,
      fileList,
      beforeUpload: (file) => {
        const isLt2M = file.size / 1024 / 1024 < 50
        if (!isLt2M) {
          message.error('单个文件不能超过50M')
        }
        return isLt2M
      },
      ...restProps,
    }
    return (
      <Form.Item {...formItemLayout} label={label} required={required}>
        <div>
          {form.getFieldDecorator(id, {
            initialValue,
            rules: [
              {
                type: 'array',
                required,
                message: `请上传${label}`,
              },
            ],
          })(<Input type="hidden" />)}
          <div className={styles.downloadButton}>
            <Upload {...props}>
              {renderContent ? (
                renderContent(uploading, fileList, maxLen)
              ) : (
                <Button disabled={uploading || fileList.length >= maxLen}>
                  <Icon type="upload" />
                  文件上传
                </Button>
              )}
            </Upload>

          </div>
          {typeof tip !== 'undefined' ? (
            tip
          ) : (
            <div className={styles.extra}>
              最多可上传
              {maxLen}
              个文件，支持
              {restProps.accept || '全部'}
              类型文件
            </div>
          )}
          <div className={styles.fileList}>
            {fileList.map((item) => (
              <div className={styles.file} key={item.uid}>
                <i className="icon iconfont">&#xe64c;</i>
                <a href={item.url} download={item.fileName}>
                  <span className={styles.name}>{item.fileName || <Icon type="loading" />}</span>
                </a>
                <a onClick={() => (this.onRemove(item))}>
                  <Icon className={styles.close} type="close" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </Form.Item>
    )
  }
}

export default UploadItem
