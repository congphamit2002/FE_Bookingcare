import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DoctorManage.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { manageActions } from '../../../utils';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { NumericFormat } from 'react-number-format';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class DoctorManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            optionDoctor: [],
            contentHTML: '',
            contentMarkDown: '',
            description: '',
            inforDoctorDetail: {},
            isUpdate: false,

            //doctor infor state
            selectedPrice: null,
            optionPrice: [],
            selectedPayment: null,
            optionPayment: [],
            selectedProvince: null,
            optionProvince: [],
            clinicName: '',
            clinicAddress: '',
            note: '',
            doctorInfor: {}

        }
    }

    handleSelectedChange = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        });

        this.props.getDetailInforDoctorStart(selectedOption.value);

    };

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkDown: text
        })
    }

    handleOnchangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleSelectedChangeInforDoctor = (selectedOption, id) => {
        let stateCopy = this.state;
        stateCopy[id] = selectedOption;
        this.setState({
            ...stateCopy
        })

    }

    handleOnchangeInput = (event, id) => {
        let stateCopy = this.state;
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleValidateForm = () => {
        let { selectedOption, description, selectedPrice, selectedPayment, selectedProvince, clinicAddress, clinicName } = this.state
        if (!selectedOption) {
            toast.error('Please choose doctor');
            return false;
        }
        if (!description) {
            toast.error('Please enter description');
            return false;
        }
        if (!selectedPrice) {
            toast.error('Please choose price');
            return false;
        }
        if (!selectedPayment) {
            toast.error('Please choose payment');
            return false;
        }
        if (!selectedProvince) {
            toast.error('Please choose province');
            return false;
        }
        if (!clinicName) {
            toast.error('Please enter clinic name');
            return false;
        }
        if (!clinicAddress) {
            toast.error('Please choose clinic address');
            return false;
        }
        return true;
    }

    handleResetForm = (check) => {
        let { selectedOption } = this.state
        this.setState({
            description: '',
            contentHTML: '',
            contentMarkDown: '',
            isUpdate: false,
            selectedOption: check ? null : selectedOption,
            selectedPayment: null,
            selectedPrice: null,
            selectedProvince: null,
            clinicName: '',
            clinicAddress: '',
            note: '',
            isUpdate: false
        })
    }

    handleSaveInforDoctor = () => {
        let validate = this.handleValidateForm();
        if (!validate) {
            return;
        }
        this.props.saveInforDoctorStart({
            doctorId: this.state.selectedOption.value,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkDown,
            description: this.state.description,
            clinicName: this.state.clinicName,
            clinicAddress: this.state.clinicAddress,
            note: this.state.note,
            priceId: this.state.selectedPrice.value,
            provinceId: this.state.selectedProvince.value,
            paymentId: this.state.selectedPayment.value,
            actions: this.state.isUpdate ? manageActions.UPDATE : manageActions.CREATE
        })
        this.handleResetForm(true);

    }

    componentDidMount() {
        this.props.getAllDoctorStart();
        this.props.fetchDataDoctorInforSelectStart();
    }

    buildOptionsSelect = (inputData, type) => {
        let arrResult = []
        if (inputData && inputData.length > 0 && type === 'USERS') {
            inputData.map((item, index) => {
                let option = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                option.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn
                option.value = item.id
                arrResult = [...arrResult, option]
            })
        }

        if (inputData && inputData.length > 0 && type === 'PRICE') {
            inputData.map((item, index) => {
                let option = {};
                // let labelVi = `${item.valueVi} VND`
                let number = 10000
                let labelVi = (+item.valueVi).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
                let labelEn = (+item.valueEn).toLocaleString('en-US', { style: 'currency', currency: 'USD', });
                option.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn
                option.value = item.keyMap
                arrResult = [...arrResult, option]
            })
        }

        if (inputData && inputData.length > 0 && (type === 'PAYMENT' || type === 'PROVINCE')) {
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelectDoctor = this.buildOptionsSelect(this.props.allDoctors, 'USERS')
            this.setState({
                optionDoctor: dataSelectDoctor
            })
        }

        if (prevProps.doctorInfor !== this.props.doctorInfor) {
            let { dataPrice, dataPayment, dataProvince } = this.props.doctorInfor
            let dataSelectPrice = this.buildOptionsSelect(dataPrice, "PRICE");
            let dataSelectPayment = this.buildOptionsSelect(dataPayment, "PAYMENT");
            let dataSelectProvince = this.buildOptionsSelect(dataProvince, "PROVINCE");
            this.setState({
                optionPayment: dataSelectPayment,
                optionProvince: dataSelectProvince,
                optionPrice: dataSelectPrice
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelectDoctor = this.buildOptionsSelect(this.props.allDoctors, 'USERS')
            let { dataPrice, dataPayment, dataProvince } = this.props.doctorInfor
            let dataSelectPrice = this.buildOptionsSelect(dataPrice, "PRICE");
            let dataSelectPayment = this.buildOptionsSelect(dataPayment, "PAYMENT");
            let dataSelectProvince = this.buildOptionsSelect(dataProvince, "PROVINCE");
            // let currentSelectedPayment = null, currentSelectedPrice = null, currentSelectedProvince = null, currentSelectedOption;
            let { selectedOption, selectedPayment, selectedPrice, selectedProvince } = this.state

            let currentSelectedPayment = _.isNull(selectedPayment) ? null : dataSelectPayment.find(item => item.value === selectedPayment.value)
            let currentSelectedPrice = _.isNull(selectedPrice) ? null : dataSelectPrice.find(item => item.value === selectedPrice.value)
            let currentSelectedProvince = _.isNull(selectedProvince) ? null : dataSelectProvince.find(item => item.value === selectedProvince.value)
            let currentSelectedOption = _.isNull(selectedOption) ? null : dataSelectDoctor.find(item => item.value === selectedOption.value)

            this.setState({
                optionDoctor: dataSelectDoctor,
                optionPayment: dataSelectPayment,
                optionProvince: dataSelectProvince,
                optionPrice: dataSelectPrice,
                selectedOption: currentSelectedOption,
                selectedPrice: currentSelectedPrice,
                selectedPayment: currentSelectedPayment,
                selectedProvince: currentSelectedProvince
            })
        }

        if (prevProps.inforDoctorDetail !== this.props.inforDoctorDetail) {
            this.setState({
                inforDoctorDetail: this.props.inforDoctorDetail
            })

            let { inforDoctorDetail } = this.props;
            if (inforDoctorDetail && inforDoctorDetail.markdown && inforDoctorDetail.doctor_infor) {
                if (!inforDoctorDetail.markdown.description &&
                    !inforDoctorDetail.markdown.contentHTML &&
                    !inforDoctorDetail.markdown.contentMarkDown &&
                    !inforDoctorDetail.doctor_infor.clinicAddress &&
                    !inforDoctorDetail.doctor_infor.clinicName &&
                    !inforDoctorDetail.doctor_infor.paymentId &&
                    !inforDoctorDetail.doctor_infor.priceId &&
                    !inforDoctorDetail.doctor_infor.provinceId
                ) {

                    this.handleResetForm(false)
                } else {
                    let { paymentId, priceId, provinceId } = inforDoctorDetail.doctor_infor
                    let { optionPayment, optionPrice, optionProvince } = this.state
                    let selectedPayment = optionPayment.find(item => item && item.value === paymentId)
                    let selectedPrice = optionPrice.find(item => item && item.value === priceId)
                    let selectedProvince = optionProvince.find(item => item && item.value === provinceId)
                    console.log("selectedPayment ", selectedPayment)
                    console.log("selectedPrice ", selectedPrice)
                    console.log("selectedProvince ", selectedProvince)

                    this.setState({
                        description: inforDoctorDetail.markdown.description ? inforDoctorDetail.markdown.description : '',
                        contentHTML: inforDoctorDetail.markdown.contentHTML ? inforDoctorDetail.markdown.contentHTML : '',
                        contentMarkDown: inforDoctorDetail.markdown.contentMarkdown ? inforDoctorDetail.markdown.contentMarkdown : '',
                        clinicName: inforDoctorDetail.doctor_infor.clinicName ? inforDoctorDetail.doctor_infor.clinicName : '',
                        clinicAddress: inforDoctorDetail.doctor_infor.clinicAddress ? inforDoctorDetail.doctor_infor.clinicAddress : '',
                        note: inforDoctorDetail.doctor_infor.note ? inforDoctorDetail.doctor_infor.note : '',
                        selectedPayment: selectedPayment ? selectedPayment : null,
                        selectedProvince: selectedProvince ? selectedProvince : null,
                        selectedPrice: selectedPrice ? selectedPrice : null,
                        isUpdate: true
                    })
                }
            }
        }
    }

    render() {
        let { inforDoctorDetail, optionDoctor, optionPayment, optionPrice, optionProvince } = this.state;

        return (
            <div className='doctor-manage-container'>
                <div className='title my-3'>
                    <FormattedMessage id='doctor-infor.title' />
                </div>
                <div className='description-doctor mx-4'>
                    <div className='selected-doctor'>
                        <FormattedMessage id='doctor-infor.choose-doctor' />
                        <label ></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleSelectedChange}
                            options={optionDoctor}
                            placeholder={<FormattedMessage id='doctor-infor.choose-doctor' />}
                        />
                    </div>
                    <div className='infor-detail form-group'>
                        <FormattedMessage id='doctor-infor.doctor-detail' />
                        <label></label>
                        <textarea className='form-control' cols="50" rows="4"
                            onChange={(event) => { this.handleOnchangeDescription(event) }}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>

                <div className='row mx-3'>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id='doctor-infor.choose-price' />

                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={(selectedOption) => this.handleSelectedChangeInforDoctor(selectedOption, 'selectedPrice')}
                            options={optionPrice}
                            placeholder={<FormattedMessage id='doctor-infor.choose-price' />}

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id='doctor-infor.choose-payment' />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={(selectedOption) => this.handleSelectedChangeInforDoctor(selectedOption, 'selectedPayment')}
                            options={optionPayment}
                            placeholder={<FormattedMessage id='doctor-infor.choose-payment' />}

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id='doctor-infor.choose-province' />


                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={(selectedOption) => this.handleSelectedChangeInforDoctor(selectedOption, 'selectedProvince')}
                            options={optionProvince}
                            placeholder={<FormattedMessage id='doctor-infor.choose-province' />}

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id='doctor-infor.clinic-name' />


                        </label>
                        <input type='text' className='form-control'
                            onChange={(event) => { this.handleOnchangeInput(event, 'clinicName') }}
                            value={this.state.clinicName} />
                    </div>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id='doctor-infor.clinic-address' />

                        </label>
                        <input type='text' className='form-control'
                            onChange={(event) => { this.handleOnchangeInput(event, 'clinicAddress') }}
                            value={this.state.clinicAddress} />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='doctor-infor.note' /></label>
                        <input type='text' className='form-control'
                            onChange={(event) => { this.handleOnchangeInput(event, 'note') }}
                            value={this.state.note} />
                    </div>
                </div>
                <div className='editor mx-3'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkDown} />
                </div>

                <div>
                    <button className={this.state.isUpdate ? 'btn btn-warning mx-3 my-3 px-3' : 'btn btn-primary mx-3 my-3 px-3'}
                        onClick={() => { this.handleSaveInforDoctor() }}
                    >{this.state.isUpdate ? <FormattedMessage id='doctor-infor.save' /> : <FormattedMessage id='doctor-infor.create' />}</button>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        inforDoctorDetail: state.admin.inforDoctorDetail,
        doctorInfor: state.admin.doctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUserStart: () => dispatch(actions.getAllUserStart()),
        getAllDoctorStart: () => dispatch(actions.getAllDoctorStart()),
        saveInforDoctorStart: (data) => dispatch(actions.saveInforDoctorStart(data)),
        getDetailInforDoctorStart: (id) => dispatch(actions.getDetailInforDoctorStart(id)),
        fetchDataDoctorInforSelectStart: () => dispatch(actions.fetchDataDoctorInforSelectStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
