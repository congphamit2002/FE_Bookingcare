import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash'

class UserManageModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        let userData = this.props.userData
        console.log(userData)
        if (userData && !_.isEmpty(userData)) {
            this.setState({
                id: userData.id,
                email: userData.email,
                password: 'abc',
                firstName: userData.firstName,
                lastName: userData.lastName,
                address: userData.address
            })
        }

    }

    toggle = () => {
        this.props.toggleUserEditModal();
    }

    handleOnchangeInput = (event, id) => {
        let copyState = this.state;
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleValidateForm = () => {
        let arrState = ['email', 'password', 'firstName', 'lastName', 'address'];
        let isValid = true;
        for (let i = 0; i < arrState.length; i++) {
            if (!this.state[arrState[i]]) {
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    handleUpdateUser = () => {
        let check = this.handleValidateForm();
        if (check === true) {
            this.props.handleUpdateUser(this.state)
        }
    }

    render() {
        return (
            < div >
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={this.toggle}
                    centered='true'
                    size='lg'
                    className={'modal-user-container'}>
                    <ModalHeader toggle={this.toggle}>Create new user</ModalHeader>
                    <ModalBody>
                        <div className='modal-user-body'>
                            <div className='input-container'>
                                <label>Email: </label>
                                <input type='text'
                                    disabled
                                    value={this.state.email}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'email') }}></input>
                            </div>
                            <div className='input-container'>
                                <label>Password: </label>
                                <input type='password'
                                    disabled
                                    value={this.state.password}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'password') }}></input>
                            </div>
                            <div className='input-container'>
                                <label>First Name: </label>
                                <input type='text'
                                    value={this.state.firstName}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'firstName') }}
                                ></input>
                            </div>

                            <div className='input-container'>
                                <label>Last Name: </label>
                                <input type='text'
                                    value={this.state.lastName}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'lastName') }}></input>
                            </div>
                            <div className='input-container input-full'>
                                <label>Address: </label>
                                <input type='text'
                                    value={this.state.address}
                                    onChange={(event) => { this.handleOnchangeInput(event, 'address') }}></input>
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary px-3" onClick={() => this.handleUpdateUser()}>Edit user</Button>{' '}
                        <Button color="secondary px-3" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </ div >
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageModal);

