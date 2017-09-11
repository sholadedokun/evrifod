import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  FETCH_CATEGORIES,
  FETCH_MEAL_TYPES,
  FETCH_NUTRITION,
  FETCH_INGREDIENTS,
  ADD_NEW_MEAL,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_OFFERS
} from './actionTypes';
import _ from "lodash";
const ROOT_URL = 'http://localhost:3000/adminActions';
export function fetchAllCategories() {
    return function(dispatch) {
        return new Promise( (resolve, reject)=>{
            axios.get(`${ROOT_URL}/category`)
                .then(response => {
                    dispatch({ type: FETCH_CATEGORIES,
                        payload: response.data
                     });
                    resolve()
                })
                .catch(() => {
                    dispatch(inventoryError('Error Fetching Categoriee , Please Check your internet and try again.'));
                    reject()
                });
        })
  }
}
export function fetchAllMealTypes() {
    return function(dispatch) {
        return new Promise( (resolve, reject)=>{
            axios.get(`${ROOT_URL}/mealtypes`)
                .then(response => {
                    dispatch({ type: FETCH_MEAL_TYPES,
                        payload: response.data
                     });
                     resolve(response.data)
                })
                .catch((e) => {
                    dispatch(inventoryError('Error Fetching Meal Types , Please Check your internet and try again.'));
                    reject(e)
                });
            })
        }
}
export function fetchAllNutrition() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/nutritions`)
            .then(response => {
                dispatch({ type: FETCH_NUTRITION,
                    payload: response.data
                 });
            })
            .catch(() => {
                dispatch(inventoryError('Error Fetching nutritions , Please Check your internet and try again.'));
            });
  }
}
export function fetchAllIngredients() {
    return function(dispatch) {
        return new Promise( (resolve, reject)=>{
        axios.get(`${ROOT_URL}/ingredients`)
            .then(response => {
                dispatch({ type: FETCH_INGREDIENTS,
                    payload: response.data
                 });
                resolve();
            })
            .catch(() => {
                dispatch(inventoryError('Error Fetching ingredients , Please Check your internet and try again.'));
                reject();
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

export function addNewMeal(document){
    //re-arrange the objects
    console.log(document)

    return function(dispatch) {
        return new Promise( (resolve, reject)=>{
            //turn the images to a formData
            var file = new FormData()
            for(var image in document.file){
                file.append('files', document.file[image])
            }
            //lets first send the pictures and related files
            axios.post("http://localhost:3000/upload", file, {
                headers: {
                    authorization: localStorage.getItem('EvrifodToken'),
                    'Content-Type':  `multipart/form-data`
                }
            })
            .then(response => {
                let allPic=response.data.map((item)=>{
                    return(
                        item.filename
                    )
                })
                let profilePic = allPic[0];

                let meal = {..._.omit(document, ['file', 'images']), allPic, profilePic }
                axios.post(`${ROOT_URL}/addMeal`, meal)
                    .then(response => {
                        dispatch({ type: ADD_NEW_MEAL,
                            payload: response.data
                         });
                         resolve()
                    })
                    .catch((e) => {
                        dispatch(inventoryError('Error Fetching Categoriee , Please Check your internet and try again.'));
                        reject(e)
                    });
            })
        });
    }
}
export function fetchProduct() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/inventory`, {
            headers: { authorization: localStorage.getItem('EvrifodToken') }
        })
        .then(response => {
            dispatch({
                type: FETCH_OFFERS,
                payload: response.data
            });
        });
    }
}
