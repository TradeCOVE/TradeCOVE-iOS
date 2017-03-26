export function getSchema(ctx) {
  const mongoose = ctx.db

  const schema = new mongoose.Schema({
    title: {
      type: String,
      unique: true,
    },
  }, {
    timestamps: true,
  })

  schema.statics._create = async function(title) { // eslint-disable-line
    return this.create({ title })
  }

  schema.statics.check = async function(interestId) { // eslint-disable-line
    if (!interestId) ctx.errors.e404('interestId is not found')
    const interest = await this.findById(interestId)
    if (!interest) throw ctx.errors.e404(`interest with id = ${interestId} is not found!`)
    return interest
  }

  return schema;
}

export default (ctx) => { // eslint-disable-line
  return ctx.db.model('Interest', getSchema(ctx), 'interest')
}
