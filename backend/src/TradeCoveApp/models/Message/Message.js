export function getSchema(ctx) {
  const mongoose = ctx.db
  const {e400, e404, e500} = ctx.errors
  const schema = new mongoose.Schema({
    // От кого
    userIdFrom: {
      type: String
    },
    // Кому
    userIdTo: {
      type: String
    },
    // Состояние/Прочитано или нет
    status: {
      type: String,
      enum: ['READ', 'UNREAD']
    },
    // Текст сообщения
    text: {
      type: String
    },
    // Приложения к сообщению

  }, {timestamps: true})

  schema.statics.check = async function(messageId) {
    if (!messageId)
      throw e404('messageId is not found')
    const message = await this.findById(messageId)
    if (!message)
      throw e404(`message with id = ${messageId} is not found`)
    return message
  }
  // Найти все сообщениия от юзера
  schema.statics.getMessagesFromUser = async function(userId, count = -1) {
    return this.find({userIdFrom: userId}).sort('createdAt').limit(count)
  }
  // Найти все сообщения к этому юзеру
  schema.statics.getMessagesToUser = async function(userId, count = -1) {
    return this.find({userIdTo: userId}).sort('createdAt').limit(count)
  }
  // Найти все сообщения пользователей
  schema.statics.getUserMessages = async function(userId, count = -1) {
    return this.find({
      $or:[
        {
          userIdFrom: userId,
        },
        {
          userIdTo: userId
        }
      ]
    }).sort('createdAt').limit(20)
  }

  schema.statics.send = async function(params) {
    const {userIdFrom, userIdTo, text} = params
    const {User} = ctx.models
    if (!userIdFrom)
      throw e404('userIdFrom is not found')
    if (!userIdTo)
      throw e404('userIdTo is not found')
    if (!text)
      throw e404('text of message is not found')

    await User.check(userIdFrom)
    await User.check(userIdTo)

    const message = new this(params)
    return message.save()
  }

  return schema
}

export default(ctx) => {
  return ctx.db.model('Message', getSchema(ctx), 'message')
}
