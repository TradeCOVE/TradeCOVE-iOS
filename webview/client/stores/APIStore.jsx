import API from '../API';

export default class APIStore extends API {
  getUsers() {
    return this.fetch(`/user`)
      .then((res) => res.data)
  }
  getUserData(id) {
    return this.fetch(`/user/${id}`)
      .then((res) => res.data)
  }
  editUser(id, data) {
    return this.fetch(`/user/${id}`, {
      method: 'PUT',
      body: data
    })
  }
  subscribe(data) {
    return this.fetch(`/action/subscribe`, {
      method: 'POST',
      body: data
    })
    .then((res) => res.data)
  }
  searchPostsOnFeed(query) {
    return this.fetch(`/offer?search=${query}`)
      .then((res) => res.data)
  }
  unsubscribe(data) {
    return this.fetch(`/action/unsubscribe`, {
      method: 'POST',
      body: data
    })
    .then((res) => res.data)
  }
  acceptFriend(data) {
    return this.fetch(`/action/friendship/accept`, {
      method: 'POST',
      body: data
    })
    .then((res) => res.data)
  }
  rejectFriend(data) {
    return this.fetch(`/action/friendship/reject`, {
      method: 'POST',
      body: data
    })
    .then((res) => res.data)
  }
  createNewTrade(data) {
    return this.fetch(`/trade`, {
      method: 'POST',
      body: data
    })
      .then((res) => res.data)
  }
  acceptTrade(id, userId, body) {
      return this.fetch(`/trade/${id}/accept?userId=${userId}`, {
        method: 'POST',
        body
      })
      .then((res) => res.data)
  }
  getSafespots(id) {
    return this.fetch(`/safespot/search?userId=${id}`)
      .then((res) => res.data)
  }
  rejectTrade(id, userId) {
      return this.fetch(`/trade/${id}/reject?userId=${userId}`)
        .then((res) => res.data)
  }
  getMessageRooms(data) {
    return this.fetch(`/message/room`, {
      method: 'POST',
      body: data
    })
    .then((res) => res.data)
  }
  blockUser(data) {
    return this.fetch(`/action/block`, {
      method: 'POST',
      body: data
    })
    .then((res) => res.data)
  }
  unblockUser(data) {
    return this.fetch(`/action/unblock`, {
      method: 'POST',
      body: data
    })
    .then((res) => res.data)
  }
  getFollowers(id) {
    return this.fetch(`/user/${id}/followers`)
      .then((res) => res.data)
  }
  getInterests() {
    return this.fetch(`/interest`)
      .then((res) => res.data)
  }
  getTradesSent(id) {
    return this.fetch(`/trade/sent?userId=${id}`)
      .then((res) => res.data)
  }
  getTradesRecieved(id) {
    return this.fetch(`/trade/recieved?userId=${id}`)
      .then((res) => res.data)
  }
  getTradesCompleted(id) {
    return this.fetch(`/trade?userId=${id}&status=COMPLETED,EXPIRED,ACCEPTED`)
      .then((res) => res.data)
  }
  getTrade(id) {
    return this.fetch(`/trade/${id}`)
      .then((res) => res.data)
  }
  getFeedLocation(data) {
    return this.fetch(`/newsfeed/location`, {
      method: 'POST',
      body: data
    }).then((res) => res.data)
  }
  getFeedInterests(data) {
    return this.fetch(`/newsfeed/interests`, {
      method: 'POST',
      body: data
    }).then((res) => res.data)
  }
  getFeedFriends(data) {
    return this.fetch(`/newsfeed/friends`, {
      method: 'POST',
      body: data
    }).then((res) => res.data)
  }
  getMessages(id, userId) {
    return this.fetch(`/message/room/${id}`, {
      method: 'POST',
      body: { id, userId }
    }).then((res) => res.data)
  }
  sendMessage(data) {
    return this.fetch(`/action/message`, {
      method: 'POST',
      body: data
    }).then((res) => res.data)
  }
  deleteFavorite(id) {
    return this.fetch(`/safespot/${id}`, {
      method: 'DELETE'
    })
  }
  addFavorite(placeId, userId) {
    return this.fetch(`/safespot?userId=${userId}&placeId=${placeId}`)
  }
  getDiscover(userId) {
    return this.fetch(`/user/discover?userId=${userId}`)
      .then((res) => res.data)
  }
  reportOffer(data) {
    return this.fetch(`/report/offer`, {
      method: 'POST',
      body: data
    }).then((res) => res.data)
  }
  getUserInterests(id) {
    return this.fetch(`/interest/${id}`)
      .then((res) => ({ id: res.data._id, title: res.data.title }))
  }
  getUserOffers(id) {
    return this.fetch(`/user/${id}/offers`)
      .then((res) => res.data)
  }
  getCategories() {
    return this.fetch(`/category`)
      .then((res) => res.data)
  }
  getCategoryId(id) {
    return this.fetch(`/category/${id}`)
      .then((res) => res.data)
  }
  getOffer(id) {
    return this.fetch(`/offer/${id}`)
    .then((res) => res.data)
  }
  removeOffer(id) {
    return this.fetch(`/offer/${id}`, { method: 'DELETE' })
  }
  editOffer(id, data) {
    return this.fetch(`/offer/${id}`, {
      method: 'PUT',
      body: data
    })
  }
  setTradeCompleted(id, userId) {
    return this.fetch(`/trade/${id}/complete?userId=${userId}`)
  }
  setOffer(data) {
    return this.fetch(`/offer`, {
      method: 'POST',
      body: data
    })
  }
}
