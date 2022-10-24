const express = require('express');
const app = express()

const {expressjwt:jwt} = require('express-jwt')
const account = require('./account')
const bodyParser = require('body-parser');
const secret = require('./secret.json')
const cors = require('cors');



app.use(cors());
app.use(bodyParser.json())
app.use(account)
app.use(jwt({secret: secret.value, algorithms: ['HS256']}))







app.listen(8000)
