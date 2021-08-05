/**
 * des: 改变歌词时间显示,改为秒数
 * @param {string} 格式如下：[00:05.005] | [05:10.22]
 * @return {Number} 返回对应的秒数
 */
 export function changeTimeToSecond (time) {
  const temp = time.match(/(?<=\[).*(?=\])/g)[0] // 取掉首末的[]号
  const m = /[0-9]{2,}(?=:)/g.exec(temp)[0] // 获取 : 之前的时间 => 分钟
  const s = /(?<=:).*/g.exec(temp)[0] // 获取 : 之后的的时间 => 秒
  return Number(m) * 60 + parseFloat(s)
}

/**
 * des: 改变秒数为[00:05]格式
 * @param {number}  秒数   *******注意：不是毫秒******
 * @return {string}  格式如下： 03:52
 */
export function changeTimeToMinute (time) {
  let m = Math.floor(time / 60)
  let s = Math.floor(time % 60)
  m < 10 ? m = `0${m}` : m
  s < 10 ? s = `0${s}` : s
  return m + ':' + s
}

/**
 * 歌词转换
 */
export function toLrcArr(lrc) {
	let reg = /\[\d{2,}:\d{2,}.\d{2,}\]/g
	let tiemArr = lrc.match(reg)
	let ctxArr = lrc.split(reg).splice(1)
	tiemArr = tiemArr.map( item => {
		let reg = /(?!=\])\d{2,}:\d{2,}.\d{2,}(?!=\])/g
		let time = item.match(reg)[0]
		let min = time.split(":")[0]
		let sec = time.split(":")[1]
		let ms = ((Number(min)*60 + Number(sec))*1000).toFixed(0)
		return ms
	})
	let lrcArr = tiemArr.map( (item,index)=>{
		return {
			time: item,
			ctx: ctxArr[index]
		}
	})
	return lrcArr
}

/**
 * 字符串转16进制
 */
 export function stringToHex(str){
  var val="";
  for(var i = 0; i < str.length; i++){
      val += str.charCodeAt(i).toString(16);
  }
  return val;
}