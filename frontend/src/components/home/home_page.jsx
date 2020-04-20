import React from 'react';
import './home_page.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'

class HomePage extends React.Component {
    handleSubmit() {
        const user = {username: "demo", password: "password"};
        this.props.processForm(user)
    }

    render() {
        return (
            <div className="home-page">
                <img className="home-logo-image" src={logo} alt="logo"/>
                <div className="home-page-session-form">
                    <div className="home-page-welcome">
                        <div className="home-page-session-buttons">
                            <Link to="/login" className="home-page-login-button">
                                <button className="home-page-login-button-text">
                                    Existing User
                                </button>
                            </Link>
                            <div className="home-page-demo-button">
                                <button onClick={() => this.handleSubmit()} className="home-page-login-button-text">
                                    Demo User
                                </button>
                            </div>
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