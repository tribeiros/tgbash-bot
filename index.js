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
  let botTelegram = '637243061:AAG3H_87c2cU0KUhmAw0y-a0FTuaNNyP2Y0' //tribeirosRegexBot
  let { message } = req.body
  message.text = message.text.replace(/\//, "")
  
  // function to check bash on argument
function checkCommand(param) {
  var containString = false;
  var arrayForbiddenCommands = ["bash", "exit", "cat", "echo","bc","crontab"];

  for (s=0; s < arrayForbiddenCommands.length; s++){
    if(arrayForbiddenCommands[s].toLowerCase() == param){
      containString = true
      return false;
    } else {
      containString = false
    }
  }

  if (containString == false){
    checkedBash = shell.exec(message.text, {silent:true}).stdout
  } 
  return checkedBash
}

  //function result
  const command = checkCommand(message.text)

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