import _ from 'lodash'
import fs from 'fs'

export function getSchema(ctx) {
  const mongoose = ctx.db
  const {e404, e500} = ctx.errors
  const schema = new mongoose.Schema({

    title: {
      type: String
    }

  }, {timestamps: true})

  schema.statics._create = async function(title) {
    return this.create({title})
  }

  schema.statics.check = async function(categoryId) {
    if (!categoryId)
      throw e404('categoryId is not found')

    const category = await this.findById(categoryId)
    if (!category)
      throw e404(`category with id = ${categoryId} not found!`)
    return category
  }

  return schema
}

export default(ctx) => {
  return ctx.db.model('Category', getSchema(ctx), 'category')
}
