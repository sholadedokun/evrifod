import {
    ADD_NEW_SETTINGS,
    RESET_MEAL_TYPE,
} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case ADD_NEW_SETTINGS:
        return { ...state, error: '', newSettings: action.payload };
    default: return {...state}
  }
}
