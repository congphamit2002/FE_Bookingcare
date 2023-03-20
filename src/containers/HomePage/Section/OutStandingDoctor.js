import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class OutStandingDoctor extends Component {

    render() {
        return (
            <>
                <div className='section-container doctor-section'>
                    <div className='section-content'>
                        <div className='section-content-up'>
                            <span className='content-text'>Bác sĩ nổi bật tuần qua</span>
                            <button className='btn-see-more'>TÌM KIẾMf</button>
                        </div>

                        <div className='section-content-down'>
                            <div className='section-slider'>
                                <Slider {...this.props.settings}>
                                    <div className='slider-item'>
                                        <div className='doctor-item-container'>
                                            <div className='img-outline'>
                                                <div className='section-slider-img doctor-img'></div>
                                            </div>
                                            <div className='slider-text text-center'>
                                                <div className='slide-text-up'><span>Khám Tại Trung Tâm Tiêu hóa Doctor Check</span></div>
                                                <div className='slide-text-down'><span>Tiêu hóa</span></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='slider-item'>
                                        <div className='doctor-item-container'>
                                            <div className='img-outline'>
                                                <div className='section-slider-img doctor-img'></div>
                                            </div>
                                            <div className='slider-text text-center'>
                                                <div className='slide-text-up'><span>Khám Tại Trung Tâm Tiêu hóa Doctor Check</span></div>
                                                <div className='slide-text-down'><span>Tiêu hóa</span></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='slider-item'>
                                        <div className='doctor-item-container'>
                                            <div className='img-outline'>
                                                <div className='section-slider-img doctor-img'></div>
                                            </div>
                                            <div className='slider-text text-center'>
                                                <div className='slide-text-up'><span>Khám Tại Trung Tâm Tiêu hóa Doctor Check</span></div>
                                                <div className='slide-text-down'><span>Tiêu hóa</span></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='slider-item'>
                                        <div className='doctor-item-container'>
                                            <div className='img-outline'>
                                                <div className='section-slider-img doctor-img'></div>
                                            </div>
                                            <div className='slider-text text-center'>
                                                <div className='slide-text-up'><span>Khám Tại Trung Tâm Tiêu hóa Doctor Check</span></div>
                                                <div className='slide-text-down'><span>Tiêu hóa</span></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='slider-item'>
                                        <div className='doctor-item-container'>
                                            <div className='img-outline'>
                                                <div className='section-slider-img doctor-img'></div>
                                            </div>
                                            <div className='slider-text text-center'>
                                                <div className='slide-text-up'><span>Khám Tại Trung Tâm Tiêu hóa Doctor Check</span></div>
                                                <div className='slide-text-down'><span>Tiêu hóa</span></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='slider-item'>
                                        <div className='doctor-item-container'>
                                            <div className='img-outline'>
                                                <div className='section-slider-img doctor-img'></div>
                                            </div>
                                            <div className='slider-text text-center'>
                                                <div className='slide-text-up'><span>Khám Tại Trung Tâm Tiêu hóa Doctor Check</span></div>
                                                <div className='slide-text-down'><span>Tiêu hóa</span></div>
                                            </div>
                                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
