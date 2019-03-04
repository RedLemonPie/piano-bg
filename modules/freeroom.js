const db = require('../config/db');
const Sequelize = db.sequelize;
const Freeroom = Sequelize.import('../schema/freeRoom');
const Pianoroom = Sequelize.import('../schema/pianoRoom');

Freeroom.sync({force: false});

class FreeroomModel {
  /**
   * 获取分类列表
   * @returns {Promise<*>}
   */
  static async getFreeroomList() {
    return await Freeroom.findAll({
        where: {
            freeroom_status: 0
        }
    })
  }

  /**
   * 获取分类详情数据
   * @param id  文章ID
   * @returns {Promise<Model>}
   */
  static async getFreeroomDetail(freeroom_id) {
      return await Freeroom.findOne({
          where: {
              freeroom_id,
          },
      })
  }
    /**
     * 去库存
     * @param id  分类ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async SubtractFreeroom (freeroom_id,num) {
        await Freeroom.update({
            freeroom_last: num
        }, {
            where: {
                freeroom_id
            },
        });
        return true
    }
  /**
    * 更新
    * @param id  分类ID
    * @param data  事项的状态
    * @returns {Promise.<boolean>}
    */
  static async updateFreeroom  (room_id  , data) {
      await Freeroom.update({
          room_name: data.room_name,
          room_status: data.room_status
      }, {
          where: {
              room_id
          },
          fields: ['room_name','room_status']
      });
      return true
  }

  /**
   * 创建房间
   * @param data
   * @returns {Promise<*>}
   */
  static async createFreeroom(data) {
      return await Freeroom.create({
          piano_name: data.piano_name
      })
  }
    /**
     * 批量创建
     * @param data
     * @returns {Promise<*>}
     */
    static async createFreeroomList(roomcount,starttimeStamp,endtimeStamp) {
         return Freeroom.create({
             freeroom_starttime  : starttimeStamp,
             freeroom_endtime: endtimeStamp,
             freeroom_last: roomcount
        })
    }


    /**
   * 删除房间
   * @param room_id
   * @returns {Promise.<boolean>}
   */
  static async deleteFreeroom(room_id) {
      await Freeroom.destroy({
          where: {
            room_id,
          }
      })
      return true
  }

}

module.exports = FreeroomModel
