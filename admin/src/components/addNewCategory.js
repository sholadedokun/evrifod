import React, {Component} from 'react';
import Heading from './heading';
import {Grid, Row, Col} from 'react-bootstrap';
import { Field, FieldArray, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {fetchAllCategories, fetchAllSubCategories, addNewProduct} from '../actions/addNewMeal'
import Icon from './icon';
import {renderInput, renderOption, renderTextarea} from './commonFilters'
import _ from 'lodash';
import Button from './button'
import Image from './image'
import Dropzone from 'react-dropzone';

class AddNewCategory  extends Component{
    render(){
        return(
            <Col xs={12}>
                <div className="field half">
                    <Field component={renderInput} name="title" placeholder="What the meal is called" />
                </div>
                <div className="field half">
                    <Field component={renderTextarea} name="description" placeholder="Give a brief description of your this meal category" rows="7" />
                </div>
            </Col>
        )
    }
}
function mapStateToProps(state) {
  return { errorMessage: state.user.error,
           allCategories: state.inventory.allCategories,
           subCategories: state.inventory.subCategories
   };
}
function validate(formProps) {
    const errors = {};
    if (!formProps.title) {
        errors.name = 'Please enter a Name for the category';
    }
    if (!formProps.description) {
        errors.description = 'Please enter your category\'s Brief';
    }
}
export default reduxForm({
    validate,
    form: 'addNewCategory'
})(
    connect(mapStateToProps, {fetchAllCategories, fetchAllSubCategories, addNewProduct})(AddNewCategory)
)
