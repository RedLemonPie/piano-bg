const db = require('../config/db');
const Sequelize = db.sequelize;
const Op = Sequelize.Op;
const FreeRoom = Sequelize.import('../schema/freeRoom');
const Book = Sequelize.import('../schema/book');
const Pianoroom = Sequelize.import('../schema/pianoRoom');

Book.hasOne(Pianoroom, {foreignKey: 'room_id'});
Book.belongsTo(FreeRoom, {foreignKey: 'freeroom_id'});
Book.sync({force: false});


class BookModel {
    /**
     * 创建订单
     * @param data
     * @returns {Promise<*>}
     */

    static async createBook(freeroom_id,user_id,pianoroom_id) {
        return await Book.create({
            freeroom_id,
            user_id,
            pianoroom_id
        })
    }
    /**
     * 更新文章数据
     * @param id  用户ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateBook(book_id, data) {
        await Book.update({
            book_status: data.book_status
        }, {
            where: {
                book_id
            },
            fields: ['book_status']
        });
        return true
    }

    /**
     //  * 搜索
     //  * @param params
     //  * @return {Promise<void>}
     //  */
    // static async search(params) {
    //     return await Article.findAll({
    //         raw: true,
    //         'order': [
    //             ['id', 'DESC']
    //         ],
    //         where: {
    //             title: {
    //                 // 模糊查询
    //                 [Op.like]: '%' + params.keyword + '%'
    //             }
    //         },
    //         attributes: {exclude: ['content']}
    //     })
    // }

    // /**
    //  * 获取预定列表
    //  * @returns {Promise<*>}
    //  */
    // static async getBookList(params) {
    //     let ret = null;
    //     let {page = 1, status, freeroom_id, user_id} = params;
    //
    //     if (category) {
    //         ret = await Article.findAndCountAll({
    //             limit: 10,//每页10条
    //             offset: (page - 1) * 10,
    //             where: {
    //                 category: category
    //             },
    //             'order': [
    //                 ['id', 'DESC']
    //             ],
    //             attributes: {exclude: ['content']}
    //         });
    //
    //     } else if (title) {
    //         ret = await Article.findAndCountAll({
    //             limit: 10,//每页10条
    //             offset: (page - 1) * 10,
    //             where: {
    //                 title
    //             },
    //             'order': [
    //                 ['id', 'DESC']
    //             ],
    //             attributes: {exclude: ['content']}
    //         });
    //
    //     } else if (recommend) {
    //         ret = await Article.findAndCountAll({
    //             limit: 10,//每页10条
    //             offset: (page - 1) * 10,
    //             where: {
    //                 recommend
    //             },
    //             'order': [
    //                 ['id', 'DESC']
    //             ],
    //             attributes: {exclude: ['content']}
    //         });
    //
    //     } else {
    //         ret = await Article.findAndCountAll({
    //             limit: 10,//每页10条
    //             offset: (page - 1) * 10,
    //             'order': [
    //                 ['id', 'DESC']
    //             ],
    //             attributes: {exclude: ['content']}
    //
    //         });
    //     }
    //
    //     return {
    //         code: 200,
    //         data: ret.rows,
    //         meta: {
    //             current_page: parseInt(page),
    //             per_page: 10,
    //             count: ret.count,
    //             total: ret.count,
    //             total_pages: Math.ceil(ret.count / 10),
    //         }
    //     }
    // }
    /**
     * 获取文章详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getBookDetail(book_id) {
        return await Sequelize.findAll({
            where: {
                book_id,
            },
        })
    }
    /**
     * 验证是否已经预定
     * @param id  freeroom_id
     * @returns {Promise<Model>}
     */
    static async checkHasBook(user_id,freeroom_id) {
        return await Book.findAll({
            where: {
                user_id,
                freeroom_id
            },
        })
    }
    /**
     * 获取文章详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getUserBookList(user_id) {
        return await Book.findAll({
            include:[{
                model: FreeRoom,
                attributes: ['freeroom_starttime','freeroom_endtime']
            },{
                model: Pianoroom,
                attributes: ['room_name' ]
            }],
            where: {
                user_id,
            },
        })
    }

    /**
     * 获取文章详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getBookList(user_id) {
        return await Book.findAll({})
    }

    /**
     * 单场次全部订单
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getSingleBookList(freeroom_id) {
        return await Book.findAll({
            where: {
                freeroom_id,
            },
        })
    }

    // /**
    //  * 删除文章
    //  * @param id listID
    //  * @returns {Promise.<boolean>}
    //  */
    // static async deleteArticle(id) {
    //     await Article.destroy({
    //         where: {
    //             id,
    //         }
    //     })
    //     return true
    // }

}

module.exports = BookModel
