
// import _ from 'lodash'

export default class Api{
  constructor(params){
    this.base = params.base
    this.prefix = params.prefix

    if(params.auth){
      this.setAuth(params.auth)
    }

    if(params.user){
      this.user = params.user
    }
    if(params.token){
      this.authToken = params.token
    }
  }

  setAuth(authParams){
    return this.authPromise = this.authLogin(authParams)
    .then(data => {
      this.user = data.user
      this.authToken = data.token
    })
  }

  authLogin(data){
    return this.fetch('auth/login', {
      method: 'POST',
      body: data
    })
  }

  setCoordinates(data = {}) {
    // if (!data.userId) data.userId = this.user && this.user ._id
    return this.fetch('user/coordinates', {
      method: 'POST',
      body: data
    })
  }


  authRecovery(data){
    return this.fetch('auth/recovery', {
      method: 'POST',
      body: data
    })
  }

  authSignup(data){
    return this.fetch('auth/signup', {
      method: 'POST',
      body: data
    })
  }

  authValidate(data){
    return this.fetch('auth/validate', {
      prefix: '',
      method: 'GET',
      body: data
    })
  }


  _postProcessor(post) {
    const userId = this.user && this.user._id
    if (!userId) return post
    post.likedByYou = post.likesBy.indexOf(userId) !== -1
    return post
  }
  _postProcessors(posts) {
    return posts.map(this._postProcessor.bind(this))
  }

  postList(query){
    return this
    .authFetch('post')
    .then(this._postProcessors.bind(this))
  }

  postCreate(data){
    return this.authFetch('post', {
      method: 'POST',
      body: data
    })
    .then(this._postProcessor.bind(this))
  }

  postUpdate(postId, data){
    return this.authFetch('post/' + postId, {
      method: 'PUT',
      body: data
    })
    .then(this._postProcessor.bind(this))
  }

  pollList(query){
    return this
    .authFetch('poll')
    // .then(this._postProcessors.bind(this))
  }

  pollCreate(data){
    return this.authFetch('poll', {
      method: 'POST',
      body: data
    })
    // .then(this._postProcessor.bind(this))
  }

  pollUpdate(postId, data){
    return this.authFetch('poll/' + postId, {
      method: 'PUT',
      body: data
    })
    // .then(this._postProcessor.bind(this))
  }
  pollVote(pollId, optionId){
    return this.authFetch('poll/' + pollId + '/vote/' + optionId)
    // .then(this._postProcessor.bind(this))
  }
  pollUpdateVoteTime(postId, time){
    const offset = 10000;
    const startedAt = Date.now() + offset
    const finishedAt = startedAt + time

    return this.pollUpdate(postId, {
       startedAt,
       finishedAt
    })

  }

  pollDelete(postId){
    return this.authFetch('poll/' + postId, {
      method: 'DELETE',
    })
  }

  postLike(postId, action = 'add'){
    return this
    .authFetch(`post/${postId}/like/${action}`)
    .then(this._postProcessor.bind(this))
  }

  getScreen(){
    return this.authFetch('screen')
  }

  setScreen(data){
    return this.authFetch('screen', {
      method: 'PUT',
      body: data
    })
  }



  authFetch(...args) {
    return this.authPromise.then(() =>{
      return this.fetch(...args)
    })
  }

  fetch(path, options = {}) {
    const prefix = options.prefix || this.prefix
    let url
    if (path.substr(0, 5) === 'http:' || path.substr(0, 6) === 'https:'){
      url = path
    } else {
      if (path[0] === '/') {
        url = this.base + path
      } else {
        url = this.base + prefix  + '/' + path
      }
    }
    // if (_.isPlainObject(options.body)) {
    if(typeof options.body !== 'string'){
      options.body = JSON.stringify(options.body)
    }
    if (!options.headers) options.headers = {}
    if (!options.headers['Accept']) options.headers['Accept'] = 'application/json'
    if (!options.headers['Content-Type']) options.headers['Content-Type'] = 'application/json; charset=utf-8'
    if (!options.headers['Authorization'] && this.authToken)
      options.headers['Authorization'] = 'Bearer ' + this.authToken


    return fetch(url, options) ///
    .then(res => {
      // console.log(2222);
      return res.json()
    })
    .then(pack => {
      if (pack.code != 0) {
        console.log('pack.err', pack)
        throw pack
      }
      if (pack.err) {
        console.log('pack.err', pack.err)
        // console.error ? console.error(pack.err) : console.log(pack.err)
        throw pack.err
      }
      return pack
    })
  }
}
