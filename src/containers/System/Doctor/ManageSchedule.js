import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSchedule.scss'
import Select from 'react-select';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
import { LANGUAGES, dateFormat } from '../../../utils';
import { toast } from 'react-toastify';
import _ from 'lodash'
import moment from 'moment';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            optionDoctor: [],
            currentDate: '',
            rangeTime: []

        }
    }

    handleSelectedChange = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        });

    };

    handleOnchangeDatePicker = (date) => {
        console.log(date)
        this.setState({
            currentDate: date[0]
        })

    }

    handleChooseTime = (time) => {
        console.log('Check time ', time)
        let rangeTimeCopy = this.state.rangeTime
        if (rangeTimeCopy && rangeTimeCopy.length > 0) {
            rangeTimeCopy.map((item, index) => {
                if (time.id === item.id) {
                    item.isChoose = !item.isChoose;
                }
                return item;
            })
            this.setState({
                rangeTime: rangeTimeCopy
            })
        }
    }

    buildOptionsSelect = (inputData) => {
        let arrResult = []
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let option = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                option.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn
                option.value = item.id
                arrResult = [...arrResult, option]
            })
        }
        return arrResult
    }

    handleSaveData = () => {
        let { selectedOption, currentDate, rangeTime } = this.state
        if (_.isEmpty(selectedOption)) {
            toast.error('Please choose doctor')
            return;
        }

        if (!currentDate) {
            toast.error('Please choose date')
            return;
        }

        let rangeTimeChoose = []
        if (rangeTime && rangeTime.length > 0) {
            rangeTimeChoose = rangeTime.filter(item => item.isChoose === true)
        }
        let result = []
        let time = new Date(this.state.currentDate).getTime()
        // let time = moment(this.state.currentDate).format(dateFormat.SEND_TO_SERVER)

        if (rangeTimeChoose && rangeTimeChoose.length > 0) {
            rangeTimeChoose.map((item) => {
                let obj = {
                    maxNumber: 10,
                    date: time,
                    timeType: item.keyMap,
                    doctorId: this.state.selectedOption.value
                }
                result.push(obj)
                return result
            })
        }

        if (!result.length > 0) {
            toast.error('Please choose time')
            return;
        }
        console.log('check result ', result)
        this.props.createScheduleStart({
            data: result,
            doctorId: this.state.selectedOption.value,
            date: time
        })

    }

    componentDidMount() {
        this.props.getAllDoctorStart();
        this.props.fetchDataTimeStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildOptionsSelect(this.props.allDoctors)
            this.setState({
                optionDoctor: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildOptionsSelect(this.props.allDoctors)
            this.setState({
                optionDoctor: dataSelect
            })
        }

        if (prevProps.times !== this.props.times) {
            let copyTime = this.props.times
            copyTime.map((item) => {
                item.isChoose = false
                return item
            })
            this.setState({
                rangeTime: copyTime
            })
        }
    }


    render() {
        let { rangeTime } = this.state
        let yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
        return (
            <>
                <div className='manage-schedule-container'>
                    <div className='ms-content'>
                        <div className='ms-title my-4'>
                            <FormattedMessage id='manage-schedule.title' />
                        </div>
                        <div className='ms-doctor mb-4 mx-3'>
                            <div className='row'>
                                <div className='selected-doctor col-6'>
                                    <label>
                                        <FormattedMessage id='manage-schedule.choose-doctor' />

                                    </label>
                                    <Select
                                        value={this.state.selectedOption}
                                        onChange={this.handleSelectedChange}
                                        options={this.state.optionDoctor}
                                    />
                                </div>
                                <div className='ms-date col-6 form-group'>
                                    <label>
                                        <FormattedMessage id='manage-schedule.choose-date' />

                                    </label>
                                    <DatePicker
                                        onChange={this.handleOnchangeDatePicker}
                                        className='form-control'
                                        value={this.state.currentDate}
                                        minDate={yesterday}
                                    />
                                </div>
                                <div className='col-12 choose-schedule'>
                                    {
                                        rangeTime && rangeTime.length > 0 &&
                                        rangeTime.map((item, index) => {
                                            let valueEn = item.valueEn;
                                            let valueVi = item.valueVi;
                                            return (<button className={item.isChoose ? 'btn btn-warning btn-schedule' : 'btn btn-schedule'}
                                                onClick={() => this.handleChooseTime(item)}
                                            >
                                                {this.props.language === LANGUAGES.EN ? valueEn : valueVi}
                                            </button>)
                                        })
                                    }
                                </div>
                                <div className='col-12'>
                                    <button className='btn btn-primary px-2 my-3'
                                        onClick={() => { this.handleSaveData() }}
                                    >
                                        <FormattedMessage id='manage-schedule.save-schedule' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        times: state.admin.times
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorStart: () => dispatch(actions.getAllDoctorStart()),
        fetchDataTimeStart: () => dispatch(actions.fetchDataTimeStart()),
        createScheduleStart: (data) => dispatch(actions.createScheduleStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
