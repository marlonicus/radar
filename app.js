import Koa from 'koa'
import Router from 'koa-router'

import Error from './controllers/error'
import Times from './controllers/times'

const koa = new Koa()
const app = new Router()

app.get(`/times`, Times.get)
app.get(`*`, Error.get)

koa.use(app.routes())
koa.listen(3000)
