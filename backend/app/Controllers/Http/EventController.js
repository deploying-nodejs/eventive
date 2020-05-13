'use strict'

const Env = use('Env')
const kue = require('kue')
const Event = use('App/Models/Event')

const MailQueueWorker = kue.createQueue({
  redis: Env.get('REDIS_CONNECTION_URL')
})

class EventController {
  /**
   * Handle the request to get all events
   */
  async index ({ response }) {
    const events = await Event.all()

    return response.status(200).json({ events })
  }
  /**
   * Handle the request to create an event.
   */
  async store ({ request, response }) {
    const {
      title,
      start_date,
      end_date,
      location,
      price
    } = request.all()

    const event = await Event.create({
      title,
      start_date,
      end_date,
      location,
      price
    })

    MailQueueWorker.create('mails', {
      type: 'created',
      title
    }).save()

    return response.status(201).json({ event })
  }

  /**
   * Handle the request to delete an event
   */
  async delete ({  params, response }) {
    const event = await Event.find(params.id)

    MailQueueWorker.create('mails', {
      type: 'deleted',
      title: event.title
    }).save()

    await event.delete()

    return response.status(200).json({
      message: 'Event deleted successfully.'
    })
  }
}

module.exports = EventController
