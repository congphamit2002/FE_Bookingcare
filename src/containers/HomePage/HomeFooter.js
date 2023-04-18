import React, { Component } from 'react';
import './HomeFooter.scss'

class HomeFooter extends Component {

    render() {
        return (
            <>
                <div className='footer-container'>
                    <footer>
                        <ul className='social-list'>
                            <li className='facebook'><i className="fab fa-facebook"></i></li>
                            <li className='instagram'><i className="fab fa-instagram"></i></li>
                            <li className='youtube'><i className="fab fa-youtube"></i></li>
                            <li className='google'><i class="fab fa-google-plus-g"></i></li>
                        </ul>
                    </footer>
                </div>
            </>
        );
    }

}


export default (HomeFooter);
