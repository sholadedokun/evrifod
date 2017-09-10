import {
  FETCH_CATEGORIES,
  FETCH_MEAL_TYPES,
  FETCH_NUTRITION,
  ADD_NEW_PRODUCT,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_OFFERS
} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_CATEGORIES:
      return { ...state, error: '', allCategories: action.payload };
    case FETCH_MEAL_TYPES:
      return { ...state, allMealTypes:action.payload };
      case FETCH_NUTRITION:
        return { ...state, error:'', allNutritions:action.payload };
    case ADD_NEW_PRODUCT:
      return { ...state, error:'', product:action.payload };
    case FETCH_OFFERS:
      return { ...state, products:action.payload };
  }
  return state;
}
