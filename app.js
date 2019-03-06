const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const logger = require('koa-logger')
const cors = require('koa-cors');
const index = require('./routes/index')
const secret = require('./config/secret')
const err = require('./middlreware/error')
const https = require('https');
const crypto = require('crypto')
const fs = require("fs")
//log工具
const { applogger, accessLogger } = require('./config/log4j');


// error handler
onerror(app)

app.use(err())
app.use(cors());
// logger

app.use(accessLogger());
app.on('error', err => {
    applogger.error(err);
});

// 此接口列表，过滤不用jwt验证
app.use(jwt({secret: secret.sign}).unless({
    path: [
        // 文章详情
        /^\/api\/v1\/article\/detail/,
        // 文章列表
        /^\/api\/v1\/article\/list/,
        // 登录
        /^\/api\/v1\/user\/login/,
        // 创建用户
        /^\/api\/v1\/user\/register/,
        // 分类列表
        /^\/api\/v1\/category\/list/,
        // 分类列表
        /^\/api\/v1\/freeroom\/list/,
        // 文章搜索
        /^\/api\/v1\/article\/search/,
        // 分类
        /^\/api\/v1\/category\/article\/list/,
        // test
        /^\/api\/v1\/article\/test/,
    ]
}))

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))


// app.use(async (ctx, next) => {
//     //响应开始时间
//     const start = new Date();
//     //响应间隔时间
//     var ms;
//     try {
//         //开始进入到下一个中间件
//         await next();
//
//         ms = new Date() - start;
//         //记录响应日志
//         logUtil.logResponse(ctx, ms);
//
//     } catch (error) {
//
//         ms = new Date() - start;
//         //记录异常日志
//         logUtil.logError(ctx, error, ms);
//     }
// });
app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// app.use(accessLogger()); //中间件
// app.on('error', err => {.error(err); });

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

app.listen(8082)

//https支持
// const privateKey = fs.readFileSync('../../../1835602_www.scixlab.cn.key').toString();
// const certificate = fs.readFileSync('../../../1835602_www.scixlab.cn.pem').toString();
// SSL options
var options = {
    key: fs.readFileSync('../../../1835602_www.scixlab.cn.key'),  //ssl文件路径
    cert: fs.readFileSync('../../../1835602_www.scixlab.cn.pem')  //ssl文件路径
};
https.createServer(options, app.callback()).listen(8083);



module.exports = app
