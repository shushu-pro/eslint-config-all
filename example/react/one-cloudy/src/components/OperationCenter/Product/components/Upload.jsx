/**
 * 资源附件组件
 */
import React from 'react'
import { PRODUCT_FIELDS, FIELD_MAP } from '@/components/OperationCenter/Product/base/_constant'
import UploadItem from '../../Upload'

function Upload ({
  formProps,
  required = false,
  placeholder,
  initialValue = [],
  maxLen = 5,
  accept = '.doc, .docx, .jpg, .png, .jpeg, .pdf, .xls, .xlsx, .ppt, .pptx',
  label = FIELD_MAP[PRODUCT_FIELDS.ATTACHMENT],
  id = PRODUCT_FIELDS.ATTACHMENT,
  orgType,
}) {
  return (
    <UploadItem
      initialValue={initialValue}
      required={required}
      label={label}
      placeholder={placeholder}
      {...formProps}
      maxLen={maxLen}
      accept={accept}
      id={id}
      orgType={orgType}

      action="/oc/sys/oss/uploadResourceApply"
    />
  )
}

export default Upload
