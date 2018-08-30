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
  const apiTelegram = 'https://api.telegram.org'
  const botTelegram = '651384060:AAEjQsDqPMW8MvgZpOIe9f17OVv9N4gHOuY' //tribeirosanycodeBot
  var { message } = req.body
  console.log(message.text)
  if (message.text === undefined || message.text === "/"){
    message.text = "bot do telegram mandou mais um '/'"
  }

  message.text = message.text.replace(/\//, "")
  var botCommands = message.text.split(" ");
  //var redirect = botCommands.indexOf(">")
  //console.log(redirect)
  console.log(botCommands)
  console.log(`command: ${botCommands}`)

// function to check bash on argument
function checkCommand(param) {
  var containString = false;
  var arrayForbiddenCommands = ["bash", "exit", "cat", "echo","bc","crontab","alias"];
  
  for (s=0; s < arrayForbiddenCommands.length; s++){
    if(arrayForbiddenCommands[s].toLowerCase() == param){
      containString = true
      console.log('not allowed')
      return 'not allowed';
    }
  
  if (botCommands[0] === 'clima' && botCommands[1] === undefined) {
      checkedBash = 'missing city argument'
      return checkedBash
  } 
  
  switch (botCommands[0]) {
    case 'clima':
        checkedBash = shell.echo('http://wttr.in/' + botCommands[1]).stdout
        return checkedBash

    case 'kitten':
        checkedBash = shell.echo('http://placekitten.com/g/200/300')  
        return checkedBash

    case 'start':
        checkedBash = 'Welcome to tgbash, a shell on telegram chat'
        return checkedBash

    case undefined:
        checkedBash = 'telegram api undefined post'
        return checkedBash
  }
 
  if (containString === false){
    if (shell.exec(message.text, {silent:true}).code !== 0) {
      checkedBash = shell.exec(message.text, {silent:true}).stderr
    } else {
      checkedBash = shell.exec(message.text, {silent:false}).stdout
    }
    return checkedBash
  } 
  return checkedBash
}

  //function result
  var command = checkCommand(message.text)

//stdout
//console.log(command);
  
  if (command === "" && botCommands.includes('>')){
    console.log(command)
    command = `succeeded redirection ${botCommands[1]} to ${botCommansdr[3]}`
  } else if (command === "" && botCommands.includes('rm')){
    command = `deleted ${botCommands[1]}`
  }
  
  axios
    .post(
      `${apiTelegram}/bot${botTelegram}/sendMessage`,
      {
        chat_id: message.chat.id,
        text: command
      }
    )
    .then(response => {
      console.log('>>> Message posted on telegram chat')
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
