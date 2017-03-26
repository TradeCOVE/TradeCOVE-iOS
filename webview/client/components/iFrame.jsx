import React, { Component } from 'react';

export default class iFrame extends Component {
  render() {
    return (
      <div>
        <iframe src="http://mobile.mgbeta.ru" frameBorder={0} width="100%" height="100%" />
      </div>
    );
  }
}
