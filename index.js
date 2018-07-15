const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const shell = require('shelljs')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.post('/new-message', function(req, res) {
  const { message } = req.body
  const command = shell.exec(message.text)

  axios
    .post(
      'https://api.telegram.org/bot646348371:AAFkySfvz9zpLD52mmserFlhB2IJ-N_S1Cg/sendMessage',
      {
        chat_id: message.chat.id,
        text: command
      }
    )
    .then(response => {
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      console.log('Error :', err)
      res.end('Error :' + err)
    })
})

app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!')
})