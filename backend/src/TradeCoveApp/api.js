import asyncRouter from 'lego-starter-kit/utils/AsyncRouter';
import getDocs from './getDocs';

export default (ctx, params) => {
  const api = asyncRouter()
  const {
    Interest,
    Category,
    Offer,
    User,
    Trade,
    Message,
    Safespot,
  } = ctx.models
  const { e400, e404, e500 } = ctx.errors




  // function interestCheck(data) {
  //   if (!data) throw e404('Interest not found')
  //   return Promise.resolve(data)
  // }
  // function categoryCheck(data) {
  //   if (!data) throw e404('Category not found')
  //   return Promise.resolve(data)
  // }
  const docsParams = Object.assign({}, params, {
    docs: `${params.basePath}/docs`,
    docsJson: `${params.basePath}/docs/json`,
  })
  const swaggerJson = getDocs(ctx, params)
  api.all('/', (req, res) => res.ok({ title: 'api', version: 1, docs: docsParams.docs , docsJson: docsParams.docsJson }))
  api.use('/docs', ctx.getDocsRouter(swaggerJson, docsParams))
  // api.use('/auth', () => {
  //   throw new Error("TEST@@@")
  // })
  // api.use('/auth', api2)
  // api.all('/auth/login',  async () => {
  //   console.log(111);
  //   await Interest.find()
  //   console.log(222);
  // },  async () => {
  //   console.log(333);
  //   const ret = await Interest.find()
  //   console.log(4444);
  //   return ret
  // })
  api.all('/auth/verify', ctx.resourses.Auth.validate)
  api.all('/auth/login', ctx.resourses.Auth.login)
  api.all('/auth/signup', ctx.resourses.Auth.signup)
  api.all('/auth/recovery', ctx.resourses.Auth.recovery)

  // НЕ ХУЙНЯ
  // GET
  // INTEREST
  api.get('/interest', async() => {
    return Interest.find()
  })
  // INTEREST BY ID
  api.get('/interest/:id', async(req) => {
    return Interest.check(req.params.id)
  })
  // CATEGORY
  api.get('/category', async() => {
    return Category.find();
  })
  // CATEGORY BY ID
  api.get('/category/:id', async(req) => {
    return Category.check(req.params.id)
  })
  // OFFER
  api.get('/offer', async() => {
    return Offer.find();
  })
  // OFFER BY ID
  api.get('/offer/:id', async(req) => {
    return Offer.check(req.params.id)
  })
  // OFFER BY CATEGORY
  api.get('/offer/category/:id', async(req) => {
    return Offer.findByCategoryId(req.params.id)
  })
  // TRADE
  api.get('/trade', async() => {
    return Trade.find();
  })
  // TRADE BY ID
  api.get('/trade/:id', async(req) => {
    return Trade.check(req.params.id)
  })
  // USER
  api.get('/user', async() => {
    return User.find()
  })
  // USER BY ID
  api.get('/user/:id', async(req) => {
    const userId = req.allParams().id
    return User.check(userId)
  })
  // FOLLOWERS OF USER
  api.get('/user/:id/followers', async(req) => {
    const id = req.allParams().id
    return User.getFollowers(id)
  })
  // FRIENDS OF USER
  api.get('/user/:id/friends', async(req) => {
    const id = req.allParams().id

    return User.getFriends(id)
  })
  // OFFERS OF USER
  api.get('/user/:id/offers', async(req) => {
    const id = req.allParams().id
    return User.getOffers(id)
  })
  // MESSAGES OF USER
  api.get('/user/:id/messages', async(req) => {
    const {
      id,
      count = -1,
    } = req.allParams()
    return Message.getUserMessages(id, count)
  })
  // MESSAGE
  api.get('/message', async() => {
    return Message.find()
  })
  // MESSAGE BY ID
  api.get('/message/:id', async(req) => {
    return Message.check(req.params.id)
  })
  // SAFESPOT
  api.get('/safespot', async() => {
    return Safespot.find()
  })
  // SAFESPOT BY ID
  api.get('/safespot/:id', async(req) => {
    return Safespot.check(req.params.id)
  })

  // POST
  // INTEREST
  // ДОБАВИТЬ ИНТЕРЕС
  api.post('/interest', async(req) => {
    // ДОБАВЬ ТУТ ПРОВЕРКУ НА РОЛИ
    const params = req.allParams()
    if (!params.title) {
      return e500('Interest title is not found')
    }
    const interest = new Interest(params)

    return interest.save()
  })
  // CATEGORY
  // ДОБАВИТЬ КАТЕГОРИЮ
  api.post('/category', async(req) => {
    // ДОБАВЬ ТУТ ПРОВЕРКУ НА РОЛИ
    const params = req.allParams()
    if (!params.title) {
      return e500('Category title is not found')
    }
    const category = new Category(params)

    return category.save()
  })
  // USER
  // ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ
  api.post('/user', async(req) => {
    console.log(req.allParams());
    const user = new User(req.allParams());
    return user.save()
  })
  // OFFERS
  // ДОБАВИТЬ ОФФЕР
  api.post('/offer', async(req) => { // Обязательно передать userId
    const params = req.allParams()
    const { userId } = params
    if (!userId) {
      throw e404('userId is not found')
    }
    return Offer.add(params)
  })
  // TRADE
  // ДОБАВИТЬ TRADE
  api.post('/trade', async(req) => { // Обязательно передать userId
    const params = req.allParams()
    return Trade.add(params)
  })
  // SAFESPOT
  api.post('/safespot', async(req) => { // Обязательно передать userId
    const params = req.allParams()
    if (!params.title) {
      throw e404('safespot title is not found')
    }
    return Safespot.create(params)
  })
  // PUT
  // OFFER
  // ИЗМЕНИТЬ КАТЕГОРИЮ
  api.put('/offer/:id', async(req) => {
    const params = req.allParams()
    const {id} = params
    return Offer.findByIdAndUpdate(id, params, {new:true})
  })
  // USER
  // ИЗМЕНИТЬ ЮЗЕРА
  api.put('/user/:id', async(req) => {
    const params = req.allParams()
    const {id} = params
    return User.findByIdAndUpdate(id, params, {new:true})
  })
  // INTEREST
  // ИЗМЕНИТЬ ИНТЕРЕС
  api.put('/interest/:id', async(req) => {
    const params = req.allParams()
    const {id} = params
    return Interest.findByIdAndUpdate(id, params, {new:true})
  })
  // CATEGORY
  // ИЗМЕНИТЬ КАТЕГОРИЮ
  api.put('/category/:id', async(req) => {
    const params = req.allParams()
    const {id} = params
    return Category.findByIdAndUpdate(id, params, {new:true})
  })
  // TRADE
  // ИЗМЕНИТЬ TRADE
  api.put('/trade/:id', async(req) => {
    const params = req.allParams()
    const {id} = params
    return Trade.findByIdAndUpdate(id, params, {new:true})
  })
  // SAFESPOT
  // ИЗМЕНИТЬ SAFESPOT
  api.put('/safespot/:id', async(req) => {
    const params = req.allParams()
    const {id} = params
    return Safespot.findByIdAndUpdate(id, params, {new:true})
  })

  // DELETE
  // INTEREST
  // DELETE INTEREST BY ID
  api.delete('/interest/:id', async(req) => {
    return Interest.findByIdAndRemove(req.params.id);
  })
  // CATEGORY
  // DELETE CATEGORY BY ID
  api.delete('/category/:id', async(req) => {
    return Category.findByIdAndRemove(req.params.id);
  })
  // OFFER
  // DELETE OFFER BY ID
  api.delete('/offer/:id', async(req) => {
    return Offer.findByIdAndRemove(req.params.id)
  })
  // TRADE
  // DELETE TRADE BY ID
  api.delete('/trade/:id', async(req) => {
    return Trade.findByIdAndRemove(req.params.id)
  })
  // SAFESPOT
  // DELETE SAFESPOT BY ID
  api.delete('/safespot/:id', async(req) => {
    return Safespot.findByIdAndRemove(req.params.id)
  })
  // MESSAGE
  // DELETE MESSAGE BY ID
  api.delete('/message/:id', async(req) => {
    return Message.findByIdAndRemove(req.params.id)
  })

  // ALL
  // ACTION
  // SUBSCRIBE USER TO ANOTHER USER
  api.all('/action/subscribe', async(req) => {
    const params = req.allParams()
    const {userId, requestUserId} = params
    // userId - кого подписываем
    // requestUserId - на кого подписываем
    return User.subscribe(userId, requestUserId);
  })
  // UNSUBSCRIBE USER FROM ANOTHER USER
  api.all('/action/unsubscribe', async(req) => {
    const params = req.allParams()
    const {userId, requestUserId} = params
    // userId - кого отписываем
    // requestUserId - от кого отписываем
    return User.unsubscribe(userId, requestUserId);
  })
  // SEND MESSAGE TO ANOTHER USER
  api.all('/action/message', async(req) => {
    // Должны быть userIdTo, userIdFrom, text
    const params = req.allParams()
    return Message.send(params)
  })

  // ТЕСТЫ
  api.all('/test', async(req) => {
    const params = {
      userIdFrom: '57c59a172c39125446e9f438',
      userIdTo: '57c59a102c39125446e9f437',
      text: 'Hello Nigga!'
    }
    return Message.send(params)
  })


  api.all('*', (req) => {
    throw ctx.errors.e404('Api method not found')
  })

  return api;
}
