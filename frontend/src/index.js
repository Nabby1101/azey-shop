import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Loading from './layouts/load';
import store, { persistor } from './store';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
ReactDOM.render(
  <Provider store={store} >
    <PersistGate loading={<Loading />} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
