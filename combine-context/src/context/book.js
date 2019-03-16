import React from "react";

export const Context = React.createContext({});

export default class Book extends React.Component {
  render() {
    return (
      <Context.Provider
        value={{
          info: "hello book",
          detail: "hello book detail"
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
