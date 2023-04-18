import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router'



class OutStandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }

    componentDidMount() {
        this.props.getTopDoctorStart('3')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctors !== prevProps.doctors) {
            this.setState({
                arrDoctors: this.props.doctors
            })
        }
    }


    handleViewDetailDoctor = (item) => {
        console.log('id doctor ', item.id)
        if(this.props.history) {
            this.props.history.push(`/detail-doctor/${item.id}`)
        }
    }

    render() {
        let doctors = this.state.arrDoctors;
        return (
            <>
                <div className='section-container doctor-section'>
                    <div className='section-content'>
                        <div className='section-content-up'>
                            <span className='content-text'><FormattedMessage id='home-page.out-standing-doctor' /></span>
                            <button className='btn-see-more'><FormattedMessage id='home-page.more-infor' /></button>
                        </div>

                        <div className='section-content-down'>
                            <div className='section-slider'>
                                <Slider {...this.props.settings}>
                                    {
                                        doctors && doctors.length > 0 &&
                                        doctors.map((item, index) => {
                                            let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                            let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                            let imgBase64 = '';
                                            if (item.image) {
                                                imgBase64 = new Buffer(item.image, 'base64').toString('binary');
                                            }
                                            return (<div className='slider-item'>
                                                <div className='doctor-item-container'
                                                    onClick={() => { this.handleViewDetailDoctor(item) }}
                                                >
                                                    <div className='img-outline'>
                                                        <div className='section-slider-img doctor-img'
                                                            style={{ backgroundImage: `url(${imgBase64})` }}></div>
                                                    </div>
                                                    <div className='slider-text text-center'>
                                                        <div className='slide-text-up'><span>{this.props.language === LANGUAGES.EN ? nameEn : nameVi}</span></div>
                                                        <div className='slide-text-down'><span>Tiêu hóa</span></div>
                                                    </div>
                                                </div>
                                            </div>)
                                        })
                                    }
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
        isLoggedIn: state.user.isLoggedIn,
        doctors: state.admin.doctors,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

        getTopDoctorStart: (numberGet) => dispatch(actions.getTopDoctorStart(numberGet))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
