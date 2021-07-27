
/**
 * 获取cookie字符串中最先失效的日期时间
 * @param {string} cookie 
 * @returns 时间戳
 */

export function getCookieInvalidTime (cookie) {
  cookie = 'NMTID=00ODIq-Exxi2uMAjUHQk8-03k4XsbYAAAF63G_l8Q; Max-Age=315360000; Expires=Wed, 23 Jul 2031 06:52:38 GMT; Path=/;;MUSIC_U=448303585a33b637167c7b257f1e2069dbf247090eab37cfd31d5aab6c2a784ff8eba1d7ed3f0aca; Max-Age=1296000; Expires=Mon, 9 Aug 2021 06:52:38 GMT; Path=/;;__remember_me=true; Max-Age=1296000; Expires=Mon, 9 Aug 2021 06:52:38 GMT; Path=/;;__csrf=a9effe1cf9b213fd29639583bcf3a33b; Max-Age=1296010; Expires=Mon, 9 Aug 2021 06:52:48 GMT; Path=/;'
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
