import React from 'react'

class LevelUp extends React.Component {
    constructor(props) {
        super(props)
        this.avatar = 1;
        switch (this.props.character.characterSprite) {
            case 1:
                this.avatar = mustacheMan;
                break;
            case 2:
                this.avatar = thief;
                break;
            case 3:
                this.avatar = superWoman;
                break;
            default:
                break;
        };
        this.state = {
            availableStatPoints: this.props.character.availableStatPoints,
            pointsSpent: 0,
            meleeAttack: this.props.character.meleeAttack,
            rangedAttack: this.props.character.rangedAttack,
            defense: this.props.character.defense
        };
        this.increaseStat = this.increaseStat.bind(this);
        this.decreaseStat = this.decreaseStat.bind(this);
        this.handleClick = this.handleClick.bind(this);
    };

    increaseStat = stat => {
        return e => {
            this.setState({
                [stat]: this.state.stat++,
                availableStatPoints: this.state.availableStatPoints--,
                pointsSpent: this.state.pointsSpent++
            });
        };
    };

    decreaseStat = stat => {
        return e => {
            this.setState({
                [stat]: this.state.stat--,
                availableStatPoints: this.state.availableStatPoints++,
                pointsSpent: this.state.pointsSpent--
            });
        };
    };

    handleClick = e => {
        this.props.updateCharacter(this.state)
    };

    render() {
        const increaseUnavailable = this.state.availableStatPoints === 0;
        const decreaseUnavailable = this.state.pointsSpent === 0;

        return (
            <div className="level-up-box">
                <div className="level-up-label">
                    <p className="level-up-name">{this.props.character.name}</p>
                    <p className="level-up-level">Level {this.props.character.level}</p>
                </div>
                <div className="level-up-content">
                    <img className="level-up-avatar" src={this.avatar}/>
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
                </div>
                <div className="level-up-finalize-label">
                    <button
                        disabled={!increaseUnavailable}
                        onClick={handleClick}
                    >
                        Finalize Choices
                    </button>
                </div>
            </div>
        );
    }
};

export default LevelUp;