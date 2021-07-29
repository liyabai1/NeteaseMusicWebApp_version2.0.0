import HTTPS from '@/util/http.js'
import { HOME_LIST } from '@/module/mutation-name.js'

const homeSonglist = {
  nemespace: true,
  state: {
    listTag:[]
  },
  mutations: {

    /**
     * 精品歌单标签
     */
    [HOME_LIST.SET_SONG_TAG] (state,tags) {
      console.log(tags)
      // 对标签进行重排
      let listTag = [
        {
          type: 0,
          category: "语种",
          tags: []
        },
        {
          type: 1,
          category: "风格",
          tags: []
        },
        {
          type: 2,
          category: "场景",
          tags: []
        },
        {
          type: 3,
          category: "情感",
          tags: []
        },
        {
          type: 4,
          category: "主题",
          tags: []
        }
      ]
      tags.forEach( item => {
        switch (item.category) {
          case 0 :
            listTag[0].tags.push(item);
            break;
          case 1 :
            listTag[1].tags.push(item);
            break;
          case 2 :
            listTag[2].tags.push(item);
            break;
          case 3 :
            listTag[3].tags.push(item);
            break;
          case 4 :
            listTag[4].tags.push(item)
        }
      });
      state.listTag = listTag
    }
  },
  actions: {
    /**
     * 获取精品歌单标签列表
     */
    getPlaylistTag: function (store) {
      let _this = this
      HTTPS.getListTag()
        .then(
          res => {
            if (res.data.code === 200) {
              // console.log(res.data)
              store.commit(HOME_LIST.SET_SONG_TAG,res.data.tags)
            } else {
              // 获取歌单标签失败
              _this.$message({
                message: "获取歌单失败",
                type: 'warning'
              })
            }
          },
          err => {
            console.error(err)
            // 获取歌单标签失败
            _this.$message({
              message: "获取歌单失败",
              type: 'warning'
            })
          }
        )
    }
  }
}
export default homeSonglist