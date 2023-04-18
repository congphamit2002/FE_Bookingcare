import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './DetailDoctor.scss'
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from './DoctorSchedule';
import ExtraInforDoctor from './ExtraInforDoctor';

class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inforDoctorDetail: {},
            doctorId: -1
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.setState({
                doctorId: this.props.match.params.id
            })
            this.props.getDetailInforDoctorStart(this.props.match.params.id)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.inforDoctorDetail !== this.props.inforDoctorDetail) {
            this.setState({
                inforDoctorDetail: this.props.inforDoctorDetail
            })
        }
    }

    render() {
        let { inforDoctorDetail } = this.state;
        let nameEn = '';
        let nameVi = '';
        if (inforDoctorDetail && inforDoctorDetail.positionData) {
            nameVi = `${inforDoctorDetail.positionData.valueVi}, ${inforDoctorDetail.lastName} ${inforDoctorDetail.firstName}`;
            nameEn = `${inforDoctorDetail.positionData.valueEn}, ${inforDoctorDetail.firstName} ${inforDoctorDetail.lastName}`;
        }

        return (
            <>
                <div>
                    <HomeHeader isShowBanner={false} />
                </div>
                <div className='detail-doctor-container'>
                    <div className='detail-doctor-content'>
                        <div className='intro-doctor'>
                            <div className='intro-left'>
                                <div className='doctor-img'
                                    style={
                                        { backgroundImage: `url(${inforDoctorDetail.image})` }
                                    }></div>
                            </div>
                            <div className='intro-right'>
                                <div className='doctor-name'>
                                    <span>{this.props.language === LANGUAGES.EN ? nameEn : nameVi}</span>
                                </div>
                                <div className='description'>
                                    <span>
                                        {
                                            inforDoctorDetail && inforDoctorDetail.markdown && inforDoctorDetail.markdown.description
                                            && <span>
                                                {inforDoctorDetail.markdown.description}
                                            </span>
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='detai-doctor-schedule'>
                            <DoctorSchedule doctorId={this.state.doctorId} />
                        </div>
                        <div className='infor-doctor'>
                            {
                                inforDoctorDetail && inforDoctorDetail.markdown && inforDoctorDetail.markdown.contentHTML && <div
                                    dangerouslySetInnerHTML={{ __html: this.state.inforDoctorDetail.markdown.contentHTML }}
                                />
                            }
                        </div>
                    </div>
                </div>


            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        inforDoctorDetail: state.admin.inforDoctorDetail,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailInforDoctorStart: (id) => dispatch(actions.getDetailInforDoctorStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
