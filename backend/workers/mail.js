require('dotenv').config()
const kue = require('kue')
const Consola = require('consola')

const queue = kue.createQueue({
    redis: process.env.REDIS_CONNECTION
})

queue.process('mails', (job, done) => {
    Consola.success(`Admin has been notified that the event ${job.data.title} has been ${job.data.type}`)

    done()
})
