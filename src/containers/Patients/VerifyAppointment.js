import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleVerifyAnAppointment } from '../../services/userService';
import _ from 'lodash';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyAppointment.scss'

class VerifyAppointment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVerify: false
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let query = new URLSearchParams(this.props.location.search);
            let token = query.get('token')
            let doctorId = query.get('doctorId')
            let res = await handleVerifyAnAppointment({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errCode === 0) {
                this.setState({
                    isVerify: true
                })
            }
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    render() {
        let { isVerify } = this.state
        return (
            <>
                <HomeHeader />
                {
                    isVerify ?
                        <div className='verify-contaier'>
                            <div className='verify-content'>
                                <span>Confirm appointment success</span>
                            </div>
                        </div>
                        :
                        <div className='verify-contaier'>
                            <div className='verify-content'>
                                <span>An appointment is confirmed or not exist</span>
                            </div>
                        </div>
                }
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAppointment);
