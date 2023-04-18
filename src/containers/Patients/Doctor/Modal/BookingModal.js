import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions'
import './BookingModal.scss'
import { Modal, ModalBody, } from 'reactstrap';
import { LANGUAGES } from '../../../../utils';
import DatePicker from '../../../../components/Input/DatePicker'
import DoctorProfile from '../DoctorProfile';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import _, { times } from 'lodash';
import { handleCreateAnAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            optionGender: [],
            timeData: {}
        }
    }

    componentDidMount() {
        this.props.fetchDataGenderStart();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let arrGender = this.buildOptionsSelect(this.props.genders)
            this.setState({
                optionGender: arrGender
            })
        }
        if (this.props.genders !== prevProps.genders) {
            let { genders } = this.props
            if (genders && genders.length > 0) {
                let arrGender = this.buildOptionsSelect(this.props.genders)
                this.setState({
                    optionGender: arrGender
                })
            }
        }

        if (this.props.timeData !== prevProps.timeData) {
            let doctorId = ''
            if (this.props.timeData && !_.isNull(this.props.timeData)) {
                let { timeData } = this.props
                doctorId = this.props.timeData.doctorId
                this.setState({
                    doctorId: doctorId,
                    timeData: timeData
                })
            }
        }
    }



    buildOptionsSelect = (inputData, type) => {
        let arrResult = []
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let option = {};
                let labelVi = `${item.valueVi}`
                let labelEn = `${item.valueEn}`
                option.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn
                option.value = item.keyMap
                arrResult = [...arrResult, option]
            })
        }
        return arrResult
    }

    handleOnchangeInput = (event, id) => {
        let copyState = this.state;
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })

    }

    renderTime = (timeData) => {
        console.log('time data', timeData)
        let { language } = this.props
        if (timeData && !_.isNull(timeData)) {
            let time = language === LANGUAGES.VI ? timeData.timeTypeData.valueEn : timeData.timeTypeData.valueVi
            let timeStamp = new Date(timeData.date).getTime()
            let date = language === LANGUAGES.VI
                ? moment.unix(timeStamp / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(timeStamp / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                `${time} - ${date}`
            )
        }
    }

    handleCreateBooking = async () => {
        let { doctorId, fullName, phoneNumber, email, address, reason, birthday, timeData, selectedGender } = this.state
        let data = {
            doctorId: doctorId,
            email: email,
            timeType: timeData.timeType,
            date: new Date(timeData.date).getTime(),
            gender: selectedGender.value,
            address: address,
            phonenumber: phoneNumber,
            fullName: fullName,
            timeBook: this.renderTime(timeData),
            language: this.props.language,
            doctorName: timeData.doctorData && this.props.language === LANGUAGES.VI ? `${timeData.doctorData.firstName} ${timeData.doctorData.lastName}`
                : `${timeData.doctorData.lastName} ${timeData.doctorData.firstName}`
        }
        let res = await handleCreateAnAppointment(data);
        if (res && res.errCode === 0) {
            toast.success('Save an appointment success')
            this.props.handleCloseModal()
        } else {
            toast.error('Save an appointment failed')

        }
    }

    handleSelectedChange = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        });

    };

    render() {
        let { isOpen, handleCloseModal, timeData } = this.props
        return (
            <>
                <Modal
                    isOpen={isOpen}
                    centered='true'
                    size='lg'
                    className={'booking-modal-container'}>
                    <div className='b-modal-header'>
                        <div className='header-title'>
                            <span><FormattedMessage id='booking-modal.title' /></span>
                        </div>
                        <div className='header-icon'>
                            <span
                                onClick={handleCloseModal}
                            ><i class="fas fa-times"></i></span>
                        </div>
                    </div>
                    <div className='b-modal-body'>
                        <div className='body-up'>
                            <DoctorProfile timeData={timeData}
                                isShowDescription={false}
                            />
                        </div>
                        <div className='body-down'>
                            <div className='row'>
                                <div className='form-group col-6'>
                                    <label><FormattedMessage id='booking-modal.name' /></label>
                                    <input type='text'
                                        onChange={(event) => { this.handleOnchangeInput(event, 'fullName') }}
                                        value={this.state.fullName}
                                        className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label><FormattedMessage id='booking-modal.phone' /></label>
                                    <input type='text'
                                        onChange={(event) => { this.handleOnchangeInput(event, 'phoneNumber') }}
                                        value={this.state.phoneNumber}
                                        className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label><FormattedMessage id='booking-modal.email' /></label>
                                    <input type='text'
                                        onChange={(event) => { this.handleOnchangeInput(event, 'email') }}
                                        value={this.state.email}
                                        className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label><FormattedMessage id='booking-modal.address' /></label>
                                    <input type='text'
                                        onChange={(event) => { this.handleOnchangeInput(event, 'address') }}
                                        value={this.state.address}
                                        className='form-control' />
                                </div>
                                <div className='form-group col-12'>
                                    <label><FormattedMessage id='booking-modal.reason' /></label>
                                    <input type='text'
                                        onChange={(event) => { this.handleOnchangeInput(event, 'reason') }}
                                        value={this.state.reason}
                                        className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label><FormattedMessage id='booking-modal.birthday' /></label>
                                    <DatePicker
                                        onChange={this.handleOnchangeDatePicker}
                                        className='form-control'
                                    />
                                </div>
                                <div className='form-group col-6'>
                                    <label><FormattedMessage id='booking-modal.gender' /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleSelectedChange}
                                        options={this.state.optionGender}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='b-modal-footer'>
                        <div className='gr-btn'>
                            <button className='btn btn-accept'
                                onClick={() => { this.handleCreateBooking() }}
                            ><FormattedMessage id='booking-modal.confirm' /></button>
                            <button
                                onClick={this.props.handleCloseModal}
                                className='btn btn-cancel'><FormattedMessage id='booking-modal.cancel' /></button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        genders: state.admin.genders,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDataGenderStart: () => dispatch(actions.fetchDataGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
