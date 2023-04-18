import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { handleGetAllSpecialties } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';

class SpecialtySection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrSpecialties: []
        }
    }

    async componentDidMount() {
        let res = await handleGetAllSpecialties();
        if (res && res.errCode === 0) {
            console.log(res)
            if (res.data && res.data.length > 0) {
                this.setState({
                    arrSpecialties: res.data
                })
            }
        }
    }

    render() {
        let { arrSpecialties } = this.state
        console.log('check state specialty ', arrSpecialties.length)
        return (
            <>
                <div className='section-container'>
                    <div className='section-content'>
                        <div className='section-content-up'>
                            <span className='content-text'><FormattedMessage id="home-page.specialty" /></span>
                            <button className='btn-see-more'><FormattedMessage id="home-page.more-infor" /></button>
                        </div>

                        <div className='section-content-down'>
                            <div className='section-slider'>
                                <Slider {...this.props.settings}>
                                    {
                                        arrSpecialties && arrSpecialties.length > 0
                                        && arrSpecialties.map((item, index) => {
                                            return (
                                                <div className='slider-item' key={index}>
                                                    <div className='section-slider-img'
                                                        style={{ backgroundImage: `url(${item.image})` }}
                                                    ></div>
                                                    <div className='slider-text'>{item.name}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtySection);
