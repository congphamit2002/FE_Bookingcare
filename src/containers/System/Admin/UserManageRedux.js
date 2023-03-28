import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { handleGetAllCode } from '../../../services/userService'
import { LANGUAGES, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserManageRedux.scss'
import Lightbox from 'react-image-lightbox';
import TableUserRedux from './TableUserRedux';
import 'react-image-lightbox/style.css';
import { manageActions } from '../../../utils/constant'

class UserManageRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrGender: [],
            arrRoles: [],
            arrPositions: [],
            isOpen: false,
            previewImg: '',

            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            avatar: '',
            role: '',
            position: '',
            gender: '',
            actions: '',
        }
    }

    componentDidMount() {
        this.props.fetchDataGenderStart();
        this.props.fetchDataRoleStart();
        this.props.fetchDataPositionStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                arrGender: this.props.genders,
                gender: this.props.genders && this.props.genders.length > 0 ? this.props.genders[0].keyMap : ''
            })
        }

        if (this.props.roles !== prevProps.roles) {
            this.setState({
                arrRoles: this.props.roles,
                role: this.props.roles && this.props.roles.length > 0 ? this.props.roles[0].keyMap : ''
            })
        }

        if (this.props.positions !== prevProps.positions) {
            this.setState({
                arrPositions: this.props.positions,
                position: this.props.positions && this.props.positions.length > 0 ? this.props.positions[0].keyMap : ''
            })
        }

        if (this.props.listUser !== prevProps.listUser) {
            this.setState({
                id: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                avatar: '',
                actions: manageActions.CREATE,
                role: this.state.arrRoles && this.state.arrRoles.length > 0 ? this.state.arrRoles[0].keyMap : '',
                position: this.state.arrPositions && this.state.arrPositions.length > 0 ? this.state.arrPositions[0].keyMap : '',
                gender: this.state.arrGender && this.state.arrGender.length > 0 ? this.state.arrGender[0].keyMap : '',
                previewImg: ''
            })
        }
    }

    handlePreviewImage = async (event) => {
        let files = event.target.files; // FileList object
        let imgBase64 = '';
        let f = files[0];
        if (f) {
            imgBase64 = await CommonUtils.toBase64(f);
            let objectUrl = window.URL.createObjectURL(f);
            this.setState({
                previewImg: objectUrl,
                avatar: imgBase64
            })
        } else {
            this.setState({
                previewImg: ''
            })
        }
    }

    openPreviewImg = () => {
        if (this.state.previewImg === '') {
            return;
        }
        this.setState({
            isOpen: true
        })
    }


    handleOnchangeInput = (event, id) => {
        let copyState = this.state;
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleValidateForm = () => {
        let arrState = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber'];
        let isValid = true;
        for (let i = 0; i < arrState.length; i++) {
            if (!this.state[arrState[i]]) {
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    handleOnCreateUser = () => {
        let check = this.handleValidateForm();
        if (check) {
            let { actions } = this.state
            if (actions === manageActions.CREATE) {
                this.props.createUserStart({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phonenumber,
                    avatar: this.state.avatar,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    gender: this.state.gender
                })
            }
            if (actions === manageActions.UPDATE) {
                this.setState({
                    actions: manageActions.CREATE
                })
                this.props.updateUserStart({
                    id: this.state.id,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phonenumber,
                    avatar: this.state.avatar,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    gender: this.state.gender
                })
            }

        } else {
            alert('Missing data')
        }
    }

    handleOnDeleteUser = (userId) => {
        this.props.deleteUserStart(userId)
    }

    handleFillUserUpdate = (user) => {
        console.log('check user', user)
        let imgBase64 = '';
        if (user.image) {
            imgBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            id: user.id,
            email: user.email,
            password: 'avc',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phonenumber: user.phonenumber,
            avatar: '',
            role: user.roleId,
            position: user.positionId,
            gender: user.gender,
            actions: manageActions.UPDATE,
            previewImg: imgBase64
        })
    }


    render() {
        let genders = this.state.arrGender;
        let roles = this.state.arrRoles;
        let positions = this.state.arrPositions;
        console.log('check state ', this.state)

        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-4'>
                            <label className='email'>Email: </label>
                            <input type='email'
                                disabled={this.state.actions === manageActions.UPDATE ? true : false}
                                className='form-control' onChange={(event) => { this.handleOnchangeInput(event, "email") }}
                                value={this.state.email} />
                        </div>
                        <div className='col-4'>
                            <label className='email'>Password: </label>
                            <input type='password'
                                disabled={this.state.actions === manageActions.UPDATE ? true : false}
                                className='form-control' onChange={(event) => { this.handleOnchangeInput(event, "password") }}
                                value={this.state.password} />
                        </div>

                        <div className='col-4'>
                            <label className='email'>Phone number: </label>
                            <input type='text' className='form-control' onChange={(event) => { this.handleOnchangeInput(event, "phonenumber") }}
                                value={this.state.phonenumber} />
                        </div>
                        <div className='col-4'>
                            <label className='email'>First Name: </label>
                            <input type='text' className='form-control' onChange={(event) => { this.handleOnchangeInput(event, "firstName") }}
                                value={this.state.firstName} />
                        </div>
                        <div className='col-4'>
                            <label className='email'>Last Name: </label>
                            <input type='text' className='form-control' onChange={(event) => { this.handleOnchangeInput(event, "lastName") }}
                                value={this.state.lastName} />
                        </div>
                        <div className='col-4'>
                            <label className='email'>Address: </label>
                            <input type='text' className='form-control' onChange={(event) => { this.handleOnchangeInput(event, "address") }}
                                value={this.state.address} />
                        </div>
                        <div className='col-3'>
                            <label className='email'>Gender: </label>
                            <select id="gender" className="form-control"
                                value={this.state.gender}
                                onChange={(event) => { this.handleOnchangeInput(event, 'gender') }}>
                                {
                                    genders && genders.length > 0
                                    && genders.map((item, index) => {
                                        return <option key={index} value={item.keyMap}>{this.props.language === LANGUAGES.EN
                                            ? item.valueEn : item.valueVi}</option>
                                    })

                                }
                            </select>
                        </div>
                        <div className='col-3'>
                            <label className='email'>Role: </label>
                            <select id="roles" className="form-control"
                                value={this.state.role}
                                onChange={(event) => { this.handleOnchangeInput(event, 'role') }}>
                                {
                                    roles && roles.length > 0
                                    && roles.map((item, index) => {
                                        return <option key={index} value={item.keyMap}>{this.props.language === LANGUAGES.EN
                                            ? item.valueEn : item.valueVi}</option>
                                    })

                                }
                            </select>
                        </div>
                        <div className='col-3'>
                            <label className='email'>Position: </label>
                            <select id="positions" className="form-control"
                                value={this.state.position}
                                onChange={(event) => { this.handleOnchangeInput(event, 'position') }}>
                                {
                                    positions && positions.length > 0
                                    && positions.map((item, index) => {
                                        return <option key={index} value={item.keyMap}>{this.props.language === LANGUAGES.EN
                                            ? item.valueEn : item.valueVi}</option>
                                    })

                                }
                            </select>
                        </div>

                        <div className='col-3 upload-file'>
                            <label>Avatar: </label>
                            <input type='file' id='preview-img' className='form-control' onChange={(event) => { this.handlePreviewImage(event) }} hidden />
                            <label
                                className='preview-img'
                                htmlFor='preview-img'>Tải ảnh
                                <i className="fas fa-upload mx-2"></i>
                            </label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImg})` }}
                                onClick={() => { this.openPreviewImg() }}
                            >
                                {this.state.isOpen && (
                                    <Lightbox
                                        mainSrc={this.state.previewImg}
                                        onCloseRequest={() => this.setState({ isOpen: false })}
                                    />
                                )}
                            </div>
                        </div>

                        <div className='col-12 my-2' >
                            <button className={this.state.actions === manageActions.UPDATE ? 'btn btn-warning px-3 btn-submit' : 'btn btn-primary  px-3 btn-submit'}
                                onClick={() => { this.handleOnCreateUser() }}
                            ><FormattedMessage id={this.state.actions === manageActions.UPDATE ? 'home-header.update-user' : 'home-header.submit-user'} /></button>
                        </div>
                    </div>
                </div>



                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <TableUserRedux
                                handleOnDeleteUser={this.handleOnDeleteUser}
                                handleFillUserUpdate={this.handleFillUserUpdate} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        roles: state.admin.roles,
        positions: state.admin.positions,
        listUser: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDataGenderStart: () => dispatch(actions.fetchDataGenderStart()),
        fetchDataRoleStart: () => dispatch(actions.fetchDataRoleStart()),
        fetchDataPositionStart: () => dispatch(actions.fetchDataPositionStart()),
        createUserStart: (data) => dispatch(actions.createUserStart(data)),
        deleteUserStart: (userId) => dispatch(actions.deleteUserStart(userId)),
        updateUserStart: (data) => dispatch(actions.updateUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
