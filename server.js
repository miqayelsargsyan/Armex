const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./mongoose/config')
const {addGoods} = require('./functionality/addGoods')
const {filter} = require('./functionality/filter')
const {getSales} = require('./functionality/getSales')
const {orderGoods} = require('./functionality/order')
const {getOrders} = require('./functionality/getOrders')
const {changePopularity} = require('./functionality/changePopularity')
const {changeCount} = require('./functionality/changeCount')
const {logIn} = require('./functionality/logIn')
const {signUp} = require('./functionality/signUp')
const {logOut} = require('./functionality/logOut')
const session = require('express-session')

let port = process.env.PORT || 3000;
let app = express();
app.use(bodyParser.json());

app.post('/api/v1/addGoods', (req, res) => {
    addGoods(req, res)
})

app.post('/api/v1/signup', (req, res) => {
    signUp(req, res)
})

app.post('/api/v1/login', (req, res) => {
    logIn(req, res)
})

app.get('/api/v1/logout',(req, res) => {
    logOut(req, res)
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

app.get('/api/v1/getSales/limit=:limit?&offset=:offset?&brand=:brand?&type=:type?', (req, res) => {
        getSales(req, res)
})

app.patch('/api/v1/changePopularity/:id', (req, res) => {
    changePopularity(req, res)
})

app.post('/api/v1/changeCount/:code', (req, res) => {
    changeCount(req, res)
})

app.listen(port, () => {
    console.log(`The server is up on port ${port}`)
})


