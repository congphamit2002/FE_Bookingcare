import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class SpecialtySection extends Component {

    render() {
        console.log(this.props.settings)
        return (
            <>
                <div className='section-container'>
                    <div className='section-content'>
                        <div className='section-content-up'>
                            <span className='content-text'>Chuyên khoa phổ biến</span>
                            <button className='btn-see-more'>XEM THÊM</button>
                        </div>

                        <div className='section-content-down'>
                            <div className='section-slider'>
                                <Slider {...this.props.settings}>
                                    <div className='slider-item'>
                                        <div className='section-slider-img specialty-img'></div>
                                        <div className='slider-text'>Cơ xương khớp</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img specialty-img'></div>
                                        <div className='slider-text'>Cơ xương khớp</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img specialty-img'></div>
                                        <div className='slider-text'>Cơ xương khớp</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img specialty-img'></div>
                                        <div className='slider-text'>Cơ xương khớp</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img specialty-img'></div>
                                        <div className='slider-text'>Cơ xương khớp</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img specialty-img'></div>
                                        <div className='slider-text'>Cơ xương khớp</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtySection);
