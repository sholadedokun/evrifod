import React, {Component} from 'react';
import Heading from './heading';
import {Grid, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import { addSettings} from '../actions/settingsAction'
import {fetchAllNutrition} from '../actions/mealInventoryActions'
import SettingForm from './settingForm';
import _ from 'lodash';
class settings extends Component{
    constructor(){
        super();
        this.state={
            settingOptions:{
                Category: {
                    endpoint:'category',
                },
                "Meal Type": {
                    endpoint:'mealtype',
                },
                "Nutrition Class":{
                    endpoint:'nutrition',
                },
                "Ingredient":{
                    endpoint:'ingredients',
                }
            },
            currentSettingsTitle:'Category'
        }
    }
    showForm(){
        return(
            <Col xs={12}>
                <Heading title={`Add New ${this.state.currentSettingsTitle}`} marginBottom="5px" size="sm"/>
                <SettingForm  name={this.state.currentSettingsTitle} onSubmitting={this.postValues.bind(this)} allNutritions={this.props.allNutritions} />
            </Col>
        )
    }
    getSettingForm(e){
        const selectedFrom = e.target.value;
        if(selectedFrom==='Ingredient'){
            this.props.fetchAllNutrition()
        }

        this.setState({currentSettingsTitle: selectedFrom})
    }
    postValues(values){
        this.props.addSettings(values, this.state.settingOptions[this.state.currentSettingsTitle].endpoint )
    }
    render(){
        const {settingOptions, currentSettingsTitle, currentSetting, newSettings } = this.state;
        return(
            <Grid>
                <Heading title="Settings" marginBottom="5px" size="md"/>
                <Col xs={12}>

                    <select onChange={this.getSettingForm.bind(this)}>
                        {
                            _.map(settingOptions, (item, index)=>{
                                return(
                                    <option key={_.uniqueId()} value={index}>Add New {index}</option>
                                )
                            })
                        }
                    </select>
                    {this.showForm()}
                    { newSettings ?
                        <span>New {currentSettingsTitle} was succeffuly Added</span>:''
                    }
                </Col>
            </Grid>
        )
    }
}
function mapStateToProps(state) {
  return { errorMessage: state.user.error,
           newSettings: state.settings.newSettings,
           allNutritions:state.inventory.allNutritions
   };
}
export default connect(mapStateToProps, {addSettings, fetchAllNutrition})(settings)
