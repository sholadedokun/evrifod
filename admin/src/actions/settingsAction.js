import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ADD_NEW_SETTINGS,
  AUTH_ERROR,
} from './actionTypes';
import _ from "lodash";
const ROOT_URL = 'http://localhost:3000/adminActions';
export function addSettings(settingValues, endpoint ) {
    return function(dispatch) {
        return new Promise( (resolve, reject)=>{
            axios.post(`${ROOT_URL}/${endpoint}`, settingValues )
                .then(response => {
                    dispatch({ type: ADD_NEW_SETTINGS,
                        payload: response.data
                    });
                    resolve()
                })
                .catch(() => {
                    dispatch(inventoryError('Error Adding meal type , Please Check your internet and try again.'));
                    reject()
                });
        })
  }
}
export function inventoryError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
