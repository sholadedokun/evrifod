import React, {Component} from 'react';
import Heading from './heading';
import {Grid, Row, Col} from 'react-bootstrap';
import { Field, FieldArray, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {fetchAllCategories, fetchAllSubCategories, addNewProduct} from '../actions/mealActions'
import AddNewCategory from './addNewCategory';
import AddNewMealType from './addNewMealType';
import Icon from './icon';
import {renderInput, renderOption, renderTextarea} from './commonFilters'
import _ from 'lodash';
import Button from './button'
import Image from './image'
import Dropzone from 'react-dropzone';

export default class settings extends Component{
    constructor(){
        super();
        this.state={
            settingOptions:{
                Category: AddNewCategory,
                "Meal Type": AddNewMealType
            },
            currentSettingsTitle:'Category',
            currentSetting: AddNewCategory
        }
        this.swapSettings=this.swapSettings.bind(this)
    }
    componentWillMount(){

    }
    swapSettings(e){
        this.setState(
            {
                currentSetting:this.state.settingOptions[e.target.value],
                currentSettingsTitle: e.target.value
            }
        )
    }
    showForm(){
        let Setting= this.state.currentSetting
        console.log(Setting)
        return(
            <Col xs={12}>
                <Heading title={this.state.currentSettingsTitle} marginBottom="5px" size="sm"/>
                <Setting />
            </Col>

        )
    }
    render(){
        const {settingOptions, currentSettingsTitle, currentSetting } = this.state;
        return(
            <Grid>
                <Heading title="Settings" marginBottom="5px" size="md"/>
                <Col xs={12}>

                    <select onChange={this.swapSettings}>
                        {
                            _.map(settingOptions, (item, index)=>{
                                return(
                                    <option value={index}>Add New {index}</option>
                                )
                            })
                        }
                    </select>
                    {this.showForm()}
                </Col>
            </Grid>
        )
    }
}
