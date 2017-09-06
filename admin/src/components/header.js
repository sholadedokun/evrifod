import React, {Component} from 'react';
import { signoutUser} from '../actions/userActions';
import { connect } from 'react-redux'
import { Link,  } from 'react-router-dom';
import {Grid, Col, Row, Nav} from 'react-bootstrap';
import _ from 'lodash'

class Header extends(Component){
    constructor(props){
        super();
    }
    componentWillMount(){

    }
    componentWillReceiveProps(nextProps){

    }
    signoutUser(){
        this.props.signoutUser()
        this.props.history.push('/')
    }
    renderLinks() {
      if (this.props.authenticated) {
        // show a link to sign out
        return [
            <li><Link to="/addmeal">Add Meal</Link></li>,
            <li key={_.uniqueId()} className="nav-item">
              <a href="" className="nav-link" onClick={this.signoutUser.bind(this)} >Sign Out</a>
            </li>        
        ]
      } else {
        // show a link to sign in or sign up
        return [
          <li className="nav-item" key={_.uniqueId()}>
            <Link className="nav-link" to="/signin">Sign In</Link>
          </li>,
          <li className="nav-item" key={_.uniqueId()}>
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>
        ];
      }
    }

    render(){
        const { allRestaurants, title } = this.props
        return(
            <Col xs={12}  className="App-header">
                <Grid>
                    <div className="companyName">{title}</div>
                    <Nav>
                            <li><Link to="/home">Home</Link></li>

                            {this.renderLinks()}
                    </Nav>
                </Grid>
            </Col>
        )
    }
}
//to connet to our this component's prop to our state
function mapStateToProps(state){
    return{
        authenticated:state.user.authenticated
    }
}
const mapDispatchToProps = { signoutUser}
//wrapping our connect with the component
export default connect(mapStateToProps, mapDispatchToProps)(Header)
