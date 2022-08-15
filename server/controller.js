const characters = require('./db.json')
const userData = require('./userData.json')

module.exports = {
    getCharacters: (req,res) => {
        res.sendFile(path.join(__dirname, '../client/index.js'))
    },

    postUser: (req,res) => {
        console.log('POST USER ENDPOINT TOUCHDOWN!')
        console.log(req.body)
        userData.push(req.body) // i store my user in my database

        dataResponse = (userData[userData.length -1])
        console.log(dataResponse.username)
        res.status(200).send(dataResponse.username)
    }

  
}