import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ExtraInforDoctor.scss'
import { LANGUAGES } from '../../../utils';
import moment, { lang } from 'moment';
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl';

class ExtraInforDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inforDoctorDetail: {},
            isShowTable: false,
            clinicName: '',
            clinicAddress: '',
            note: '',
        }
    }

    componentDidMount() {
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.inforDoctorDetail !== this.props.inforDoctorDetail) {
            this.setState({
                inforDoctorDetail: this.props.inforDoctorDetail
            })

            let { inforDoctorDetail } = this.props;
            if (inforDoctorDetail) {
                if (
                    inforDoctorDetail.doctor_infor.clinicAddress &&
                    inforDoctorDetail.doctor_infor.clinicName
                ) {
                    this.setState({
                        clinicName: inforDoctorDetail.doctor_infor.clinicName ? inforDoctorDetail.doctor_infor.clinicName : '',
                        clinicAddress: inforDoctorDetail.doctor_infor.clinicAddress ? inforDoctorDetail.doctor_infor.clinicAddress : '',
                        note: inforDoctorDetail.doctor_infor.note ? inforDoctorDetail.doctor_infor.note : '',
                    })
                }
            }
        }

        if (prevProps.doctorId !== this.props.doctorId) {
            this.props.getDetailInforDoctorStart(+this.props.doctorId)

        }
    }


    handleShowHideTable = () => {
        this.setState({
            isShowTable: !this.state.isShowTable
        })
    }


    render() {
        let { language } = this.props;
        let { clinicName, clinicAddress, note } = this.state
        let { doctor_infor } = this.state.inforDoctorDetail
        let priceEn = doctor_infor && doctor_infor.priceData && doctor_infor.priceData.valueEn ? (+doctor_infor.priceData.valueEn).toLocaleString('en-US', { style: 'currency', currency: 'USD', }) : ''
        let priceVi = doctor_infor && doctor_infor.priceData && doctor_infor.priceData.valueVi ? (+doctor_infor.priceData.valueVi).toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : ''

        return (
            <div className='extra-inf-container'>
                <div className='extra-inf-content'>
                    <div className='content-up'>
                        <span className='content-title'><FormattedMessage id='extra-infor-doctor.clinic-address' /></span>
                        <span className='clinic-name'>{clinicName ? clinicName : ''}</span>
                        <span className='clinic-address'>{clinicAddress ? clinicAddress : ''}</span>
                    </div>
                    <div className='content-down'>
                        <span className='price'><FormattedMessage id='extra-infor-doctor.price' /></span>
                        {!this.state.isShowTable &&
                            <>
                                <span>{language === LANGUAGES.VI ? priceVi : priceEn} </span>
                                <span onClick={() => { this.handleShowHideTable() }}
                                    className='show-hide-table'
                                ><FormattedMessage id='extra-infor-doctor.see-detail' /></span></>
                        }

                        {
                            this.state.isShowTable &&
                            <div className='extra-table'>
                                <div className='table-up'>
                                    <div className='content-table-up'>
                                        <span className='table-price'><FormattedMessage id='extra-infor-doctor.price' /></span>
                                        <span>{language === LANGUAGES.VI ? priceVi : priceEn}</span>

                                    </div>
                                    <div className='content-table-down'>
                                        <span>{note}</span>
                                    </div>
                                </div>
                                <div className='table-down'>
                                    <span><FormattedMessage id='extra-infor-doctor.payment' /> {doctor_infor && doctor_infor.paymentData && LANGUAGES.EN === language ? doctor_infor.paymentData.valueEn : doctor_infor.paymentData.valueVi}</span>
                                </div>
                                <div className='show-hide-table'>
                                    <span onClick={() => { this.handleShowHideTable() }}
                                    ><FormattedMessage id='extra-infor-doctor.hide-detail' /></span>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        inforDoctorDetail: state.admin.inforDoctorDetail,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailInforDoctorStart: (id) => dispatch(actions.getDetailInforDoctorStart(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtraInforDoctor);
