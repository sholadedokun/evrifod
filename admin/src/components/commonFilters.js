import React from 'react';
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
export function AutoFill({list, whenSelected, onType}){
    const style={
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
        }
    }

    return(
        <div style={{position:"relative"}}>
            <input type="text" placeholder="Autofill search bar" onChange={onType} />
            <div style={style.searchDrop}>
                {
                    _.map(list, (item, index)=>{
                        return(
                            <div key={_.uniqueId()} style={style.searchList} onClick={whenSelected.bind(item)}>{item.name}</div>
                        )
                    })
                }
            </div>
        </div>

    )
}
