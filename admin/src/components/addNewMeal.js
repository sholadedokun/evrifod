import React, {Component} from 'react';
import Heading from './heading';
import {Grid, Row, Col} from 'react-bootstrap';
import { Field, FieldArray, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {fetchAllCategories, fetchAllTypes, addNewMeal} from '../actions/mealActions'
import Icon from './icon';
import {renderOption, renderTextarea} from './commonFilters'
import _ from 'lodash';
import Button from './button'
import Image from './image'
import Dropzone from 'react-dropzone';

class AddNewProduct extends Component{
    constructor(){
        super()
        this.state={
            allCategories:null,
            category:'',
            type:'',
            selectedCategory:'',
            selectedType:'',
            selectedSubType:'',
            selectedStatus:'Inactive',
            images:[
                {
                    file:'',
                    previewUrl:''
                },
                {
                    file:'',
                    previewUrl:''
                }
            ],
            file:[],
            status:['Active', 'Inactive']
        }
    }
    componentWillMount(){
        if(!this.props.allCategories){
            this.props.fetchAllTypes()
            this.props.fetchAllCategories()
            .then(response=>
                this.setState({allCategories: this.props.allCategories
                })
            )

        }

    }
    renderInput(field){
        const {meta:{touched, error}} = field;
        const classN= `${ touched && error ? 'inputError':'' }`;
        field.input.name= field.input.name.replace(' ', '')
        return(
            <span>
                <input className={classN}  type={field.type} placeholder={field.placeholder}  {...field.input} />
                <span className='textError'>{touched ? error : ''}</span>
            </span>
        )
    }
    renderSelect(field){

        const {meta:{touched, error},optionArray, input} = field;
        const classN= `${ touched && error ? 'inputError':'' }`;
        field.input.name= field.input.name.replace(' ', '')
        console.log(field)
        return(

            <span>
                <select  className={classN}  {...input}>
                    {renderOption(optionArray)}
                </select>
                <span className='textError'>{touched ? error : ''}</span>
            </span>
        )
    }
    imageUploadManager(index, file, ){
        //setImage preview
        let newfile= [...this.state.file , file[0]]
        let newvalue = [...this.state.images]
        newvalue[index].previewUrl = file[0].preview
        newvalue[index].file= file[0].name
        this.setState({
            images: [...newvalue], file:newfile
        })
    }
    updateState(){

        let stateToChange='';
        if(arguments.length==6){
            stateToChange=[...this.state[arguments[0]]];
            stateToChange[arguments[1]][arguments[2]]=arguments[3].target.value
        }
        else{
            stateToChange={...this.state[arguments[0]]};
            stateToChange[arguments[1]][arguments[2]][arguments[3]]=arguments[4].target.value
        }
        this.setState({
            [arguments[0]]: stateToChange
        })
        // console.log(stateToChange)
        // console.log( arguments)
    }
    removeImage(index){
        console.log(index)
    }
    renderImageInput(){
        return(
            this.state.images.map((item, index)=>{
                let imagePreview=(
                    <Dropzone accept={'image/*'} multiple={false} onDrop={this.imageUploadManager.bind(this, index)} className="dragSelectImage">
                        <Icon icon="picture-o" size="md" /><br />
                        Add <Icon icon="plus"/> by clicking or <br />
                        draging an image here.
                    </Dropzone>

                )
                if(item.previewUrl !== '') imagePreview = <Image src={item.previewUrl} />
                return(
                    <li  key={_.uniqueId()} className="eachImage">
                        {item.previewUrl ?
                            <img src={item.previewUrl} width="100%" />:
                            imagePreview
                        }
                        {
                            item.ImageInfo ?
                                <div>
                                    <span>{item.ImageInfo}</span>
                                    {item.ImageCrop?<span>CROP</span> : ''}
                                </div>:''
                        }
                        {item.previewUrl ?
                            <Icon icon="trash-o" onClick={this.removeImage(index)} />:''
                        }
                    </li>
                )
            })
        )

    }
    addMoreFeatures(type, e){
        e.preventDefault()
        let defaultValue = {title:'', description:'' }
        let read= [...this.state[type], defaultValue]
        this.setState({
            [type]: read
        })
    }
    onSubmit(values){
        //call action creators to upload the product...
        this.props.addNewMeal(_.assign(values, (_.omit(this.state, ['allCategories','allCurrentSubcategroies', 'reviewQuestions', 'rate', 'status' ]))))
        // .then(data=> this.props.history.push('/userAccount'))
    }
    render(){

        let {allCategories, selectedType, type, rate, status, selectedStatus }=this.state
        const {handleSubmit, allTypes}=this.props;
        return(
            <Col xs={12} className="addNewProduct">
                <Heading size="md" title="Add New Product" icon="plus" marginBottom='1em' />

                <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                    <Col xs={12}>
                        <Heading size="sm" title="General Details" />
                        <div className="field half">
                            <select name="category" onChange={(e)=>this.setState({category:e.target.value})} value={this.state.category}>
                                {renderOption([{name:'Select a type'}, ...(allCategories || '')], '_id', 'name')}
                            </select>
                        </div>
                        <div className="field half">
                            <select name="type" onChange={(e)=>this.setState({type:e.target.value})}   value={this.state.type}>
                                {renderOption([{name:'Select a type'}, ...(allTypes || '')], '_id', 'name')}
                            </select>
                        </div>
                        <div className="field half">
                            <Field component={this.renderInput} type="text" name="name" placeholder="Name of your Meal" />
                        </div>
                        <div className="field half">
                            <Field component={renderTextarea} name="description" placeholder="Give a brief description of your product/service" rows="7" />
                        </div>
                    </Col>
                    <Col xs={12}>
                        <Heading size="sm" title="Meal Details" />
                    </Col>
                    <Col xs={12}>
                        <Heading size="sm" title="Meal Nutrientional Breakdown" />
                    </Col>
                    <Col xs={12}>

                    </Col>
                    <Col xs={12}>
                        <Heading size="sm" title="Add Product Image" />
                        <ul className="">
                            {this.renderImageInput()}
                        </ul>
                    </Col>
                    <Col xs={12}>
                        <Heading size="sm" title="Review Questions" />
                        <ul className="">
                        </ul>
                    </Col>
                    <input type="submit" value="Save" icon="save" />
                </form>
            </Col>
        )
    }
}
function validate(formProps) {
    const errors = {};
    if (!formProps.name) {
        errors.name = 'Please enter your Product/service Name';
    }
    if (!formProps.description) {
        errors.description = 'Please enter your product or service Brief';
    }
     return errors;
}
function mapStateToProps(state) {
  return { errorMessage: state.user.error,
           allCategories: state.inventory.allCategories,
           allTypes: state.inventory.allTypes
   };
}
export default reduxForm({
    validate,
    form: 'addNewProduct'
})(
    connect(mapStateToProps, {fetchAllCategories, fetchAllTypes, addNewMeal})(AddNewProduct)
)
