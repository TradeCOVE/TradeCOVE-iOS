import { getSchema as getUserSchema } from 'lego-starter-kit/CoreApp/models/User'

export function getSchema(ctx) {

  // const mongoose = ctx.db
  const {e404, e500} = ctx.errors
  const userSchema = getUserSchema(ctx)
  console.log('userSchema', userSchema);
  const schema = userSchema.extend({

    //username
    //firstName
    //lastName
    //password
    //gender
    //email
    //blockedUsersId
    //public true/false
    //lastLoginAt - Дата
    //interestIds
    //followUserIds
    //avatar

    //about
    //rating
    //location

    //getters:
    //friends - Друзья
    //followers - ПОдписчики
    //followings - на кого подписан
    //offers

    username: {
      type: String,
      unique: true
    },



    firstName: {
      type: String
    },

    lastName: {
      type: String
    },

    gender: {
      type: String,
      enum: ['male', 'female']
    },

    email: {
      type: String,
      unique: true
    },

    requestUserIds: [
      {
        type: String
      }
    ],
    blockedUsersId: [
      {
        type: String
      }
    ],

    avatar: {
      type: String // URL
    },

    about: {
      type: String
    },

    lastLoginAt: {
      type: Date
    },

    interestIds: [
      {
        type: String
      }
    ],

    location: {
      type: String
    },

    rating: {
      type: Number
    }

  }, {timestamps: true})

  console.log('schema.methods', schema.methods);
  // МЕТОДЫ ОБЪЕКТОВ
  // ДРУЗЬЯ ЮЗЕРА
  schema.methods.getFriends = async function() {
    const User = ctx.models.User
    const myId = this._id
    return User.find({
      '_id': {
        $in: this.requestUserIds
      }
    }).where('requestUserIds'). in([myId])
  }
  // ПОДПИСЧИКИ ЮЗЕРА
  schema.methods.getFollowers = async function() {
    const User = ctx.models.User
    const myId = this._id
    return User.find({
      requestUserIds: {
        $in: [myId]
      }
    })
  }
  // ПОДПИСАТЬ ЮЗЕРА НА ДРУГОГО ЮЗЕРА
  schema.methods.subscribe = async function(requestUserId) {
    const User = ctx.models.User
    const myId = this._id

    const requestUser = await User.findById(requestUserId)
    if (!requestUser)
      throw ctx.errors.e404(`requestUser with id = ${requestUserId}is not found!`)

    if (this.requestUserIds.indexOf(requestUserId) === -1) {
      this.requestUserIds.push(requestUserId)
      return this.save()
    }
    return this
  }
  // ОТПИСАТЬ ЮЗЕРА ОТ ДРУГОГО ЮЗЕРА
  schema.methods.unsubscribe = async function(requestUserId) {
    const User = ctx.models.User
    const myId = this._id

    if (this.requestUserIds.indexOf(requestUserId) !== -1) {
      this.requestUserIds = this.requestUserIds.filter((id) => id != requestUserId)
      return this.save()
    }
    return this
  }
  // OFFERS ЮЗЕРА
  schema.methods.getOffers = async function() {
    const myId = this._id
    const Offer = ctx.models.Offer

    return Offer.find({userId: myId})
  }
  // ДОБАВИТЬ ИНТЕРЕС К ЮЗЕРУ
  schema.methods.addInterest = async function(interestId) {
    const Interest = ctx.models.Interest
    const interest = Interest.check(interestId)

    if (this.interestIds.indexOf(interest.id) === -1) {
      user.interestIds.push(interest.id)
      return this.save()
    }

    return this
  }

  // СТАТИЧЕСКИЕ МЕТОДЫ
  // НАЙТИ ДРУЗЕЙ
  schema.statics.check = async function(userId) {
    if (!userId)
      throw e404('userId is not found')

    const user = await this.findById(userId)
    if (!user)
      throw e404(`user with id = ${userId} not found!`)
    return user
  }
  schema.statics.getFriends = async function(userId) {
    const User = ctx.models.User
    if (!userId)
      throw e404('userId is not found')

    const user = await User.findById(userId)
    if (!user)
      throw e404(`user with id = ${userId} not found!`)

    return user.getFriends()
  }
  // НАЙТИ ПОДПИСЧИКОВ
  schema.statics.getFollowers = async function(userId) {
    const User = ctx.models.User
    if (!userId)
      throw e404('userId is not found')

    const user = await User.findById(userId)
    if (!user)
      throw e404(`user with id = ${userId} not found!`)

    return user.getFollowers()
  }
  // ПОДПИСАТЬ ЮЗЕРА НА ДРУГОГО ЮЗЕРА
  schema.statics.subscribe = async function(userId, requestUserId) {
    if (!userId)
      throw e404('userId is not found')
    const user = await this.findById(userId)
    if (!user)
      throw ctx.errors.e404(`user with id = ${userId} is not found!`)

    return user.subscribe(requestUserId)
  }
  // ОТПИСАТЬ ЮЗЕРА ОТ ДРУГОГО ЮЗЕРА
  schema.statics.unsubscribe = async function(userId, requestUserId) {
    if (!userId)
      throw e404('userId is not found')
    const user = await this.findById(userId)
    if (!user)
      throw ctx.errors.e404(`user with id = ${userId} is not found!`)

    return user.unsubscribe(requestUserId)
  }
  // НАЙТИ OFFERS ЮЗЕРА
  schema.statics.getOffers = async function(userId) {
    if (!userId)
      throw e404('userId is not found')
    const user = await this.findById(userId)
    if (!user)
      throw ctx.errors.e404(`user with id = ${userId} is not found!`)

    return user.getOffers()
  }

  // ДОБАВИТЬ ИНТЕРЕС ЮЗЕРУ
  schema.statics.addInterest = async function(userId, interestId) {
    const user = await this.check(userId)

    return user.addInterest(interestId)
  }

  return schema
}


export default (ctx) => {
  const schema = getSchema(ctx);
  console.log('schema', schema);
  return ctx.db.model(schema.generateMongooseName('User'), schema.getMongooseSchema())
}
// export default(ctx) => {
//
//   return ctx.db.model('UserOveride', getSchema(ctx), 'user')
// }
