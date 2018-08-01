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
  let botTelegram = '625013581:AAHgjx7B2J_SsUooCDspohlxx-5N5hclQtw' //tribeirosCodeBot
  let { message } = req.body
  message.text = message.text.replace(/\//, "")
  var botCommands = message.text.split(" ");
  
  // function to check bash on argument
function checkCommand(param) {
  var containString = false;
  var arrayForbiddenCommands = ["bash", "exit", "cat", "echo","bc","crontab"];
  
  for (s=0; s < arrayForbiddenCommands.length; s++){
    if(arrayForbiddenCommands[s].toLowerCase() == param){
      containString = true
      return 'ops';
    }
  }

// Bot commands  
  if (botCommands[0] === 'clima') {
      checkedBash = shell.echo('http://wttr.in/' + weather[1])
      return checkedBash
  } else if (botCommands[0] === 'mafu') {
      checkedBash = shell.echo('nhacoma').stdout
      return  checkedBash
  }

  if (containString === false){
    checkedBash = shell.exec(message.text, {silent:true})
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
  console.log('tgbash api listening on port 3000!')
})