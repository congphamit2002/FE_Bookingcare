import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './DoctorProfile.scss'
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';
import localization from 'moment/locale/vi'

import moment from 'moment';
import { FormattedMessage } from 'react-intl';

class DoctorProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorProfile: {}
        }
    }

    componentDidMount() {
        let { timeData } = this.props
        if (timeData && !_.isNull(timeData) && timeData.doctorId) {
            this.props.fetchDataProfileDoctorStart(timeData.doctorId)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.timeData !== this.props.timeData) {
            let { timeData } = this.props
            console.log('check doctor id', timeData.doctorId)
            if (timeData && !_.isNull(timeData) && timeData.doctorId) {
                this.props.fetchDataProfileDoctorStart(timeData.doctorId)
            }
        }

        if (prevProps.doctorProfile !== this.props.doctorProfile) {
            this.setState({
                doctorProfile: this.props.doctorProfile
            })
        }
    }

    renderTime = (timeData) => {
        let { language } = this.props
        if (timeData && !_.isNull(timeData)) {
            let time = language === LANGUAGES.VI ? timeData.timeTypeData.valueEn : timeData.timeTypeData.valueVi
            let timeStamp = new Date(timeData.date).getTime()
            let date = language === LANGUAGES.VI
                ? moment.unix(timeStamp / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(timeStamp / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id='booking-modal.free-booking' /></div>
                </>
            )
        }
    }

    render() {
        let { doctorProfile } = this.state
        let { language } = this.props
        let priceVi = doctorProfile && doctorProfile.doctor_infor && doctorProfile.doctor_infor.priceData ? doctorProfile.doctor_infor.priceData.valueVi : '';
        let priceEn = doctorProfile && doctorProfile.doctor_infor && doctorProfile.doctor_infor.priceData ? doctorProfile.doctor_infor.priceData.valueEn : '';


        let nameEn = '';
        let nameVi = '';
        if (doctorProfile && doctorProfile.positionData) {
            nameVi = `${doctorProfile.positionData.valueVi}, ${doctorProfile.lastName} ${doctorProfile.firstName}`;
            nameEn = `${doctorProfile.positionData.valueEn}, ${doctorProfile.firstName} ${doctorProfile.lastName}`;
        }

        let { timeData, isShowDescription } = this.props
        return (
            <>
                <div className='intro-doctor'>
                    <div className='intro-left'>
                        <div className='doctor-img'

                            style={
                                { backgroundImage: `url(${doctorProfile && doctorProfile.image ? doctorProfile.image : ''})` }
                            }></div>

                    </div>
                    <div className='intro-right'>
                        <div className='doctor-name'>
                            <span>{this.props.language === LANGUAGES.EN ? nameEn : nameVi}</span>
                        </div>
                        {
                            isShowDescription && <div className='description'>
                                <span>
                                    {
                                        doctorProfile && doctorProfile.markdown && doctorProfile.markdown.description
                                        && <span>
                                            {doctorProfile.markdown.description}
                                        </span>
                                    }
                                </span>
                            </div>
                        }

                        {
                            !isShowDescription &&
                            this.renderTime(timeData)
                        }

                    </div>
                </div>
                <div className='price'>
                    <span><FormattedMessage id='booking-modal.price' />
                        {language === LANGUAGES.VI
                            ? (+priceVi).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                            : (+priceEn).toLocaleString('en-US', { style: 'currency', currency: 'USD', })}</span>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorProfile: state.admin.doctorProfile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDataProfileDoctorStart: (doctorId) => dispatch(actions.fetchDataProfileDoctorStart(doctorId))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
