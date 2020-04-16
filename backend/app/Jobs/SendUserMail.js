const Mail = use("Mail")
const Bull = use('Rocketseat/Bull')

class SendUserMail {
  static get key() {
    return "SendUserMail"
  }

  async handle(job) {
    const { data } = job

    await Mail.send('', data, message => {
      message
        .to(data.email)
        .from("support@eventive.io")
        .subject(`Your presence is required on the eventive platform. A user has just ${data.added ? 'added' : 'deleted'} an event.`)
    })

    return data
  }
}

module.exports = SendUserMail
