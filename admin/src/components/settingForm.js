import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {Col} from 'react-bootstrap';
import {renderInput, renderTextarea, AutoFill} from './commonFilters';
import _ from 'lodash';

class settingForm  extends Component{
    constructor(){
        super();
        this.state={
            NutrientList:''
        }
    }
    onSubmit(values){
        //call action creators to upload the category...
        this.props.onSubmitting(values);
        // .then(data=> this.props.history.push('/userAccount'))
    }
    searchList(e){
        if(e.target.value.length >= 3){
            let filteredList=_.filter(this.props.allNutritions, (item)=>{
                console.log(item)
                if(item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >-1){
                    return item
                }
            })
            this.setState({NutrientList:filteredList})
        }
        else{
            this.setState({NutrientList:[]})
        }

    }
    itemSelected(item, e){
        console.log(item, e)
    }
    render(){
        const {handleSubmit, name, allNutritions}=this.props;
        console.log(allNutritions)
        return(
            <Col xs={12}>
                <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                    {
                        (name==="Ingredient")?
                            <AutoFill minLetters={3} onType={this.searchList.bind(this)} list={this.state.NutrientList} whenSelected={this.itemSelected.bind(this)} />
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
