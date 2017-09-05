import React, {Component} from 'react';
import Heading from './heading';
import {Grid, Row, Col} from 'react-bootstrap';
import { Field, FieldArray, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {fetchAllCategories, fetchAllSubCategories, addNewProduct} from '../actions/addNewMeal'
import AddNewCategory from './addNewCategory';
import Icon from './icon';
import {renderInput, renderOption, renderTextarea} from './commonFilters'
import _ from 'lodash';
import Button from './button'
import Image from './image'
import Dropzone from 'react-dropzone';

export default class settings extends Component{
    componentWillMount(){

    }
    render(){
        return(
            <Grid>
                <Heading title="Settings" marginBottom="5px" size="md"/>
                <Col xs={12}>
                    <Heading title="Add Food Category" marginBottom="5px" size="sm"/>
                    <AddNewCategory />
                </Col>
            </Grid>
        )
    }
}
