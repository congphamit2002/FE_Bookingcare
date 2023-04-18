import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class FacilitiesSection extends Component {

    render() {
        return (
            <>
                <div className='section-container facility-section'>
                    <div className='section-content'>
                        <div className='section-content-up'>
                            <span className='content-text'>Cơ sở y tế nổi bật</span>
                            <button className='btn-see-more'>XEM THÊM</button>
                        </div>

                        <div className='section-content-down'>
                            <div className='section-slider'>
                                <Slider {...this.props.settings}>
                                    <div className='slider-item'>
                                        <div className='section-slider-img facilities-img'></div>
                                        <div className='slider-text'>Phòng khám đa khoa Singapore Indochina Healthcare Group (SIHG)</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img facilities-img'></div>
                                        <div className='slider-text'>Phòng khám đa khoa Singapore Indochina Healthcare Group (SIHG)</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img facilities-img'></div>
                                        <div className='slider-text'>Phòng khám đa khoa Singapore Indochina Healthcare Group (SIHG)</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img facilities-img'></div>
                                        <div className='slider-text'>Phòng khám đa khoa Singapore Indochina Healthcare Group (SIHG)</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img facilities-img'></div>
                                        <div className='slider-text'>Phòng khám đa khoa Singapore Indochina Healthcare Group (SIHG)</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img facilities-img'></div>
                                        <div className='slider-text'>Phòng khám đa khoa Singapore Indochina Healthcare Group (SIHG)</div>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FacilitiesSection);
