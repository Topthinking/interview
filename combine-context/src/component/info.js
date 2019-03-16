import React from 'react';
import combine from '../combine';
import { Context as BookContext } from '../context/book';
import { Context as UserContext } from '../context/user';

class Info extends React.Component {
  render() {
    return (
      <div>
        <p>{this.context.BookContext.info}</p>
        <p>{this.context.BookContext.detail}</p>
        <p>{this.context.UserContext.name}</p>
      </div>
    );
  }
}

/**
 * 该子组件可能需要用到祖先组件的多个context对象
 * 可以通过combine高阶组件来实现多context的传递
 */
export default combine(
  {
    BookContext,
    UserContext,
  },
  {
    BookContext: ['info'],
  },
)(Info);
