import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
        this.state = {
            username: '',
            password: '',
            isShowHidePassword: false,
            errMessage: ''
        }
    }

    handleOnchangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async (event) => {
        this.setState({
            errMessage: ''
        });

        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login success')
            }
        } catch (error) {
            console.log('in catch')
            // if (error.respone) {
            //     console('has respone')
            //     if (error.responerror.data) {
            //         console.log('has data')
            //         this.setState({
            //             errMessage: error.response.data.message
            //         })
            //     }
            // }

            this.setState({
                errMessage: error.response.data.message
            })
        }
    }

    handleOnclickShowHidePass = (event) => {
        this.setState({
            isShowHidePassword: !this.state.isShowHidePassword
        })
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-center login-text'>Login</div>
                        <div className='col-12 form-group login-input mt-3'>
                            <label className='input-label'>Username</label>
                            <input className='form-control input-text'
                                onChange={(event) => this.handleOnchangeUsername(event)}
                                type='text' placeholder='Enter your usename'></input>
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label className='input-label'>Password</label>
                            <div className='custom-input-password'>
                                <input className='form-control input-text'
                                    onChange={(event) => { this.handleOnchangePassword(event) }}
                                    type={this.state.isShowHidePassword ? 'text' : 'password'} placeholder='Enter your password'></input>
                                <i className={this.state.isShowHidePassword ? "fas fa-eye" : "fas fa-eye-slash"} onClick={(event) => this.handleOnclickShowHidePass(event)}></i>
                            </div>
                        </div>
                        <div className='col-12'>
                            <span style={{ color: "red" }}>{this.state.errMessage}</span>
                        </div>
                        <div className='col-12'>
                            <a className='forgot-pass'>Forgor password?</a>
                        </div>
                        <div className='col-12'>
                            <button onClick={(event) => { this.handleLogin(event) }} className='btn-login'>Login</button>
                        </div>


                        <div className='col-12 text-center mt-4 '>
                            <span className='other-login'>Or Sign Up Using</span>
                        </div>

                        <div className='col-12 social mt-3'>
                            <i className="fab fa-google google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
