import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {Col} from 'react-bootstrap';
import {renderInput, renderTextarea, AutoFill} from './commonFilters';
import _ from 'lodash';

class settingForm  extends Component{
    constructor(){
        super();
        this.state={
            NutrientList:'',
            selectedList:[]
        }
    }
    onSubmit(values){
        if(this.state.selectedList){
            values.nutrients=_.map(this.state.selectedList, (item, index)=>{
                return (item._id)
            })
        }
        this.props.onSubmitting(values);
        // .then(data=> this.props.history.push('/userAccount'))
    }

    itemSelected(item, e){
        this.setState({selectedList:[...this.state.selectedList, arguments[0]], NutrientList:[]})
    }
    render(){
        const {handleSubmit, name, allNutritions}=this.props;
        const {selectedList, NutrientList} =this.state
        return(
            <Col xs={12}>
                <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                    {
                        (name==="Ingredient")?
                            <AutoFill selectedList={selectedList} minLength={3} list={allNutritions} placeHolder="Type a Nutrition Class" whenSelected={this.itemSelected.bind(this)} />
                        :
                        ''
                    }
                    <div className="field half">
                        <Field component={renderInput} name="name" placeholder={name} />
                    </div>
                    <div className="field half">
                        <Field component={renderTextarea} name="description" placeholder={`Give a brief description of this ${name}`} rows="7" />
                    </div>
                    <input type="submit" value="Save" icon="save" />

                </form>
            </Col>
        )
    }
}

function validate(formProps) {
    const errors = {};
    if (!formProps.name) {
        errors.name = 'Please enter a Name for the Nutrition';
    }
    if (!formProps.description) {
        errors.description = 'Please enter your Nutritions\'s Brief';
    }
    return errors
}
export default reduxForm({
    validate,
    form: 'addNewNutrition'
})(settingForm)
