const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./mongoose/config')
const {addGoods} = require('./functionality/addGoods')
const {filter} = require('./functionality/filter')
const {changeCount} = require('./functionality/changeCount')


let port = process.env.PORT || 3000;
let app = express();
app.use(bodyParser.json());

app.post('/api/addGoods', (req, res) => {
    addGoods(req, res)
})

app.get('/api/getGoods/limit=:limit?&offset=:offset?&brand=:brand?&type=:type?&price=:price?&popularity=:popularity?&date=:date?&name=:name?', (req, res) => {
    filter(req, res)
})

app.patch('/api/changeCount/:id', (req, res) => {
    changeCount(req, res)
})

app.listen(port, () => {
    console.log(`The server is up on port ${port}`)
})


