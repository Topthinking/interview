import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

export default function(contexts, selectTypes) {
  const CombineContext = React.createContext({});

  return (Component) => {
    class Combine extends Component {
      static contextType = CombineContext;
    }

    let i = 0;
    const consumers = {};
    const keys = Object.keys(contexts);

    const createContextComponent = (props) => {
      const key = keys[i];
      const Context = contexts[key];
      return (
        <Context.Consumer>
          {(context) => {
            if (
              context &&
              selectTypes[key] &&
              Array.isArray(selectTypes[key])
            ) {
              // 根据选择的type对Consumer的数据进行重写筛选
              const newContext = {};
              selectTypes[key].map((item) => {
                if (context[item]) {
                  newContext[item] = context[item];
                }
                return item;
              });
              consumers[key] = newContext;
            } else {
              consumers[key] = context;
            }
            i++;
            if (i < keys.length) {
              // 递归渲染每个context的consumer
              return createContextComponent(props);
            } else {
              // 渲染组件
              i = 0;
              return (
                <CombineContext.Provider value={consumers}>
                  <Combine {...props} />
                </CombineContext.Provider>
              );
            }
          }}
        </Context.Consumer>
      );
    };
    const App = (props) => createContextComponent(props);

    hoistNonReactStatics(App, Component);

    return App;
  };
}
