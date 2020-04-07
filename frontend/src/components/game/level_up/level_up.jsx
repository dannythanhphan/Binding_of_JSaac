import React from 'react'
import './level-up.css'

class LevelUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.character;
        this.state.pointsSpent = 0;
        this.state.hitPoints += 25;
        this.increaseStat = this.increaseStat.bind(this);
        this.decreaseStat = this.decreaseStat.bind(this);
        this.handleClick = this.handleClick.bind(this);
    };

    increaseStat(stat) {
        return e => {
            this.setState({
                [stat]: this.state.stat++,
                availableStatPoints: this.state.availableStatPoints--,
                pointsSpent: this.state.pointsSpent++
            });
        };
    };

    decreaseStat(stat) {
        return e => {
            this.setState({
                [stat]: this.state.stat--,
                availableStatPoints: this.state.availableStatPoints++,
                pointsSpent: this.state.pointsSpent--
            });
        };
    };

    handleClick(e) {
        this.props.updateCharacter(this.state)
    };

    render() {
        const increaseUnavailable = this.state.availableStatPoints === 0;
        const decreaseUnavailable = this.state.pointsSpent === 0;

        return (
            <div className="level-up-box">Level Up!
                <div className="level-up-options">
                    <div className="level-up-melee-attack-label">
                        Melee Attack: {this.state.meleeAttack}
                        <button 
                            disabled={decreaseUnavailable} 
                            className="stat-decrease-button" 
                            onClick={this.decreaseStat('meleeAttack')}
                        >
                            -
                        </button>
                        <button 
                            disabled={increaseUnavailable} 
                            className="stat-increase-button" 
                            onClick={this.increaseStat('meleeAttack')}
                        >
                            +
                        </button>
                    </div>
                    <div className="level-up-ranged-attack-label">
                        Ranged Attack: {this.state.rangedAttack}
                        <button
                            disabled={decreaseUnavailable}
                            className="stat-decrease-button"
                            onClick={this.decreaseStat('rangedAttack')}
                        >
                            -
                        </button>
                        <button 
                            disabled={increaseUnavailable} 
                            className="stat-increase-button" 
                            onClick={this.increaseStat('rangedAttack')}
                        >
                            +
                        </button>
                    </div>
                    <div className="level-up-defense-label">
                        Defense: {this.state.defense}
                        <button
                            disabled={decreaseUnavailable}
                            className="stat-decrease-button"
                            onClick={this.decreaseStat('defense')}
                        >
                            -
                        </button>
                        <button 
                            disabled={increaseUnavailable} 
                            className="stat-increase-button" 
                            onClick={this.increaseStat('defense')}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="level-up-finalize-label">
                    <button
                        disabled={!increaseUnavailable}
                        onClick={this.handleClick}
                    >
                        Finalize Choices
                    </button>
                </div>
            </div>
        );
    }
};

export default LevelUp;