import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
// import { toJS } from 'mobx';
import DevTools from 'mobx-react-devtools';

@observer
export default class TestPage extends Component {
  render() {
    const { testStore } = this.props;
    return (
      <section>
        <DevTools/>
          {testStore.news.map((news) => <Post store={testStore} key={news.id} {...news}/>)}
      </section>
    );
  }
}

@observer
class Post extends Component {
  render() {
    const { id, title, description, comments, store } = this.props;
    return (
      <div>
        <h1>{title}</h1>
        <h4>{description}</h4>
        <hr/>
        <p>Comments</p>
        <div>
          {comments.map((comment) => <Comment store={store} key={comment.id} {...comment} newsId={id}/>)}
        </div>
        <hr/>
        <hr/>
      </div>
    );
  }
}

@observer
class Comment extends Component {

  render() {
    const { id, user, text, newsId, store } = this.props;
    return (
      <div>
        <span>{user.username}</span>
        <span><Input text={text} id={id} newsId={newsId} store={store}/></span>
      </div>
    );
  }
}

@observer
class Input extends Component {
  changeComment = (postId, commentId) => (e) => {
    this.props.store.editComment(postId, commentId, e.target.value)
  }
  render() {
    const { text, id, newsId } = this.props;
    return <input type="text" value={text} onChange={this.changeComment(newsId, id)}/>
  }
}
