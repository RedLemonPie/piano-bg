const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('th_freeroom', {
        // 文章ID
        freeroom_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        // 开始时间
        freeroom_starttime: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                return moment(this.getDataValue('freeroom_starttime')).unix();
            }
        },
        // 结束时间
        freeroom_endtime: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                return moment(this.getDataValue('freeroom_endtime')).unix();
            }
        },
        // 剩余
        freeroom_last: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        // 是否推荐
        freeroom_status: {
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
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })


}
