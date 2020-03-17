import React from 'react';
import './home_page.css'
import { Link } from 'react-router-dom';
import logo from './logo.png'

class HomePage extends React.Component {
    render() {
        return (
            <div className="home-page">
                <img className="home-logo-image" src={logo} alt="logo"/>
                <div className="home-page-session-form">
                    <div className="home-page-welcome">
                        <p>Binding of JSaac</p>
                        <div className="home-page-session-buttons">
                            <Link to="/login" className="home-page-login-button">
                                <button className="home-page-login-button-text">
                                    Existing User
                                </button>
                            </Link>
                            <Link to="/register" className="home-page-signup-button">
                                <button className="home-page-signup-button-text">
                                    New User
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage