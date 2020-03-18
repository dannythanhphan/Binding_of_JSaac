import React from 'react';
import { Stage, Layer, Rect, Text, Image, Star} from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';



class Map extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {x: Math.random() * window.innerWidth,
                      y: Math.random() * window.innerHeight }
    }
    handleKeyDown = (event) => {
        if (event.key === "ArrowUp") {
            this.setState({y: this.state.y - 5});
        }
        if (event.key === "ArrowDown") {
            this.setState({y: this.state.y + 5});
        }
        if (event.key === "ArrowLeft") {
            this.setState({x: this.state.x - 5});
        }
        if (event.key === "ArrowRight") {
            this.setState({x: this.state.x + 5});
        }
    }
    handleDragStart = e => {
        e.target.setAttrs({
            shadowOffset: {
                x: 15,
                y: 15
            },
            scaleX: 1.1,
            scaleY: 1.1
        });
    };
    handleDragEnd = e => {
        e.target.to({
            duration: 0.5,
            easing: Konva.Easings.ElasticEaseOut,
            scaleX: 1,
            scaleY: 1,
            shadowOffsetX: 5,
            shadowOffsetY: 5
        });
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }
    render() {
        return (
          <Stage width={window.innerWidth} height={window.innerHeight} >
            <Layer>
              <SimpleImage />
            </Layer>
            <Layer>
                <Text text="Try to drag a star" />
                <Star
                    x={this.state.x}
                    y={this.state.y}
                    numPoints={5}
                    innerRadius={20}
                    outerRadius={40}
                    fill="#89b717"
                    opacity={0.8}
                    draggable
                    rotation={Math.random() * 180}
                    shadowColor="black"
                    shadowBlur={10}
                    shadowOpacity={0.6}
                    onDragStart={this.handleDragStart}
                    onDragEnd={this.handleDragEnd}
                />    
            </Layer>
          </Stage>
        );
    }
}

function SimpleImage() {
    const url =
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/the-binding-of-isaac-rebirth/7/71/Basement.png";
    const [image] = useImage(url);
    return (
        <Image image={image} />
    )
}
export default Map;