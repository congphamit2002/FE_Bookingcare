import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import SpecialtySection from './Section/SpecialtySection';
import FacilitiesSection from './Section/FacilitiesSection';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBookSection from './Section/HandBookSection';
import HomeFooter from './HomeFooter';
import HomeAboutUs from './HomeAboutUs';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

    render() {

        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };
        return (
            <>
                <HomeHeader />
                <SpecialtySection settings={settings} />
                <FacilitiesSection settings={settings} />
                <OutStandingDoctor settings={settings} />
                <HandBookSection settings={settings} />
                <HomeAboutUs />
                <HomeFooter />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
