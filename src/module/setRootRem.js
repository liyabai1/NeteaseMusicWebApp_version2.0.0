
/**
 * 根据UI图的大小设置根fontsize
 * @param {number} UIwidth  UI图的宽度
 * @param {number} fontSize  UI图上字体的大小
 * @param {number} screenWidth 设备的宽度
 */
export function setRootRem (UIwidth, fontSize, screenWidth) {
  return fontSize / (UIwidth / screenWidth)
}
