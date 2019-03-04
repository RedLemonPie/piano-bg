const db = require('../config/db')
const Sequelize = db.sequelize
const User = Sequelize.import('../schema/user.js')

User.sync({force: false});

class UserModel {
    /**
     * 创建用户
     * @param user
     * @returns {Promise<boolean>}
     */
    static async create(user) {
        let {username, password,school_class,school_id,real_name} = user;

        await User.create({
            username,
            password,
            school_class,
            school_id,
            real_name
        })
        return true
    }

    /**
     * 删除用户
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async delete(id) {
        await User.destroy({
            where: {
                id,
            }
        })
        return true
    }

    /**
     * 查询用户列表
     * @returns {Promise<*>}
     */
    static async findAllUserList() {
        return await User.findAll({
            attributes: ['id', 'username','score','credit','school_class','school_id','real_name','union_id']
        })
    }

    /**
     * 查询用户信息
     * @param username  姓名
     * @returns {Promise.<*>}
     */
    static async findUserByName(username) {
        return await User.findOne({
            where: {
                username
            }
        })
    }
    /**
     * 查询用户信息
     * @param username  姓名
     * @returns {Promise.<*>}
     */
    static async findUserById(id) {
        return await User.findOne({
            where: {
               id
            }
        })
    }
  /**
   * 更新
   * @param id  分类ID
   * @param data  事项的状态
   * @returns {Promise.<boolean>}
   */
  static async updateUser  (id , data) {
    await User.update({
       score: data.score,
       credit: data.credit,
       school_id: data.school_id,
       real_name: data.real_name,
       school_class: data.school_class
    }, {
      where: {
        id
      },
      fields: ['score','credit','school_id','real_name','school_class']
    });
    return true
  }
}

module.exports = UserModel
