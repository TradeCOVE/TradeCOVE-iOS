```
window.sendMessage = function(message) {
  window.location.hash = [Date.now(), JSON.stringify(message)].join("#");
};

/////
window.sendMessage({type: 'SET_NAVIGATOR', data: {title:''}})

window.sendMessage({type: 'AUTH_LOGOUT'})


window.sendMessage = function(message) {
  window.location.hash = [Date.now(), JSON.stringify(message)].join("#");
};
window.__INITIAL_STATE__ = {
  appState: {
    token: '####',
    user: {}
  }
}
```
