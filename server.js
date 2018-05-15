const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./mongoose/config')
const {addGoods} = require('./functionality/addGoods')
const {getAllGoods} = require('./functionality/getAllGoods')
const {changeCount} = require('./functionality/changeCount')


let port = process.env.PORT || 3000;
let app = express();
app.use(bodyParser.json());

app.post('/api/addGoods', (req, res) => {
    addGoods(req, res)
})


app.get('/api/getAllGoods', (req, res) => {
    getAllGoods(req, res)
})

app.patch('/api/changeCount/:id', (req, res) => {
    changeCount(req, res)
})


app.listen(port, () => {
    console.log(`The server is up on port ${port}`)
})


