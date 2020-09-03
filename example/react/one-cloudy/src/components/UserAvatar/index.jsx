// 账号详情页面-基础信息
import React from 'react'
import {
  Avatar, Icon, Upload, message,
} from 'antd'
import styles from './index.less'

class UserAvatar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
  }


  render () {
    const that = this
    const { uploadAvatar, imgUrl } = this.props
    const avter = imgUrl ? { src: imgUrl } : { icon: 'user' }
    const props = {
      name: 'file',
      action: `${window.location.origin}/oc/sys/oss/upload`,
      headers: {
        authorization: 'authorization-text',
      },
      showUploadList: false,
      onChange (info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          that.setState({
            src: info.file.response.downloadurl,
          }, () => {
            uploadAvatar(info.file.response.downloadurl)
          })
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name}上传失败.`)
        }
      },
    }
    return (
      <div className={styles.userAvatar}>
        <Avatar {...avter} size={120} />
        <Upload {...props}>
          <Icon
            type="form"
            className={styles.icon}
            style={{
              fontSize: '18px', color: '#fff', background: '#1890ff', borderRadius: '50%', padding: '5px',
            }}
          />
        </Upload>


      </div>
    )
  }
}
export default UserAvatar
