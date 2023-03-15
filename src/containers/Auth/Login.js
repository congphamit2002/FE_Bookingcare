import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-center login-text'>Login</div>
                        <div className='col-12 form-group login-input mt-3'>
                            <label className='input-label'>Username</label>
                            <input className='form-control input-text' type='text' placeholder='Enter your usename'></input>
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label className='input-label'>Password</label>
                            <input className='form-control input-text' type='password' placeholder='Enter your password'></input>
                        </div>
                        <div className='col-12'>
                            <a className='forgot-pass'>Forgor password?</a>
                        </div>
                        <div className='col-12'>
                            <button className='btn-login'>Login</button>
                        </div>


                        <div className='col-12 text-center mt-4 '>
                            <span className='other-login'>Or Sign Up Using</span>
                        </div>

                        <div className='col-12 social mt-3'>
                            <i class="fab fa-google google"></i>
                            <i class="fab fa-facebook-f facebook"></i>
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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
