import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
}

const store = createStore(
    applyMiddleware(
        ...middlewares
    )
);

export default store;