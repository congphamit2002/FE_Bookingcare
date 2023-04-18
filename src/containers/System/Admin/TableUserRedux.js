import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableUserRedux.scss'
import * as actions from '../../../store/actions'

class TableUserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
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
        }
    }



    componentDidMount() {
        this.props.getAllUserStart();
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.users !== prevProps.users) {
            this.setState({
                arrUsers: this.props.users
            })
        }
    }

    handleOnDeleteUser = (userId) => {
        console.log('check user when on click delete ', userId)
        this.props.handleOnDeleteUser(userId)
    }


    render() {
        let users = this.state.arrUsers
        return (
            <div className='user-container'>

                <div className='user-table mt-3 mx-2'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

                        {
                            users && users.length > 0 && users.map((item, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit'
                                                    onClick={() => this.props.handleFillUserUpdate(item)}
                                                ><i className="fas fa-edit"></i></button>
                                                <button className='btn-delete'
                                                    onClick={() => { this.handleOnDeleteUser(item.id) }}
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
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUserStart: () => dispatch(actions.getAllUserStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserRedux);
