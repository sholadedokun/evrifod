import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';

export function TextLimiter ({value, limit}){
    if(value.length > limit && (value.length > (limit+2))){
        value = value.substring(0, limit)
        value+=' ...'
    }
    return(
        <span>{value}</span>
    )
}
export function Pluralise ({count, singluar, plura}){
    return(
        <span>{count>1? plura:singluar}</span>
    )
}
export function renderOption(allOptions, value, name){
    // console.log(allOptions)
    return(
        _.map(allOptions, (item, index)=>{
            let optionValue= (value) ? item[value] : item
            let OptionName= (name) ? item[name] : item
            return(
                <option key={_.uniqueId()} value={optionValue}>{OptionName}</option>
            )
        })
    )
}
export function renderInput(field){
    const {meta:{touched, error}} = field;
    const classN= `${ touched && error ? 'inputError':'' }`;
    return(
        <span>
            <input className={classN}  type={field.type} name={field.name} placeholder={field.placeholder} value={field.value} {...field.input} />
            <span className='textError'>{touched ? error : ''}</span>
        </span>
    )
}
export function renderTextarea(field){
        const {meta:{touched, error}} = field;
        const classN= `${ touched && error ? 'inputError':'' }`;
        return(
            <span>
                <textarea className={classN}  name={field.name} placeholder={field.placeholder} {...field.input}>
                {field.defaultValue}
                </textarea>
                <span className='textError'>{touched ? error : ''}</span>
            </span>
        )
    }
//always remember to bind 'this' whenever this function
export function renderAlert() {
  if (this.props.errorMessage) {
    return (
      <div className="alert alert-danger">
        <strong>Oops!</strong> {this.props.errorMessage}
      </div>
    );
  }
}
export class AutoFill extends Component{
    constructor(){
        super();
        this.state={
            filteredList:[],
            typedValue:''
        }
    }
    searchList(e){
        this.setState({typedValue:e.target.value})
        if(e.target.value.length >= this.props.minLength){
            let filteredList=_.filter(this.props.list, (item)=>{
                if(item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >-1){
                    return item
                }
            })
            this.setState({filteredList})
        }
        else{
            this.setState({filteredList:[]})
        }
    }
    onSelectedItem(){
        this.props.whenSelected(arguments[0])
        this.setState({filteredList:[], typedValue:''})
    }
    render(){
        const {list, placeHolder, selectedList, minLength}=this.props
        return(
            <div style={{position:"relative"}}>
                <input type="text" placeholder={placeHolder} onChange={this.searchList.bind(this)} value={this.state.typedValue}/>
                <div style={this.style.searchDrop}>
                    {
                        _.map(this.state.filteredList, (item, index)=>{
                            return(
                                <span key={_.uniqueId()} style={this.style.searchList} onClick={this.onSelectedItem.bind(this, item)} >{item.name}</span>
                            )
                        })
                    }
                </div>
                {
                    _.map(selectedList, (item, list)=>{
                        return(
                            <span key={_.uniqueId()} style={this.style.selectedList}>{item.name}</span>
                        )
                    })
                }
            </div>

        )
    }
    style={
        searchDrop:{
            position:"absolute",
            top:"20px",
            display:"block",
        },
        searchList:{
            padding:"5px",
            borderBottom: "1px solid #555",
            display:"block",
            background:"#eee",
            cursor: "pointer",
        },
        selectedList:{
            padding:"3px 5px",
            background:"#fefefe"
        }
    }



}
