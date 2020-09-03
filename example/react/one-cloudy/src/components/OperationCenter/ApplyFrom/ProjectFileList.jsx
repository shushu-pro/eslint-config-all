/**
 * 解决方法
 */
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import UploadItem from '../Upload'

class ProjectFileList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {
      form, formItemLayout, initialValue,
    } = this.props
    const formProps = {
      formItemLayout,
      form,
      id: 'attachFileLinks',
      label: '项目附件',
      initialValue,
      maxLen: 5,
      accept: '.doc, .docx, .jpg, .png, .jpeg, .pdf, .xls, .xlsx, .ppt, .pptx, .zip, .7z',
    }
    return <UploadItem {...formProps} required />
  }
}

export default ProjectFileList
ProjectFileList.defaultProps = {
  required: true,
}
ProjectFileList.propTypes = {
  form: PropTypes.object.isRequired,
  formItemLayout: PropTypes.object.isRequired,
  required: PropTypes.bool,
}
