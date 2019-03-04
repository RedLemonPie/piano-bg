const Router = require('koa-router')
const UserController = require('../controllers/user')
const ArticleController = require('../controllers/article')
const CategoryController = require('../controllers/category')
const PianoroomController = require('../controllers/pianoroom')
const BookController = require('../controllers/book')
const FreeroomController = require('../controllers/Freeroom')


const router = new Router({
    prefix: '/api/v1'
})

/**
 * 用户接口
 */
// 用户注册
router.post('/user/register', UserController.create);
// 用户登录
router.post('/user/login', UserController.login);
// 删除用户
router.delete('/user/delete/:id', UserController.delete);
// 获取用户信息
router.get('/user/info', UserController.getUserInfo);
// 更新用户信息
router.post('/user/update/:id', UserController.updateUserInfo);
// 获取用户列表
router.get('/user/list', UserController.getUserList);
//获取用户信息
router.get('/user/detail/:id', UserController.getUserDetail);


//获取琴房
router.get('/pianoroom/list', PianoroomController.getpianoroomlist);
//获取琴房
router.get('/pianoroom/detail/:room_id', PianoroomController.detail);
// 删除
router.delete('/pianoroom/delete/:room_id', PianoroomController.delete);
// 更改
router.put('/pianoroom/update/:room_id', PianoroomController.update);

//获取琴房
router.get('/freeroom/list', FreeroomController.getfreeroomlist);
//获取琴房
// router.get('/freeroom/detail/:room_id', FreeroomController.detail);
// 删除
// router.delete('/freeroom/delete/:room_id', FreeroomController.delete);
// 更改
// router.post('/freeroom/update/:room_id', FreeroomController.update);


//空闲琴房
// router.get('/book/list', BookController.getuserbooklist);
//获取用户订单列表
router.get('/book/getuserbooklist/:id', BookController.getuserbooklist);
//空闲琴房
router.post('/book/update', BookController.update);
//空闲琴房
router.get('/book/list/:freeroom_id', BookController.getsinglerbooklist);
/**
 * 文章接口
 */
// 创建文章
router.post('/article/create', ArticleController.create);
// 获取文章详情
router.get('/article/detail/:id', ArticleController.detail);
// 删除文章
router.delete('/article/delete/:id', ArticleController.delete);
// 更改文章
router.put('/article/update/:id', ArticleController.update);
// 获取文章列表
router.get('/article/list', ArticleController.list);
// 搜索文章
router.get('/article/search', ArticleController.search);

/**
 * 分类接口
 */
// 创建分类
router.post('/category/create', CategoryController.create);
// 获取分类详情
router.get('/category/detail/:id', CategoryController.detail);
// 删除分类
router.delete('/category/delete/:id', CategoryController.delete);
// 更改分类
router.put('/category/update/:id', CategoryController.update);
// 获取分类列表
router.get('/category/list', CategoryController.list);
// 查询分类ID下的所有文章列表
router.get('/category/article/list/:id', CategoryController.getCategoryArticle);

module.exports = router
