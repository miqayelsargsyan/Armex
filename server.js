const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./mongoose/config')
const {addGoods} = require('./functionality/addGoods')
const {filter} = require('./functionality/filter')
const {changeCount} = require('./functionality/changeCount')
const {getSales} = require('./functionality/getSales')
const {orderGoods} = require('./functionality/order')

let port = process.env.PORT || 3000;
let app = express();
app.use(bodyParser.json());

app.post('/api/v1/addGoods', (req, res) => {
    addGoods(req, res)
})

app.post('/api/v1/orderGoods', (req, res) => {
    orderGoods(req, res)
})

app.get('/api/v1/getGoods/(&limit=:limit)?(&offset=:offset)?(&brand=:brand)?(&type=:type)?(&priceFrom=:priceFrom)?(&priceTo=:priceTo)?(&sortBy=:sortBy)?(&sortType=:sortType)?', (req, res) => {
    filter(req, res)
})

app.get('/api/v1/getSales/limit=:limit?&offset=:offset?&brand=:brand?&type=:type?', (req, res) => {
        getSales(req, res)
})

app.patch('/api/v1/changeCount/:id', (req, res) => {
    changeCount(req, res)
})

app.listen(port, () => {
    console.log(`The server is up on port ${port}`)
})


