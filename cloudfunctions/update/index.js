// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-miaomiao-8ga2j1t42a336afe',
})

const db = cloud.database()
// db.command 更新操作符，原子操作，用于指示字段自增
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    if (typeof event.data == 'string') {
      // eval 将字符串转成js代码
      // event.data = event.data = eval('(' + event.data + ')')
      event.data = eval('(' + event.data + ')')
    }
    if (event.doc) {
      return await db.collection(event.collection).doc(event.doc)
        .update({
          data: {
            // 扩展
            ...event.data
          },
        })
    } else {
      return await db.collection(event.collection)
        .where({
          ...event.where
        })
        .update({
          data: {
            // 扩展
            ...event.data
          },
        })
    }
  } catch (e) {
    console.error(e)
  }
}