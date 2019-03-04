const db = require('../config/db');
const Sequelize = db.sequelize;
const PianoRoom = Sequelize.import('../schema/pianoroom');

PianoRoom.sync({force: false});

class PianoroomModel {
  /**
   * 获取分类列表
   * @returns {Promise<*>}
   */
  static async getPianoroomList() {
    return await PianoRoom.findAll({
      attributes: ['room_id', 'room_name','room_status'],
    })
  }
  /**
   * 获取分类详情数据
   * @param id  文章ID
   * @returns {Promise<Model>}
   */
  static async getPianoRoomDetail(room_id) {
      return await PianoRoom.findOne({
          where: {
              room_id,
          },
      })
  }
  /**
    * 更新
    * @param id  分类ID
    * @param data  事项的状态
    * @returns {Promise.<boolean>}
    */
  static async updatePianoRoom  (room_id  , data) {
      await PianoRoom.update({
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
  static async createPianoRoom(data) {
      return await PianoRoom.create({
          piano_name: data.piano_name
      })
  }

  /**
   * 删除房间
   * @param room_id
   * @returns {Promise.<boolean>}
   */
  static async deletePianoroom(room_id) {
      await PianoRoom.destroy({
          where: {
            room_id,
          }
      })
      return true
  }

}

module.exports = PianoroomModel
