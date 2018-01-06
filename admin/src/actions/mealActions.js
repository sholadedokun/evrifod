import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  FETCH_CATEGORIES,
  FETCH_TYPES,
  ADD_NEW_PRODUCT,
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
export function fetchAllTypes() {
    return function(dispatch) {
        return new Promise( (resolve, reject)=>{
            axios.get(`${ROOT_URL}/types`)
            .then(response => {
                dispatch({ type: FETCH_TYPES,
                    payload: response.data
                 });
            })
            .catch((e) => {
                dispatch(inventoryError('Error Fetching Categoriee , Please Check your internet and try again.'));
                reject(e)
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

            let inventory = {..._.pick(document, ['name', 'description', 'category', 'type',  "selectedStatus" ]), allPic, profilePic}
            axios.post(`${ROOT_URL}/inventory`, inventory)
                .then(response => {
                    dispatch({ type: ADD_NEW_PRODUCT,
                        payload: response.data
                     });
                    //  resolve(response)
                })
                .catch((e) => {
                    dispatch(inventoryError('Error Fetching Categoriee , Please Check your internet and try again.'));
                    // reject(e)
                });

            // console.log(inventory)
            // dispatch({
            //     type: FETCH_OFFERS,
            //     payload: response.data
            // });
            // console.log(response)
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
