import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import Heading from './heading'
import {connect} from 'react-redux';
import {changeOrderStatus} from '../actions/userActions'
class OrderManagement extends Component{
    constructor(){
        super();
        this.state={
            coverageType:'',
            status:'',
            orders:'',
        }
    }
    changeStatus(){
        this.props.changeOrderStatus(this.state)
    }
    render(){
        const {coverageType, status, orders}=this.state;

        return(
            <Row>
                <Col xs="12">
                    <Heading title="Order Management" marginBottom="2em"  size="md"/>
                    <Heading title="Change Order Status" marginBottom="1em"  size="sm"/>
                    <Col xs="12">
                        <label>Select content</label>
                        <select value={coverageType} onChange={(e)=>this.setState({coverageType:e.target.value})}>
                            <option value="">Select Option</option>
                            <option value="allOrders">All Orders</option>
                            <option value="allExcept">All Except</option>
                            <option value="theseOrders">These Orders</option>
                            <option value="">Just this</option>
                        </select>
                        <label>Change Order Status content</label>
                        <select value={status} onChange={(e)=>this.setState({status:e.target.value})}>
                            <option value="">Select Option</option>
                            <option value="delivered">Delivered</option>
                            <option value="enroute">En-route</option>
                            <option value="cancel">Canceled</option>
                        </select>
                        <button onClick={this.changeStatus.bind(this)}>Change Status</button>
                    </Col>


                </Col>
            </Row>
        )
    }
}
export default connect(null, {changeOrderStatus})(OrderManagement)
