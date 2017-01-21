// Redux imports
import thunk from 'redux-thunk';
import {
  applyMiddleware,
  createStore,
} from 'redux';

// Imports
import reducers from '../reducers';

/**
 * Creates a redux store from the reducers and returns it.
 *
 * @param {function} onComplete called when the store has been created.
 * @returns {any} redux store
 */
export default function configureStore(onComplete: any): any {
  const store = createStore(reducers, applyMiddleware(thunk));
  onComplete && onComplete();
  return store;
}
