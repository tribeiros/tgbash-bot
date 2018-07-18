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
  let apiTelegram = 'https://api.telegram.org'
  let botTelegram = '674388769:AAEOvWFcAA8C-8X-vkNKyGHkp-1B2j0KMbs' //test
  let { message } = req.body
  //let command = shell.exec(message.text)
  
  // function to check bash on argument
  function checkBash(param) {
    if (param.indexOf('bash') == 0){
      checkedBash = "bash is not allowed, use this session dude"
    } else if (param.indexOf('exit') == 0){
      checkedBash = "exit is not allowed, use this session dude"
    } else if (param.indexOf('/') == 0){
      checkedBash = "/ is not allowed"
    } else if (param == 'cat'){
      checkedBash = "just cat do nothing here"
    } else if (param == 'echo'){
      checkedBash = "echo what ?"
    } else {
      checkedBash = shell.exec(message.text, {silent:true}).stdout
    }
    return checkedBash
  }

  //function result
  const command = checkBash(message.text)

//stdout
//console.log(command);

  axios
    .post(
      `${apiTelegram}/bot${botTelegram}/sendMessage`,
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