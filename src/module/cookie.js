
/**
 * 获取cookie字符串中最先失效的日期时间
 * @param {string} cookie 
 * @returns 时间戳
 */

export function getCookieInvalidTime (cookie) {
  const cookieArray = cookie.split('Path=/;;')
  let ExpiresTimes = []
  cookieArray.forEach((items, index, cookieArray) => {
    const preCookieArr = items.split(';')
    cookieArray[index] = preCookieArr.map(items => {
      const arr = items.split('=')
      if (arr[0].trim() === 'Expires') {
        ExpiresTimes.push(arr[1])
      }
      return arr
    })
  })

  const reg = /(?<=,).*(?=GMT)/g
  ExpiresTimes = ExpiresTimes.map(items => {
    const itemTime = items.match(reg)
    const TimeArr = itemTime.map(item => item.split(' '))
    const day = TimeArr[0][1]
    const month = TimeArr[0][2]
    const year = TimeArr[0][3]
    const time = TimeArr[0][4]
    const date = new Date(`${month} ${day},${year} ${time}`).getTime()
    // console.log(date)
    return date
  })
  // 对ExpiresTimes排序
  ExpiresTimes.sort()
  // console.log(ExpiresTimes)
  // 返回最先失效的cookie时间
  return ExpiresTimes[0]
}
