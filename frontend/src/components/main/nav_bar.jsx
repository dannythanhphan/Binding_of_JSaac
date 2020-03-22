import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        this.props.logout();
    }

    render() {
        return (
            <div className="ui-buttons">
                <div className="redirect-buttons-container">
                    <Link to="/main/create" className="redirect-buttons">
                        New Character
                    </Link>
                    <Link to="/main/lobby" className="redirect-buttons">
                        Start Game
                    </Link>
                </div>
                <button onClick={this.handleLogout} className="logout-button">Sign Out</button>
            </div>


        );
    }


}

export default NavBar;