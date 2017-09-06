import React, {Component} from 'react';
import Heading from './heading';
import {Grid, Row, Col} from 'react-bootstrap';
import { Field, FieldArray, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {addNewCategory} from '../actions/settingsAction'
import Icon from './icon';
import {renderInput, renderOption, renderTextarea} from './commonFilters'
import _ from 'lodash';
import Button from './button'
import Image from './image'
import Dropzone from 'react-dropzone';

class AddNewCategory  extends Component{
    onSubmit(values){
        //call action creators to upload the category...
        this.props.addNewCategory(values);
        // .then(data=> this.props.history.push('/userAccount'))
    }
    render(){
        const {handleSubmit}=this.props;
        return(
            <Col xs={12}>
                <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                    <div className="field half">
                        <Field component={renderInput} name="name" placeholder="What this food category is called" />
                    </div>
                    <div className="field half">
                        <Field component={renderTextarea} name="description" placeholder="Give a brief description of this meal category" rows="7" />
                    </div>
                    <input type="submit" value="Save" icon="save" />
                </form>
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
    if (!formProps.name) {
        errors.name = 'Please enter a Name for the category';
    }
    if (!formProps.description) {
        errors.description = 'Please enter your category\'s Brief';
    }
    return errors
}
export default reduxForm({
    validate,
    form: 'addNewCategory'
})(
    connect(mapStateToProps, {addNewCategory})(AddNewCategory)
)
