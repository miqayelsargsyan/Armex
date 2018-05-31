const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./mongoose/config')
const {addGoods} = require('./functionality/addGoods')
const {filter} = require('./functionality/filter')
const {getSales} = require('./functionality/getSales')
const {orderGoods} = require('./functionality/order')
const {getOrders} = require('./functionality/getOrders')
const {changePopularity} = require('./functionality/changePopularity')
const {logIn} = require('./functionality/logIn')
const {signUp} = require('./functionality/signUp')
const {logOut} = require('./functionality/logOut')
const {authenticate} = require('./authenticate/authenticate')
const {monthGraph} = require('./functionality/monthGraph')

let port = process.env.PORT || 3000;
let app = express();
app.use(bodyParser.json());

app.post('/api/v1/addGoods', authenticate, (req, res) => {
    addGoods(req, res)
})

app.post('/api/v1/signup', (req, res) => {
    signUp(req, res)
})

app.post('/api/v1/login', (req, res) => {
    logIn(req, res)
})

app.post('/api/v1/orderGoods', (req, res) => {
    orderGoods(req, res)
})

app.get('/api/v1/getGoods/(&limit=:limit)?(&offset=:offset)?(&brand=:brand)?(&type=:type)?(&priceFrom=:priceFrom)?(&priceTo=:priceTo)?(&sortBy=:sortBy)?(&sortType=:sortType)?', (req, res) => {
    filter(req, res)
})

app.get('/api/v1/getOrders/(&limit=:limit)?(&offset=:offset)?(&brand=:brand)?(&type=:type)?(&priceFrom=:priceFrom)?(&priceTo=:priceTo)?(&sortBy=:sortBy)?(&sortType=:sortType)?', (req, res) => {
    getOrders(req, res)
})

app.get('/api/v1/orders/lastMonth', (req, res) => {
    monthGraph(req, res)
})

app.get('/api/v1/getSales/limit=:limit?&offset=:offset?&brand=:brand?&type=:type?', (req, res) => {
        getSales(req, res)
})

app.get('/api/v1/logout', authenticate, (req, res) => {
    logOut(req, res)
})

app.patch('/api/v1/changePopularity/:id', authenticate, (req, res) => {
    changePopularity(req, res)
})

app.listen(port, () => {
    console.log(`The server is up on port ${port}`)
})


