import React from 'react';
import { Stage, Layer, Sprite } from 'react-konva';
import knight from '../../assets/animations/knight/knight_idle_animations.png';
import rogue from '../../assets/animations/rogue/rogue_idle_animations.png';
import mage from '../../assets/animations/mage/mage_idle_animations.png';
import { Redirect } from 'react-router';
import loading from '../../assets/animations/loading.gif';
import animationDetails from '../lobby/animation_details';


class CharacterSelected extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            x: 10,
            y: 0,
        }
    };

    renderLoadingModal() {
        const { ui } = this.props;
        const text = (ui.loading) ? "Loading" : "Leaving";
        if (ui.loading || ui.leaving) {
            return (
                <div className="modal-screen">
                    <div className="loading-modal">
                        <h1>{text} Lobby...</h1>
                        <img src={loading} />
                    </div>
                </div>
            )

        } else {
            return null;
        }
    }

    render () {
        let idle;
        let imageObj = new Image();
        let frames;
        const { character } = this.props
        if (character) {
            let charSelectedInfo = animationDetails(character.characterSprite)
            idle = charSelectedInfo.idle
            switch (charSelectedInfo.imageObj) {
                case "knight":
                    imageObj.src = knight
                    frames = 12;
                    break;
                case "rogue":
                    imageObj.src = rogue
                    frames = 17;
                    break;
                case "mage":
                    imageObj.src = mage
                    frames = 14;
                    break;
            }
        }
        
        const displayCharacter = (character) ? (
            <div className="character-selected">
                <div className="character-selected-info">
                    {character.name}
                </div>
                <div className="character-selected-canvas">
                    <Stage width={200} height={300}>
                        <Layer>
                            <Sprite 
                                x={50}
                                y={50}
                                image={imageObj}
                                animation='idle'
                                animations={idle}
                                frameRate={frames}
                                frameIndex={0}
                                ref={(node => {
                                        if(node && !node.isRunning()) {
                                            // setInterval(function() {node.move({x: (20 % 200), y: 0})}, 48)
                                            node.start()
                                        }
                                    })
                                }
                            />
                        </Layer>
                    </Stage>
                </div>
            </div>
        ) : (
            null
        )
        return(
            <div>
                {displayCharacter}
                {this.renderLoadingModal()}
            </div>
        );
    }
};

export default CharacterSelected;