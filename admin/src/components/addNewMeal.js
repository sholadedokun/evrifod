import React, {Component} from 'react';
import Heading from './heading';
import {Grid, Row, Col} from 'react-bootstrap';
import { Field, FieldArray, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {fetchAllCategories, fetchAllMealTypes, addNewMeal} from '../actions/mealInventoryActions'
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
            selectedCategory:'',
            selectedType:'',
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
            mealType:'',
            status:['Active', 'Inactive']
        }
    }
    componentWillMount(){
        if(!this.props.allCategories)this.props.fetchAllCategories()
        .then(response=>
            this.setState({allCategories: this.props.allCategories
            })
        )
        if(!this.props.allMealTypes)this.props.fetchAllMealTypes()
        .then(response=>
            this.setState({allMealTypes: this.props.allMealTypes
            })
        )

    }
    parseSpecificationJSX(item, index, label, objectName ){
        let allFields=[];
        for(let field in item){
            switch(field){
                case 'title':
                    allFields.push(<Field key={_.uniqueId()} value={this.state[(objectName || label)][index][field]} component={this.renderInput} onChange={this.updateState.bind(this,[objectName || label], index, field)} type="text" name={`${objectName || label}_title_${index}`}  placeholder={`Type ${label} title`} />);
                    break;
                case 'description':
                    allFields.push(<Field key={_.uniqueId()} value={this.state[(objectName || label)][index][field]} component={renderTextarea} onChange={this.updateState.bind(this,[objectName || label], index,field)} name={`${objectName || label}_description_${index}`}  placeholder={`please describe the ${label} `} rows="7" />);
                    break;
            }

        }
        return allFields
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

    onSubmit(values){
        //call action creators to upload the product...
        this.props.addNewProduct(_.assign(values, (_.omit(this.state, ['allCategories','allCurrentSubcategroies', 'reviewQuestions', 'rate', 'type', 'status' ]))))
        // .then(data=> this.props.history.push('/userAccount'))
    }
    render(){

        let {allCategories, allMealTypes, allCurrentSubcategroies, selectedType, mealType, category, rate, status, selectedStatus}=this.state
        const {handleSubmit}=this.props;
        // let categoryOptions=["Please wait, categories are loading"];
        // let subCategoryOptions=["Please wait, subCategories are loading"];
        return(
            <Col xs={12} className="addNewProduct">
                <Heading size="md" title="Add New Meal" icon="plus" marginBottom='1em' />

                <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                    <Col xs={12}>
                        <Heading size="sm" title="General Details" />
                        <div className="field half">
                            <select name="category" onChange={(e)=>this.setState({category:e.target.value})} value={category}>
                                {renderOption(allCategories, '_id', 'name')}
                            </select>
                        </div>
                        <div className="field half">
                            <select name="subCategory" onChange={(e)=>this.setState({mealType:e.target.value})}   value={mealType}>
                                {renderOption(allMealTypes, '_id', 'name')}
                            </select>
                        </div>
                        <div className="field half">
                            <Field component={this.renderInput} type="text" name="name" placeholder="Name of the Meal" />
                        </div>
                        <div className="field half">
                            <Field component={renderTextarea} name="description" placeholder="Give a brief description of this Meal" rows="7" />
                        </div>
                    </Col>

                    <Col xs={12}>
                        <Heading size="sm" title="Add Product Image" />
                        <ul className="">
                            {this.renderImageInput()}
                        </ul>
                    </Col>
                    <div className="field half">
                        <select name="rateDuration" onChange={(e)=>this.setState({selectedStatus:e.target.value})}   value={selectedStatus}>
                            {renderOption(status)}
                        </select>
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
        errors.name = 'Please enter your Product/service Name';
    }
    if (!formProps.description) {
        errors.description = 'Please enter your product or service Brief';
    }
    // return errors;
}
function mapStateToProps(state) {
  return { errorMessage: state.user.error,
           allCategories: state.inventory.allCategories,
           allMealTypes: state.inventory.allMealTypes
   };
}
export default reduxForm({
    validate,
    form: 'addNewMeal'
})(
    connect(mapStateToProps, {fetchAllCategories, fetchAllMealTypes, addNewMeal})(AddNewProduct)
)
