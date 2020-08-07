import React from 'react';
import './App.css';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore.js';
import { ConnectedRouter } from "connected-react-router";
import history from './redux/history';

const store = ConfigureStore();

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Main />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
