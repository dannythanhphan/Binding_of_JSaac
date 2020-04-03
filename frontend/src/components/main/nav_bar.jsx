import React from "react";
import { Link, matchPath } from "react-router-dom";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lobbyModal: false,
            lobbykey: ''
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createLobby = this.createLobby.bind(this);
        this.leaveLobby = this.leaveLobby.bind(this);
        this.joinLobby = this.joinLobby.bind(this);
    }

    handleLogout(e) {
        this.props.logout();
    }

    handleDelete(charId) {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            this.props.deleteCharacter(charId)
            .then(() => this.props.history.push('/main'))
        }
    }
    
    handleChange(e) {
        const currentState = Object.assign({}, this.state);
        currentState.lobbykey = e.target.value;
        this.setState(currentState);
    }

    openModal() {
        const currentState = Object.assign({}, this.state);
        currentState.lobbyModal = true;
        this.setState(currentState);
    }

    closeModal() {
        const currentState = Object.assign({}, this.state);
        currentState.lobbyModal = false;
        this.setState(currentState);
    }

    renderModal() {
        const errors = this.props.errors ? Object.values(this.props.errors).join(", ") : null;
        if (this.state.lobbyModal) {
            return (
                <div className="modal-screen">
                    <div className="lobby-modal">
                        <h2>Enter the Lobby Key of the Lobby you wish to join</h2>
                        <input type="text" onChange={this.handleChange} />
                        <p>{errors}</p>
                        <div>
                            <button onClick={this.joinLobby}>Join Lobby</button>
                            <button onClick={this.closeModal}>Cancel</button>
                        </div>
                    </div>

                </div>
            )
        } else {
            return null;
        }
    }

    createLobby(charId) {
        if (localStorage.lobbykey) {
            this.props.leave(localStorage.lobbykey, localStorage.lobbycharacter)
                .then((res) => {
                    if (res.type === 'REMOVE_LOBBY') {
                        this.props.create(charId).then(
                            (res) => this.props.history.push(`/main/lobby`));
                    }
                });
        } else {
            this.props.create(charId).then( 
                (res) => this.props.history.push(`/main/lobby`));
        }
    }

    joinLobby(e) {
        e.preventDefault();
        const match = matchPath(this.props.location.pathname, {
            path: "/main/:id"
        })
        if (localStorage.lobbykey) {
            this.props.leave(localStorage.lobbykey, localStorage.lobbycharacter)
                .then((res) => {
                    if (res.type === 'REMOVE_LOBBY') {
                        this.props.join(this.state.lobbykey, match.params.id).then(
                            (res) => {
                                if (res.type === 'RECEIVE_LOBBY') {
                                    this.closeModal();
                                    this.props.history.push(`/main/lobby`);
                                }
                            });
                    }
                });
        } else {
            this.props.join(this.state.lobbykey, match.params.id)
                .then(
                    (res) => {
                        if (res.type === 'RECEIVE_LOBBY') {
                            this.closeModal();
                            this.props.history.push(`/main/lobby`);
                        }
                    });
        }
    }

    leaveLobby(e) {
        e.preventDefault();
        if (localStorage.lobbykey) {
            this.props.leave(localStorage.lobbykey, localStorage.lobbycharacter)
            .then( (res) => {
                if (res.type === 'REMOVE_LOBBY') {
                    this.props.history.push('/main')
                }
            });
        }
    }

    render() {
        const match = matchPath(this.props.location.pathname, {
            path: "/main/:id"
        })
        let navButtons = null;
        if (!match || match.params.id === "create") {
            navButtons = (
                <div className="redirect-buttons-container">
                    <Link to="/main/create" className="redirect-buttons">
                        New Character
                    </Link>
                </div>
            )
        } else if (match.params.id === "lobby") {
            navButtons = (
                <div className="redirect-buttons-container">
                    <button className="redirect-buttons" onClick={this.leaveLobby}>
                        Leave Lobby
                    </button>
                    <Link to="/main/game" className="redirect-buttons">
                        Start Game
                    </Link>
                </div>
            )
        } else if (match.params.id) {
            navButtons = (
                <div className="redirect-buttons-container">
                    <Link to="/main/create" className="redirect-buttons">
                        New Character
                    </Link>
                    <button className="redirect-buttons" onClick={() => this.handleDelete(match.params.id)}>
                        Delete Character
                    </button>

                    <button className="redirect-buttons" onClick={() => this.createLobby(match.params.id)}>
                        Create Lobby
                    </button>

                    <button className="redirect-buttons" onClick={this.openModal}>
                        Join Lobby
                    </button>
                </div>
            )
        }

        return (
            <div className="ui-buttons">
                { navButtons }
                <button onClick={this.handleLogout} className="logout-button">Sign Out</button>
                {this.renderModal()}
            </div>
        );
    }
}

export default NavBar;