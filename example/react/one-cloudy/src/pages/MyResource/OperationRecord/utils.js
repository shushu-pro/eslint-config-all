export const getCurrentYearMonthDay = (time) => {
  const now = new Date(time)
  const year = now.getFullYear()
  const month = now.getMonth() // 获取月份
  const date = now.getDate() // 获取日期
  const hour = now.getHours() // 获取时
  const minu = now.getMinutes() // 获取分钟
  const sec = now.getSeconds() // 获取秒钟
  return `${year}-${month}-${date} ${hour}:${minu}:${sec}`
}

export const parseUrlParams = () => {
  if (window.location.search.length <= 0) return false
  const info = window.location.search.slice(1)
  const result = {}
  info.split('&').forEach((item) => {
    result[decodeURIComponent(item.split('=')[0])] = decodeURIComponent(item.split('=')[1])
  })
  return result
}
