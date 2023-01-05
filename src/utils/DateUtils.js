export function dateToInt(date) {
  return new Date(date).getTime() / 1000
}

export function timestampToTime(timestamp) {
  if (!timestamp) {
    return ''
  } else {
    const date = new Date(timestamp * 1000)
    const y = date.getFullYear()
    let MM = date.getMonth() + 1
    MM = MM < 10 ? ('0' + MM) : MM
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let m = date.getMinutes()
    m = m < 10 ? ('0' + m) : m
    let s = date.getSeconds()
    s = s < 10 ? ('0' + s) : s
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
  }
}

export function timestampToDate(timestamp) {
  if (!timestamp) {
    return ''
  } else {
    const date = new Date(timestamp * 1000)
    const y = date.getFullYear()
    let MM = date.getMonth() + 1
    MM = MM < 10 ? ('0' + MM) : MM
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '-' + MM + '-' + d
  }
}
