import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  FETCH_CATEGORIES,
  FETCH_MEAL_TYPES,
  FETCH_NUTRITION,
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
            let type= document.selectedType;
            let rate = {type:document.selectedRate, duration:document.selectedRateDuration, quantity:document.rateQuantity, value: document.rateValue}
            let Features = _.pick(document, ['key Features', 'specifications'])
            var others = _.map(Features, (item, key)=> {
                return {
                    title:key,
                    value:item
                }
            })

            let reviewQuestions = _.map(_.pick(document, ["Product","Design","User Interface","Packaging"]), (item,index)=>{
                return {
                    title:index,
                    questions:item
                }
            })
            let inventory = {..._.pick(document, ['name', 'description', 'category', 'subCategory', "selectedSubType", "selectedStatus" ]), allPic, type, profilePic, others, rate, reviewQuestions}
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
