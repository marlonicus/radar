import Koa from 'koa'
import Router from 'koa-router'

import Error from './controllers/error'
import Times from './controllers/times'

const PORT = 3000

const koa = new Koa()
const app = new Router()

app.redirect('/', '/times')
app.get(`/times`, Times.get)
app.get(`*`, Error.get)

koa.use(app.routes())
koa.listen(PORT, () => {
	console.log(`Server running on 127.0.0.1:${PORT}`)
})
