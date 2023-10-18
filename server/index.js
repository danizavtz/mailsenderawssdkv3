const router = require('express').Router();
const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2");
const config = { region: 'us-east-1' } // configure a region em que está configurado o SES
const client = new SESv2Client(config);

router.get('/', (req, res) => {
    req.servermsg = { msg: "server up and running" };
    res.status(200).json(req.servermsg);
});

router.post('/', async (req, res) => {
    const input = { // SendEmailRequest
        FromEmailAddress: "contato@danizavtz.com.br",
        ReplyToAddresses: [
          "daniellucena@yahoo.com.br",
        ],
        Destination: { // Destination
            ToAddresses: [ // EmailAddressList
              "daniellucena@yahoo.com.br",
            ]
        },
        Content: { // EmailContent
          Simple: { // Message
            Subject: { // Content
              Data: req.body.title, // required
              Charset: "UTF-8",
            },
            Body: { // Body
              Text: {
                Data: `Mensagem de: ${req.body.email}, \nMensagem: ${req.body.message}`, // required
                Charset: "UTF-8",
              }
            }
          }
        }
      };
      const command = new SendEmailCommand(input);
      try {
          const response = await client.send(command);
          res.status(200).json({ "MessageId": response.MessageId })
      } catch (err) {
          console.log(err); //esta linha não é necessária, é utilizada apenas para debug
          res.status(500).json({ errors: ['Houve um erro durante o envio'] })
      }
})
module.exports = router;