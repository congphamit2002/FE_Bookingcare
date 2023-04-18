import React, { Component } from 'react';
import './HomeAboutUs.scss'
import avt from '../../assets/images/avt.jpg'

class HomeAboutUs extends Component {

    render() {
        return (
            <>
                <div className='about-us-container'>
                    <div className='about-us-content'>
                        <div className='content-up'><span>Những bài nhạc hay!!</span></div>
                        <div className='content-down'>
                            <div className='media'>
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ivInOcpg0Eo"
                                    title="Những bài hát hay nhất của Đạt G - Ngày mai em đi mất, Còn buồn không em...|| Dat G&#39;s best song"
                                    frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullscreen></iframe>
                            </div>
                            <div className='text-content'>
                                <a className='avatar' href='https://www.facebook.com/profile.php?id=100010572304112'><img src={avt}></img></a>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}


export default (HomeAboutUs);
