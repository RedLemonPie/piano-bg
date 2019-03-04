const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('th_pianoroom', {
        room_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        room_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        room_status: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true  ,
        createdAt: false,
      // 将updatedAt字段改个名
        updatedAt: false

    })
}
