import React, { Component, Fragment } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import {connect} from 'react-redux';
import { adminLoginAll } from '../../actions';
import { withRouter } from 'react-router-dom';
import {
    validateNull,
    validateEmail,
    validatePassword,
} from "../../services/validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class LoginTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.history.push("/")
        }
        else{
            this.props.history.push("/products/product-list")
        }
    }

    register= () =>{
        this.props.history.push("/register")
    }
    onChange = event => {
        this.setState({ 
            [event.target.name]: event.target.value
        });    
    }

    handleSubmit = event => {
        event.preventDefault();

        if(
            validateNull(this.state.email) &&
            validateNull(this.state.password) &&
            validateEmail(this.state.email) &&
            validatePassword(this.state.password)
        ){
            const { email, password } = this.state;
            this.props.dispatch(adminLoginAll({ email, password }, this.props.history));
        }
        else{
            if (validateNull(this.state.email) === false) {
                toast.error("Please provide an email!");
            }
            if (validateNull(this.state.password) === false) {
                toast.error("Password is required!");
            }
            if (validateEmail(this.state.email) === false) {
                toast.error("Invalid email!");
            }
            if (validatePassword(this.state.password) === false) {
                toast.error("Password is not correct!");
            }
        }
    }
    
    render() {
        return (
            <Fragment>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link">Login</Tab>
                    </TabList>

                    <TabPanel>
                        <form onSubmit={this.handleSubmit} >
                            <div className="form-group">
                                <input required="" name="email" type="email" className="form-control" placeholder="Email" id="exampleInputEmail1" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <input required="" name="password" type="password" className="form-control" placeholder="Password" onChange={this.onChange} />
                            </div>
                            <input 
                                className="btn btn-primary" 
                                type="submit" 
                                value="Login"
                            />
                        </form>
                    </TabPanel>                 
                </Tabs>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    authInfo: state.adminLogin.authInfo,
    isLoggedIn: state.adminLogin.isLoggedIn,
})

export default connect(mapStateToProps)(withRouter(LoginTabset))

