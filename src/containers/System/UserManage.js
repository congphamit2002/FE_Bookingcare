import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { handleGetAllUsersService, handleCreateNewUserService, handleUpdateUserService, handleDeleteUserService } from '../../services/userService'
import './UserManage.scss'
import UserManageModal from './UserManageModal'
import UserEditModal from './UserEditModal';
import { emitter } from '../../utils/emitter'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isShowModal: false,
            isShowEditModal: false,
            userData: {}
        }
    }

    async componentDidMount() {
        await this.handleGetAllUser()
    }

    handleGetAllUser = async () => {
        let res = await handleGetAllUsersService('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrUsers: res.userData
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isShowModal: true
        })
    }

    handleClickEditUser = (data) => {
        this.setState({
            isShowEditModal: true,
            userData: data
        })
    }

    toggleUserManageModal = () => {
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isShowEditModal: !this.state.isShowEditModal
        })
    }

    handleCreateNewUser = async (data) => {
        let res = await handleCreateNewUserService(data);
        if (res && res.errCode === 0) {
            this.handleGetAllUser();
            this.toggleUserManageModal();

            emitter.emit('EVENT_CLEAR_MODAL_DATA')
        }
    }

    handleUpdateUser = async (data) => {
        let res = await handleUpdateUserService(data);
        if (res && res.errCode === 0) {
            this.handleGetAllUser();
            this.toggleUserEditModal();
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await handleDeleteUserService(user.id);
            if (res && res.errCode === 0) {
                this.handleGetAllUser();
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className='user-container'>
                <UserManageModal
                    isOpen={this.state.isShowModal}
                    toggleUserManageModal={this.toggleUserManageModal}
                    handleCreateNewUser={this.handleCreateNewUser}
                />

                {this.state.isShowEditModal && <UserEditModal
                    isOpen={this.state.isShowEditModal}
                    userData={this.state.userData}
                    toggleUserEditModal={this.toggleUserEditModal}
                    handleUpdateUser={this.handleUpdateUser}

                />}


                <div className='user-table mt-3 mx-2'>


                    <div className='my-3'>
                        <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}><i className="fas fa-plus mx-1"></i>Add new users</button>
                    </div>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

                        {
                            this.state.arrUsers && this.state.arrUsers.map((item, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit'
                                                    onClick={() => this.handleClickEditUser(item)}
                                                ><i className="fas fa-edit"></i></button>
                                                <button className='btn-delete'
                                                    onClick={() => this.handleDeleteUser(item)}
                                                ><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </table>
                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
