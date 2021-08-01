/** Root */
const CHANGE_THEME = "changeTheme"
export const ROOT = {
  CHANGE_THEME
}


/** Login */
const SET_USER_INFO = 'setUserInfo'
const SET_USER_LIST = 'setUserList'
export const LOGIN = {
  SET_USER_INFO,
  SET_USER_LIST
}

/** HOME */
const SET_BANNER_DATA = 'setBannerData'
const SET_RECOM_LIST = 'setRecomList'
const SET_RECOM_REQUEST_STATUS = 'setRecomReqSta'
const SET_RECOM_LIST_LOGIN = 'setRecomListLogin'
const SET_HOME_PERSONALIZED = 'setHomePersonalized'
const SET_NEW_MUSIC = 'setNewMusic'
const SET_HOME_RECOMMV = 'setHomeRecomMV'
export const HOME = {
  SET_BANNER_DATA,
  SET_RECOM_LIST,
  SET_RECOM_REQUEST_STATUS,
  SET_RECOM_LIST_LOGIN,
  SET_HOME_PERSONALIZED,
  SET_NEW_MUSIC,
  SET_HOME_RECOMMV
}

/** 首页歌单 */
const SET_SONG_TAG = 'setSongTag'
const SET_SONG_LIST = 'setSongList'
const CHANGE_NOW_TAG = 'changeNowTag'
const INIT_TOTAL = 'initTotal'
export const HOME_LIST = {
  SET_SONG_TAG,
  SET_SONG_LIST,
  CHANGE_NOW_TAG,
  INIT_TOTAL
}

/** MV列表 */
const SET_TAG_AREA = "setAreaTag"
const SET_TAG_TYPE = "setTypeTag"
const SET_TAG_ORDER = "setOrderTag"
const SET_MV_LIST = 'setMvList'
export const MV = {
  SET_TAG_AREA,
  SET_TAG_TYPE,
  SET_TAG_ORDER,
  SET_MV_LIST
}

/** 排行榜 */
const SET_RANK = "setRankData"
export const RANK = {
  SET_RANK
}

/** 最新音乐 */
export const newMusic = {
  
}

/** 搜索结果 */
const SET_SEAR_SONG = "setSearSong"
const SET_TYPE = "setType"
const SET_KEYWORDS = "setKeyWords"
const SET_SONGLOADING = "setSongLoading"
const SET_SEAR_MV = "setSearMv"
const SET_MVLOADING = "setMvLoading"
export const SEARCH_RES = {
  SET_SEAR_SONG,
  SET_TYPE,
  SET_KEYWORDS,
  SET_SONGLOADING,
  SET_SEAR_MV,
  SET_MVLOADING
}