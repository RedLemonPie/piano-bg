const BookModel = require('../modules/book')
const FreeroomModel = require('../modules/freeroom')
const PianoroomModel = require('../modules/pianoRoom')
const UserModel = require('../modules/user');
const statusCode = require('../util/status-code')

class bookController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        let req = ctx.request.body;

        if (req.title
            && req.author
            && req.introduce
        ) {
            try {
                // 查询分类是否存在
                let categoryDetail = await Category.findOne({
                    where: {
                        name: req.category,
                    },
                });
                if (categoryDetail) {
                    req.categoryId = categoryDetail.id;

                } else {
                    ctx.response.status = 412;
                    ctx.body = statusCode.ERROR_412({
                        msg: '缺少此文章分类，请重新创建分类: ' + req.category
                    })
                    return false;
                }

                const ret = await ArticleModel.createArticle(req);
                const data = await ArticleModel.getArticleDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('创建文章成功', data);

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412({
                    msg: '创建失败',
                    err,
                })
            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412({
                msg: '请检查参数2！'
            })
        }
    }

    /**
     * 查询单条分类数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getbookdetail(ctx) {
        let book_id = ctx.params.user_id;
        if (book_id) {
            try {
                let data = await BookModel.getBookDetail(book_id);
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
            ctx.body = statusCode.ERROR_412('用户ID必须传');
        }
    }

    /**
     * 查询单条分类数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getuserbooklist(ctx) {
        let id = ctx.params.id;
        if (id) {
            try {
                let resdata = await BookModel.getUserBookList(id)
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('查询成功！', resdata);
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412({
                    mgs: '查询失败',
                    err,
                })
            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('用户ID必须传');
        }
    }

    /**
     * 查询单条分类数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getsinglerbooklist(ctx) {
        let freeroom_id = ctx.params.freeroom_id;
        if (freeroom_id) {
            try {
                let data = await BookModel.getSingleBookList(freeroom_id);
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
            ctx.body = statusCode.ERROR_412('freeroom_id必须传');
        }
    }


    /**
     * 删除分类数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    // static async delete(ctx) {
    //     let room_id = ctx.params.room_id;
    //
    //     if (room_id && !isNaN(room_id)) {
    //         try {
    //             await PianoroomModel.deletePianoroom(room_id);
    //             ctx.response.status = 200;
    //             ctx.body = statusCode.SUCCESS_200('删除成功！');
    //
    //         } catch (err) {
    //             ctx.response.status = 200;
    //             ctx.body = statusCode.SUCCESS_200({
    //                 msg: '删除失败',
    //                 err,
    //             });
    //
    //         }
    //     } else {
    //         ctx.response.status = 412;
    //         ctx.body = statusCode.ERROR_412('ID必须传！');
    //     }
    // }

    /**
     * 更新分类数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx) {
        let req = ctx.request.body;
        let book_id = ctx.params.book_id;

        if (req) {
            await BookModel.updateBook(book_id, data);
            let data = await BookModel.getBookDetail(book_id);

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('更新成功！', data);
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('更新失败！')
        }
    }


}

module.exports = bookController;
