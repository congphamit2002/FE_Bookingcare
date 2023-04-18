import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './DoctorSchedule.scss'
import { LANGUAGES } from '../../../utils';
import moment, { lang } from 'moment';
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl';
import ExtraInforDoctor from './ExtraInforDoctor';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDay: [],
            availableSchedule: [],
            doctorId: -1,
            isShowModal: false,
            timeData: {}
        }
    }

    componentDidMount() {
        let arrDay = this.buildSelectOptions()
        this.setState({
            arrDay: arrDay,
        })
    }

    handleCloseModal = () => {
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let arrDay = this.buildSelectOptions()
            this.setState({
                arrDay: arrDay
            })
        }

        if (prevProps.availableSchedule !== this.props.availableSchedule) {
            this.setState({
                availableSchedule: this.props.availableSchedule
            })
        }

        if (prevProps.doctorId !== this.props.doctorId) {
            console.log('into update doctor id')
            let { arrDay } = this.state
            this.setState({
                doctorId: this.props.doctorId
            })

            if (arrDay && arrDay.length > 0) {
                this.props.getAvailableScheduleStart(this.props.doctorId, +arrDay[0].value)
            }
        }
    }

    uppercaseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildSelectOptions = () => {
        let { language } = this.props
        let arrDay = []
        for (let i = 0; i < 7; i++) {
            let obj = {}
            if (i === 0) {
                if (language === LANGUAGES.EN) {
                    obj.label = 'Today ' + moment(new Date()).add(i, 'days').locale('en').format(' - DD/MM');
                } else {
                    obj.label = 'Hôm nay ' + moment(new Date()).add(i, 'days').format(' - DD/MM');
                }
            } else {
                if (language === LANGUAGES.EN) {
                    obj.label = this.uppercaseFirstLetter(moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM'));
                } else {
                    obj.label = this.uppercaseFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'));
                }
            }

            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            arrDay.push(obj)
        }
        return arrDay
    }

    handleOnChangeSelectDay = (event) => {
        this.props.getAvailableScheduleStart(this.state.doctorId, event.target.value)
    }

    handleClickScheduleTime = (dataTime) => {
        console.log(dataTime)
        this.setState({
            isShowModal: true,
            timeData: dataTime,
        })
    }

    render() {
        let { language } = this.props;
        let { arrDay, availableSchedule } = this.state;
        console.log('time datta', this.state.timeData)

        return (
            <>
                <div className='manage-schedule-container'>
                    <div className='ms-content-left'>
                        <div className='select-dropdown'>
                            <select
                                onChange={(event) => { this.handleOnChangeSelectDay(event) }}>
                                {
                                    arrDay && arrDay.length > 0 &&
                                    arrDay.map((item, index) => {
                                        return (
                                            <option key={index} value={item.value}
                                            >{item.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='calendar-icon'>
                            <span><i className="fas fa-calendar"></i><FormattedMessage id='doctor-schedule.schedule' /></span>
                        </div>
                        <div className='available-schedule'>
                            {
                                availableSchedule && availableSchedule.length > 0 ?
                                    availableSchedule.map((item, index) => {
                                        let valueVi = item.timeTypeData.valueVi
                                        let valueEn = item.timeTypeData.valueEn
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => { this.handleClickScheduleTime(item) }}
                                                className={language === LANGUAGES.EN ? 'btn-schedule schedule-en' : 'btn-schedule schedule-vi'}
                                            >
                                                {language === LANGUAGES.EN ? valueEn : valueVi}
                                            </button>
                                        )
                                    }) :
                                    <>
                                        <span className='no-schedule'><FormattedMessage id='doctor-schedule.no-schedule' /></span>
                                    </>

                            }
                        </div>
                        {
                            availableSchedule && availableSchedule.length > 0 &&
                            <div className='my-3'>
                                <span><FormattedMessage id='doctor-schedule.choose' /> <i className="far fa-hand-point-up"></i><FormattedMessage id='doctor-schedule.book-schedule' /></span>

                            </div>
                        }
                    </div>
                    <div className='ms-content-right'>
                        <ExtraInforDoctor doctorId={this.state.doctorId} />
                    </div>
                </div>

                <BookingModal isOpen={this.state.isShowModal}
                    handleCloseModal={this.handleCloseModal}
                    timeData={this.state.timeData}
                />
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        availableSchedule: state.admin.availableSchedule
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAvailableScheduleStart: (doctorId, date) => { dispatch(actions.getAvailableScheduleStart(doctorId, date)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
