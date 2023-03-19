import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/images/logo.svg'
import { FormattedMessage } from 'react-intl';
import { changLanguageApp } from '../../store/actions/appActions';
import { LANGUAGES } from '../../utils'

class HomeHeader extends Component {

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        console.log('check props ', this.props)
        return (
            <div>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='header-content-left'>
                            <i className="fas fa-bars"></i>
                            <img src={logo}></img>
                        </div>
                        <div className='header-content-center'>
                            <div className='header-menu'>
                                <div className='menu-child-up'><FormattedMessage id='home-header.specialist'></FormattedMessage></div>
                                <div className='menu-child-down'><FormattedMessage id='home-header.search-doctor' /></div>
                            </div>

                            <div className='header-menu'>
                                <div className='menu-child-up'><FormattedMessage id='home-header.health-facilities' /></div>
                                <div className='menu-child-down'><FormattedMessage id='home-header.choose-hospital' /></div>
                            </div>

                            <div className='header-menu'>
                                <div className='menu-child-up'><FormattedMessage id='home-header.doctor' /></div>
                                <div className='menu-child-down'><FormattedMessage id='home-header.choose-doctor' /></div>
                            </div>

                            <div className='header-menu'>
                                <div className='menu-child-up'><FormattedMessage id="home-header.checkup-package" /></div>
                                <div className='menu-child-down'><FormattedMessage id='home-header.general-health' /></div>
                            </div>

                        </div>
                        <div className='header-content-right'>
                            <div className='header-content-help'>
                                <i class="fas fa-question-circle"></i>
                                <div><span><FormattedMessage id="home-header.help" /></span></div>
                            </div>
                            <div className='header-content-language'>
                                <div className={this.props.lang === 'en' ? 'language-en active' : 'language-en'}>
                                    <span onClick={() => { this.handleChangeLanguage(LANGUAGES.EN) }}>EN</span></div>
                                <div className={this.props.lang === 'vi' ? 'language-vi active' : 'language-vi'}>
                                    <span
                                        onClick={() => { this.handleChangeLanguage(LANGUAGES.VI) }}>VI</span></div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='home-banner-container'>
                    <div className='home-banner-content'>
                        <div className='banner-content-up'>
                            <div className='content-title-up'><FormattedMessage id="home-banner.medical-background" /></div>
                            <div className='content-title-down'><FormattedMessage id="home-banner.health-care" /></div>
                            <div className='content-search'>
                                <i className="fas fa-search"></i>
                                <input type='text' />
                            </div>

                        </div>
                        <div className='banner-content-down'>
                            <ul className='options-list'>
                                <li className='options-child'>
                                    <i className="far fa-hospital"></i>
                                    <div className='options-child-text'>
                                        <span><FormattedMessage id="home-banner.specialty-examination" /></span>
                                    </div>
                                </li>
                                <li className='options-child'>
                                    <i className="fas fa-mobile-alt"></i>
                                    <div className='options-child-text'>
                                        <span><FormattedMessage id="home-banner.remote-examination" /></span>
                                    </div>
                                </li>
                                <li className='options-child'>
                                    <i className="fas fa-procedures"></i>
                                    <div className='options-child-text'>
                                        <span><FormattedMessage id="home-banner.general-examination" /></span>
                                    </div>
                                </li>
                                <li className='options-child'>
                                    <i className="fas fa-flask"></i>
                                    <div className='options-child-text'>
                                        <span><FormattedMessage id="home-banner.medical-test" /></span>
                                    </div>
                                </li>
                                <li className='options-child'>
                                    <i class="fas fa-heart"></i>
                                    <div className='options-child-text'>
                                        <span><FormattedMessage id="home-banner.mental-health" /></span>
                                    </div>
                                </li>
                                <li className='options-child'>
                                    <i class="fas fa-user-md"></i>
                                    <div className='options-child-text'>
                                        <span><FormattedMessage id="home-banner.dental-examination" /></span>
                                    </div>
                                </li>
                                <li className='options-child'>
                                    <i class="fas fa-archive"></i>
                                    <div className='options-child-text'>
                                        <span><FormattedMessage id="home-banner.surgery-package" /></span>
                                    </div>
                                </li>
                                <li className='options-child'>
                                    <i class="fas fa-ambulance"></i>
                                    <div className='options-child-text'>
                                        <span><FormattedMessage id="home-banner.medical-products" /></span>
                                    </div>
                                </li>

                                <li className='options-child'>
                                    <i class="fas fa-notes-medical"></i>
                                    <div className='options-child-text'>
                                        <span><FormattedMessage id="home-banner.company-health" /></span>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div >
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
