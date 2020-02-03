import React from "react";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import Helmet from "react-helmet";

import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "../modules";
import { AppContext } from "next/app";

const RootApp = ({ Component, store, pageProps }: any) => {
  return (
    <Provider store={store}>
      <Helmet
        htmlAttributes={{ lang: "ko" }}
        meta={[
          {
            charSet: "UTF-8"
          },
          {
            name: "viewport",
            content:
              "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover"
          },
          {
            httpEquiv: "X-UA-Compatible",
            content: "IE=edge"
          }
        ]}
      />
      <Component {...pageProps} />
    </Provider>
  );
};

RootApp.getInitialProps = async (context: AppContext) => {
  const { ctx, Component } = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const configureStore = (initialState: any, options: any) => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  const enhancer: any =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
            : (f: any) => f
        );
  const store = createStore(rootReducer, initialState, enhancer);
  (store as any).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(RootApp));
