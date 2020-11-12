// 防抖函数
export function debounce(func, delay) {
  let timer = null
  return function(...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, ...args)
    }, delay)
  }
}

// 时间戳转换
export function formatDate(date, fmt) {

  let timeDate = new Date(date * 1000),
      year = timeDate.getFullYear(),
      month = timeDate.getMonth() + 1,
      today = timeDate.getDate(),
      hourse = timeDate.getHours(),
      minutes = timeDate.getMinutes(),
      seconds = timeDate.getSeconds();
      return `${year}-${month}-${today} ${hourse}:${minutes}:${seconds}`
}
