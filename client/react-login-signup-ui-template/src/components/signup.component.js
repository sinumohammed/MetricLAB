import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthenticationService from "../services/AuthenticationService";

export default class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: 'sinumohammed@gmail.com',
        password: 'password'
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    signup = async event => {
        try {
            event.preventDefault();
            this.setState({ submitted: true });
            const { email, password, firstName, lastName } = this.state;
            if (email && password) {

                // Load async data from an inexistent endpoint.
                const response = await AuthenticationService.register({
                    name: firstName + ' ' + lastName,
                    email: email,
                    password: password
                });
                this.props.history.push('/sign-in');

            }
        } catch (e) {
            console.log(`Registration failed: ${e}`);
        }
    }
    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleChange('firstName')} placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" value={this.state.lastName} onChange={this.handleChange('lastName')} placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" value={this.state.email} onChange={this.handleChange('email')} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.handleChange('password')} placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={(event) => { this.signup(event) }}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered<Link className="nav-link" to={"/sign-in"}>sign in?</Link>
                </p>
            </form>
        );
    }
}