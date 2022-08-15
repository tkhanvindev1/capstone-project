const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
const path = require('path');
require('dotenv').config();
app.use('/', express.static(path.join(__dirname , '../client')))


const { getCharacters, postUser } = require('./controller')

app.get(`/api/characters`, getCharacters)
app.post(`/api/user`, postUser)

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`running on 4000`))
