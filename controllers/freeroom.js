const freeroomModel = require('../modules/freeroom')
const statusCode = require('../util/status-code')

class freeroomController {
  /**
   * 获取分类列表
   * @returns {Promise.<void>}
   */
  static async getfreeroomlist(ctx) {
    try {
      const data = await freeroomModel.getFreeroomList();
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('查询空闲琴房列表成功！', data);
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
              let data = await freeroomModel.getfreeroomDetail(room_id);
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
              await freeroomModel.deletefreeroom(room_id);
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
      let freeroom_id = ctx.params.freeroom_id;

      if (req) {
          await freeroomModel.updatefreeroom(room_id,data);
          let data = await freeroomModel.getfreeroomDetail(room_id);

          ctx.response.status = 200;
          ctx.body = statusCode.SUCCESS_200('更新成功！', data);
      } else {

          ctx.response.status = 412;
          ctx.body = statusCode.ERROR_412('更新失败！')
      }
  }


}

module.exports = freeroomController;
