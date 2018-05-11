const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./mongoose/config')

let port = process.env.PORT || 3000;
let app = express();
app.use(bodyParser.json());




app.listen(port, () => {
    console.log(`The server is up on port ${port}`)
})