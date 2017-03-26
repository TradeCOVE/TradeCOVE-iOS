export default function () {
  return {
    Category: require('./Category').default(...arguments),
    Interest: require('./Interest').default(...arguments),
    Message: require('./Message').default(...arguments),
    Offer: require('./Offer').default(...arguments),
    Safespot: require('./Safespot').default(...arguments),
    User: require('./User').default(...arguments),
    Trade: require('./Trade').default(...arguments),
  }
}
