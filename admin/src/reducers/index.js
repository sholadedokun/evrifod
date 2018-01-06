import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import userReducer from './userReducer';
import inventoryReducer from './inventoryReducer';
import settingReducer from './settingsReducer';

const rootReducer = combineReducers({
  form,
  inventory: inventoryReducer,
  user:userReducer,
  setting:settingReducer,
});
export default rootReducer;
