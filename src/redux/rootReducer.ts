import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import orderReducer from './slices/order';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  order: orderReducer,
});

export { rootPersistConfig, rootReducer };
