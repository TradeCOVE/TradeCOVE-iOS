import _ from 'lodash'
import fs from 'fs'

export function getSchema(ctx) {
  const mongoose = ctx.db
  const {e400, e404, e500} = ctx.errors
  const schema = new mongoose.Schema({
    // ЧТо на что меняем
    offerFromId: {
      type: String
    },
    offerToId: {
      type: String
    },
    finishedAt: {
      type: Date
    },
    // Состояние обмена
    status: {
      type: String,
      enum: [
        'ACCEPTED', // ПРИНЯТ, ВСЕ ЮЗЕРЫ ЕГО ВИДЯТ
        'DECLINED', // ОТМЕНЕН, ЮЗЕРЫ ЕГО НЕ ВИДЯТ
        'REVIEW', // НА РАССМОТРЕНИИ
        'COMPLETED', // ЗАВЕРШЕН
        'PROGRESS' // В ПРОГРЕССЕ,
      ],
      default:'ACCEPTED'
    }

  }, {timestamps: true})

  // METHODS
  schema.methods.complete = async function(){
    this.status = 'COMPLETED'
    return this.save()
  }

  // STATICS
  schema.statics.check = async function(tradeId) {
    if (!tradeId)
      throw e404('tradeId is not found')

    const trade = await this.findById(tradeId)
    if (!trade)
      throw e404(`trade with id = ${tradeId} not found!`)
    return trade
  }
  schema.statics.findByOffers = async function(offerFromId, offerToId) {
    if (!offerFromId)
      throw e404('offerFromId is not found')
    if (!offerToId)
      throw e404('offerToId is not found')
    return this.find({offerFromId, offerToId})
  }
  // СОЗДАТЬ НОВЫЙ TRADE
  schema.statics.add = async function(params) {
    const {offerFromId, offerToId} = params
    const {Offer, Trade} = ctx.models
    if (!offerFromId) throw e404('offerFromId is not found')
    if (!offerToId) throw e404('offerToId is not found')
    // Проверяем существуют ли такие Offer'ы
    const offerFrom = Offer.check(offerFromId)
    const offerTo = Offer.check(offerToId)
    // Если пользователь попытался обменяться сам с собой, хитрый
    if(offerFrom.userId == offerTo.userId) e400(`offerFrom user it's offerTo user`)
    //Если такой обмен уже есть
    //console.log((await this.findByOffers(offerFromId, offerToId)).length, 'УЖЕ ЕСТЬ');
    if((await this.findByOffers(offerFromId, offerToId)).length > 0)
      throw e400('Такой trade уже существует')
    // Задаем дату окончания
    // пока 2 дня
    let finishedAt = new Date();
    finishedAt.setDate(finishedAt.getDate() + 2);

    const trade = new Trade({offerToId, offerFromId, finishedAt})
    return trade.save()
  }

  return schema
}

export default(ctx) => {
  return ctx.db.model('Trade', getSchema(ctx), 'trade')
}
