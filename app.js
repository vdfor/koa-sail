const Koa = require('koa')
const json = require('koa-json')
const render = require('koa-ejs')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const statics = require('koa-static')
const path = require('path')

const app = new Koa()
// log4js
const logger = require('./logger')('app')
// api
const test = require('./api/test')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
// json
app.use(json())
// static
app.use(statics(path.join(__dirname, './public')))

// config render
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true
})

// render html
app.use(require('koa-router')().get('/', async (ctx) => {
  await ctx.render('index')
}).get('/about', async (ctx) => {
  await ctx.render('about')
}).middleware())

// logger
app.use(async (ctx, next) => {
  try {
    const start = new Date()
    await next()
    const ms = new Date() - start
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
  } catch (error) {
    logger.error(error)
    throw error
  }
})

// api
app.use(test.routes(), test.allowedMethods())

module.exports = app
