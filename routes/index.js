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
//每日添加  总时间 间隔
router.post('/freeroom/dailycreate', FreeroomController.createlistdaily);
//获取琴房
router.get('/freeroom/detail/:room_id', FreeroomController.detail);
// 删除
router.delete('/freeroom/delete/:room_id', FreeroomController.delete);
// 更改
router.post('/freeroom/update/:room_id', FreeroomController.update);


//空闲琴房
router.post('/book/create', BookController.create);
//空闲琴房
// router.get('/book/list', BookController.getuserbooklist);
//获取用户订单列表
router.get('/book/getuserbooklist/:id', BookController.getuserbooklist);
//空闲琴房
router.post('/book/update', BookController.update);
//空闲琴房
router.get('/book/list/:freeroom_id', BookController.getsinglerbooklist);




module.exports = router
