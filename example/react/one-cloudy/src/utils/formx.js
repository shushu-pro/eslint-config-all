/**
 * 用于将callback形式的validateFields转化为同步的形式
 * 原来是form.validateFields((err, values) => {})
 * 现在是const [err, values] = await validate(form);
 * @param {Object} form rc-form的实例
 */
export function validate (form) {
  return new Promise((resolve) => {
    form.validateFields((err, values) => {
      resolve([ err, values ])
    })
  })
}
export function validateAndScroll (form) {
  return new Promise((resolve) => {
    form.validateFieldsAndScroll((err, values) => {
      resolve([ err, values ])
    })
  })
}
