const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const mount = require('koa-mount')
const bodyParser = require('koa-body')
const compression = require('compression')
const koaConnect = require('koa-connect')
const next = require('next')
const config = require('./config.js')
const dev = config.nodeEnv !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
// const session = require('koa-session')

// const attractionControllers = require('./controllers/attractionControllers')
// const commonControllers = require('./controllers/commonControllers')

const authRequiredMiddleware = require('./middleware/authRequired')

//  errorHandler = require("./middleware/errorHandler");

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  // server.use(
  //   session({
  //     secret: 'hubwiz app', //secret的值建议使用随机字符串
  //     cookie: { maxAge: 60 * 1000 * 30 }, // 过期时间（毫秒）
  //   })
  // )

  // server.use(session(server))

  //Gzip
  server.use(koaConnect(compression()))
  if (dev) {
    //local /build/images get webpack build image
    server.use(mount('/static/images', serve(__dirname + '/build/images')))
  }

  /**
   * @description page route
   */

  // index
  router.get('/', async (ctx, next) => {
    ctx.redirect('/home')
    next()
  })

  router.post('/', async (ctx, next) => {
    ctx.redirect('/home')
    ctx.status = 302
    return false
  })

  router.get(
    '/home',
    async (ctx, next) => {
      // 驗證API TOKEN
      await authRequiredMiddleware(ctx)
      await next()
    },
    async ctx => {
      ctx.status = 200
      const query = Object.assign({}, ctx.query, { apiToken: ctx.state.apiToken })
      await app.render(ctx.req, ctx.res, '/home', query)
      ctx.respond = false
    }
  )

  router.get(
    '/attractions',
    async (ctx, next) => {
      // 驗證API TOKEN
      await authRequiredMiddleware(ctx)
      await next()
    },
    async ctx => {
      ctx.status = 200
      const query = Object.assign({}, ctx.query, { apiToken: ctx.state.apiToken })
      await app.render(ctx.req, ctx.res, '/attractions', query)
      ctx.respond = false
    }
  )

  router.get(
    '/introduction',
    async (ctx, next) => {
      // 驗證API TOKEN
      await authRequiredMiddleware(ctx)
      await next()
    },
    async ctx => {
      ctx.status = 200
      const query = Object.assign({}, ctx.query, { apiToken: ctx.state.apiToken })
      await app.render(ctx.req, ctx.res, '/introduction', query)
      ctx.respond = false
    }
  )

  // router.post('/api/getToken', commonControllers.getToken)

  // 景點列表
  // router.get('/api/getScenicSpotList', attractionControllers.getScenicSpotList)
  // router.get('/api/getRestaurantList', attractionControllers.getRestaurantList)
  // // router.get('/api/getHotelList', attractionControllers.getHotelList)
  // router.get('/api/getActivityList', attractionControllers.getActivityList)

  //for post data (ctx.request.body)
  server.use(
    bodyParser({
      multipart: true,
      formidable: {
        maxFileSize: 10 * 1024 * 1024,
      },
    })
  )
  // errorHandler
  // server.use(errorHandler());

  // routes
  server.use(router.routes())

  // 收集錯誤訊息
  server.on('error', (err, ctx) => {
    console.error(`error: ${ctx.request.method} ${ctx.request.url} - ${err.message}`)
  })
  process.on('unhandledRejection', (reason, promise) => {
    console.error(`Unhandled Rejection: ${promise} - ${reason}`)
  })
  process.on('uncaughtException', err => {
    console.error(`Uncaught Exception: ${err}`)
  })
  process.on('exit', code => {
    console.error(`exit code: ${code}`)
  })

  router.get('(.*)', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
  // router.get('(.*)', (ctx) => { ctx.body = 'ok' })

  // listen
  server.listen(config.port, () => {
    console.info(`server start on port:${config.port}`)
  })
})
