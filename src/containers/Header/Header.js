import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { LANGUAGES, Role } from '../../utils';
import { changLanguageApp } from '../../store/actions/appActions'
import { FormattedMessage } from 'react-intl';
import './Header.scss';
import _ from 'lodash';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            menuApp: []
        })
    }

    handleChangeLanguage = (language) => {
        this.props.changLanguageApp(language)
    }

    componentDidMount() {
        const { userInfo } = this.props;
        if (userInfo && !_.isEmpty(userInfo) && userInfo.roleId && userInfo.roleId === Role.ADMIN) {
            this.setState({
                menuApp: adminMenu
            })
        }

        if (userInfo && !_.isEmpty(userInfo) && userInfo.roleId && userInfo.roleId === Role.DOCTOR) {
            this.setState({
                menuApp: doctorMenu
            })
        }
    }

    render() {
        const { processLogout, userInfo } = this.props;
        const { menuApp } = this.state
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={menuApp} />
                </div>

                {/* nút logout */}
                <div className='header-right'>
                    <div className='header-welcome'>
                        <span><FormattedMessage id='home-header.welcome' />{userInfo && userInfo.firstName ? userInfo.firstName : ""}</span>
                    </div>
                    <div className={this.props.lang === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => {
                        this.handleChangeLanguage(LANGUAGES.EN)
                    }}>EN</span></div>
                    <div className={this.props.lang === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => {
                        this.handleChangeLanguage(LANGUAGES.VI)
                    }}>VN</span></div>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changLanguageApp: (language) => dispatch(changLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
