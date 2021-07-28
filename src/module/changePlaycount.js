/**
 * 将超过万的数字改为  以“万”结尾的字符串
 * @param {number | string} count
 * @returns {string}
 */
export function changePlaycount (count) {
  let res = ''
  count = Number(count)
  count === 'NaN' || (() => {
    if (count >= 10000) {
      res = count.toString().slice(0, -4) + '万'
    } else {
      res = count
    }
  })()
  return res.toString()
}
