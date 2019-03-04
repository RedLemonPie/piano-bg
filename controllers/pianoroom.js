const PianoroomModel = require('../modules/pianoRoom')
const statusCode = require('../util/status-code')

class pianoroomController {
  /**
   * 获取qingfang列表
   * @returns {Promise.<void>}
   */
  static async getpianoroomlist(ctx) {
    try {
      const data = await PianoroomModel.getPianoroomList();
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('查询琴房列表成功！', data);

    } catch (e) {

      ctx.response.status = 412;
      ctx.body = statusCode.ERROR_412(e);
    }
  }
  /**
   * 查询单条琴房数据
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async detail(ctx) {
      let room_id = ctx.params.room_id;

      if (room_id) {
          try {
              let data = await PianoroomModel.getPianoRoomDetail(room_id);
              ctx.response.status = 200;
              ctx.body = statusCode.SUCCESS_200('查询成功！', {
                  data
              });

          } catch (err) {
              ctx.response.status = 412;
              ctx.body = statusCode.ERROR_412({
                  mgs: '查询失败',
                  err,
              })
          }
      } else {
          ctx.response.status = 412;
          ctx.body = statusCode.ERROR_412('房间ID必须传');
      }
  }


  /**
   * 删除琴房数据
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async delete(ctx) {
      let room_id = ctx.params.room_id;

      if (room_id && !isNaN(room_id)) {
          try {
              await PianoroomModel.deletePianoroom(room_id);
              ctx.response.status = 200;
              ctx.body = statusCode.SUCCESS_200('删除成功！');

          } catch (err) {
              ctx.response.status = 200;
              ctx.body = statusCode.SUCCESS_200({
                  msg: '删除失败',
                  err,
              });

          }
      } else {
          ctx.response.status = 412;
          ctx.body = statusCode.ERROR_412('ID必须传！');
      }
  }

  /**
   * 更新琴房数据
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async update(ctx) {
      let req = ctx.request.body;
      let room_id = ctx.params.room_id;

      if (req) {
          await PianoroomModel.updatePianoRoom(room_id,data);
          let data = await PianoroomModel.getPianoRoomDetail(room_id);

          ctx.response.status = 200;
          ctx.body = statusCode.SUCCESS_200('更新成功！', data);
      } else {

          ctx.response.status = 412;
          ctx.body = statusCode.ERROR_412('更新失败！')
      }
  }


}

module.exports = pianoroomController;
