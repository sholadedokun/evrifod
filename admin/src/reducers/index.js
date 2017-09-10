import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import userReducer from './userReducer';
import inventoryReducer from './mealInventoryReducer';
import settings from './settingsReducer'

const rootReducer = combineReducers({
  form,
  inventory: inventoryReducer,
  user:userReducer,
  settings
});
export default rootReducer;
