import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class HandBookSections extends Component {

    render() {
        return (
            <>
                <div className='section-container handbook-section'>
                    <div className='section-content'>
                        <div className='section-content-up'>
                            <span className='content-text'>Cẩm nang</span>
                            <button className='btn-see-more'>TẤT CẢ BÀI VIẾT</button>
                        </div>

                        <div className='section-content-down'>
                            <div className='section-slider'>
                                <Slider {...this.props.settings}>
                                    <div className='slider-item'>
                                        <div className='section-slider-img handbook-img'></div>
                                        <div className='slider-text'>Top 5 bệnh viện, phòng khám Thần kinh uy tín Hà Nội (phần 4)</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img handbook-img'></div>
                                        <div className='slider-text'>Top 5 bệnh viện, phòng khám Thần kinh uy tín Hà Nội (phần 4)</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img handbook-img'></div>
                                        <div className='slider-text'>Top 5 bệnh viện, phòng khám Thần kinh uy tín Hà Nội (phần 4)</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img handbook-img'></div>
                                        <div className='slider-text'>Top 5 bệnh viện, phòng khám Thần kinh uy tín Hà Nội (phần 4)</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img handbook-img'></div>
                                        <div className='slider-text'>Top 5 bệnh viện, phòng khám Thần kinh uy tín Hà Nội (phần 4)</div>
                                    </div>
                                    <div className='slider-item'>
                                        <div className='section-slider-img handbook-img'></div>
                                        <div className='slider-text'>Top 5 bệnh viện, phòng khám Thần kinh uy tín Hà Nội (phần 4)</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBookSections);
