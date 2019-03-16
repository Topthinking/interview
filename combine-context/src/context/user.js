import React from 'react';

export const Context = React.createContext({});

export default class User extends React.Component {
  render() {
    return (
      <Context.Provider
        value={{
          name: 'topthinking',
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
