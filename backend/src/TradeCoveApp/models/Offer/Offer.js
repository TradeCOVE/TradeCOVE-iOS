export function getSchema(ctx) {
  const mongoose = ctx.db
  const conditions = ['New', 'Used'];
  const {e404, e500} = ctx.errors
  const schema = new mongoose.Schema({
    userId: {
      type: String
    },
    title: {
      type: String
    },
    // Категория
    categoryId: {
      type: String
    },
    // Описание
    description: {
      type: String
    },
    //
    condition: {
      type: String,
      enum: conditions,
      default: 'New'
    },
    status: {
      type: String,
      enum: [
        'ACTIVE', 'CHECK', 'INACTIVE'
      ],
      // ВИДЯТ ВСЕ, НА ПРОВЕРКЕ, НЕ АКТИВНЫЙ
      default: 'ACTIVE'
    },
    // Картинки
    images: [
      {
        type: String
      }
    ]
  }, {timestamps: true})

  schema.statics.getConditions = () => {
    return conditions
  }
  // Добавить новый Offer
  // В параметрах должен передаваться userId
  schema.statics.add = function(params) {
    const {User, Offer} = ctx.models
    const userId = params.userId
    if (!userId)
      throw e404('userId is not found')

    const user = User.findById(userId)
    if (!user)
      throw e404(`user with id = ${userId} is not found`)

    let offer = new Offer(params)

    return offer.save()
  }

  // Удалить OFFER
  schema.statics.remove = function(offerId) {
    if(!offerId) throw e404('offerId is not found')

    const offer = this.findById(offerId)
    if(!offer) throw e404(`offer with id = ${offerId} is not found`)

    return this.remove(offerId)
  }

  schema.statics.findByCategoryId = async function(categoryId) {
    const {Category} = ctx.models

    const category = await Category.check(categoryId)

    return this.find({categoryId})
  }
  // ПРОВЕРИТЬ СУЩЕСТВУЕТ ЛИ OFFER
  schema.statics.check = async function(offerId) {
    if (!offerId)
      throw e404('offerId is not found')

    const offer = await this.findById(offerId)
    if (!offer)
      throw e404(`offer with id = ${offerId} not found!`)
    return offer
  }

  return schema
}

export default(ctx) => {
  return ctx.db.model('Offer', getSchema(ctx), 'offer')
}
