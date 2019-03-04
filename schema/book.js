const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('th_book', {
    // 文章ID
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
    },
    // 文章标题
    freeroom_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'freeroom_id',
    },
    // 文章作者
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    // 文章作者
    pianoroom_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'pianoroom_id',
    },
    // 是否推荐
    book_status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD-hh-mm-ss');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD-hh-mm-ss');
      }
    }
  }, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true
  })


}
