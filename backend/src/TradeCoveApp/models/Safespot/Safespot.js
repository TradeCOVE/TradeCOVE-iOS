export function getSchema(ctx) {
  const mongoose = ctx.db
  const {e400, e404, e500} = ctx.errors
  const schema = new mongoose.Schema({
    title: {
      type: String
    },
    address: {
      type: String
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  }, {timestamps: true})

  schema.statics.check = async function(safespotId) {
    if(!safespotId)
      throw e404('safespotId is not found')
    const safespot = await this.findById(safespotId)
    if(!safespot)
      throw e404(`safespot with id = ${safespotId} is not found`)
    return safespot
  }

  return schema
}

export default(ctx) => {
  return ctx.db.model('Safespot', getSchema(ctx), 'safespot')
}
