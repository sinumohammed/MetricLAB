import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import AuthenticationService from "../services/AuthenticationService";

class Login extends Component {
    state = {
        email: 'sinumohammed@gmail.com',
        password: 'password',
        showPassword: false,
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    login = async event => {
        try {
            event.preventDefault();
            this.setState({ submitted: true });
            const { email, password } = this.state;
            if (email && password) {

                // Load async data from an inexistent endpoint.
                const response = await AuthenticationService.login({
                    email: email,
                    password: password
                });
                let auth = {
                    user: response.data.user,
                    token: response.data.token
                }
                this.props.onLogin(auth);
                this.props.history.push('/')

            }
        } catch (e) {
            console.log(`Login failed: ${e}`);
        }
    }

    async componentDidMount() {
    }

    render() {
        return (
            <form>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" value={this.state.email} placeholder="Enter email" onChange={this.handleChange('email')} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={this.state.password} placeholder="Enter password" onChange={this.handleChange('password')} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={(event) => { this.login(event) }}>Login</button>
                <p className="forgot-password text-right">
                    Not a member yet<Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </p>
            </form>
        );
    }
}
const mapStateToProps = state => {
    return {
        tkn: state.token,
        usr: state.user,
        auth: state.isUserLoggedIn
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogin: (payload) => dispatch({ type: 'LOGIN_SUCCESS', token: payload.token, user: payload.user })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)