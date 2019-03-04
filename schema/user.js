const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD');
      }
    },
    score: {
      type: DataTypes.INTEGER(10),
      defaultValue: 0,
      allowNull: false,
    },
    credit: {
      type: DataTypes.INTEGER(10),
      defaultValue: 600,
      allowNull: false,
    },
    school_class: {
      type: DataTypes.STRING(50),
    },
    school_id: {
      type: DataTypes.STRING(50),
    },
    real_name: {
      type: DataTypes.STRING(50),
    },
    union_id: {
      type: DataTypes.STRING(50),
    }

  }, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true
  })
}
