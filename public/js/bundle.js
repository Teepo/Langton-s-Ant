
var Ant = React.createClass({

    getInitialState: function() {

        return {
            x : 5,
            y : 5,
            rotation: 0,
            side: 0
        };
    },

    render: function() {

        if (this.props.cell.state.coords.x == this.state.x
           && this.props.cell.state.coords.y == this.state.y) {}
        else
            return false;

        var __antClassName = "ant _" + this.state.rotation;

        return (<div className={__antClassName}></div>);
    }
});var Cell = React.createClass({

    getInitialState: function() {

        return {
            isBlack : false,

            antIsHere : false,

            coords: {
                x : this.props.x,
                y : this.props.y
            }
        };
    },

    onClick: function() {

        this.setState({
            isBlack : !this.state.isBlack
        });
    },

    render: function() {

        var cellClassName = this.state.isBlack ? 'black' : '';

        return (<td className={cellClassName} onClick={this.onClick}>
                  <Ant cell={this} />
                </td>);
    }
});var Row = React.createClass({

    getInitialState: function() {
        return {
            x : this.props.x
        };
    },

    render: function() {

        return (<tr>
                    {[...Array(this.props.App.state.gridSize.y)].map(function(o, index) {
                        return <Cell key={index} x={this.props.x} y={index} App={this.props.App} />
                    }.bind(this))}
                </tr>);
    }
});var Grid = React.createClass({

    getInitialState: function() {
        return {
            gridSize: {
                x : 11,
                y : 11
            }
        };
    },

    render: function() {

        return (<table className="grid">
                    <tbody>
                        {[...Array(this.props.App.state.gridSize.x)].map(function(o, index) {
                            return <Row key={index} x={index} App={this.props.App} />
                        }.bind(this))}
                    </tbody>
                </table>);
    }
});var Console = React.createClass({

    onChange: function(e) {

        var coords = this.props.App.state.gridSize;

        coords[e.target.name] = parseInt(e.target.value);

        this.props.App.setState({
            gridSize : coords
        });
    },

    onZoom: function(e) {
        document.querySelector('.grid').style.zoom = parseInt(e.target.value) / 100;
    },

    onPlayClickEvent: function() {

        this.props.App.__proto__.isPlay = !this.props.App.__proto__.isPlay;

        if (this.props.App.__proto__.isPlay)
            this.props.App.play();
    },

    onNextClickEvent: function() {
        this.props.App.play();
    },

    onStopClickEvent: function() {

        this.props.App.isPlay = false;
        this.props.App.isStop = true;
    },

    render: function() {

        var App = this.props.App;

        var playStateClassName = ((!this.props.App.isPlay) ? 'play' : 'pause') + "State state";

        return (<div className="console">

                    <div className="table">
                        <div className="cell">

                            <div className="coords">
                              X = <input type="number" name="x" value={App.state.gridSize.x} onChange={this.onChange} />
                              Y = <input type="number" name="y" value={App.state.gridSize.y} onChange={this.onChange} />
                            </div>

                            <div className="controls">

                              <input type="range" value={this.props.App.zoom} onChange={this.onZoom} min="10" max="100" />

                              <div className={playStateClassName} onClick={this.onPlayClickEvent}></div>
                              <div className="stopState state"    onClick={this.onStopClickEvent}></div>
                              <div className="nextState state"    onClick={this.onNextClickEvent}></div>
                            </div>
                        </div>
                    </div>

                </div>);
    }
});var App = React.createClass({

    movementID     : 0,
    movementLimit  : 11000,
    speed          : 1000,
    timeoutHandler : null,

    zoom : 100,

    side: {
        TOP    : 0,
        RIGHT  : 1,
        BOTTOM : 2,
        LEFT   : 3
    },

    isStop: false,
    isPlay: true,

    getInitialState: function() {
        return {
            gridSize: {
                x : 11,
                y : 11
            }
        };
    },

    componentDidMount: function() {

        document.querySelector('.grid').style.zoom = parseInt(this.zoom) / 100;

        if (this.isPlay)
            this.play();
    },

    componentDidUpdate: function() {

        if ((this.movementID >= this.movementLimit)
           || !this.isPlay)
        {
            this.pause();
            return false;
        }

        this.play();
    },

    componentWillUnmount: function() {

        this.pause();
    },

    draw: function() {

        console.log('APP DRAWING');

        var coords = this.ant;

        console.log('ANT COORDS', coords);

        console.log('CURRENT CELL', this.currentCell);

        if (this.currentCell.state.isBlack)
        {
            if (this.ant.side === this.side.TOP)
            {
                coords.y        -= 1;
                coords.rotation  = 270;
                coords.side      = this.side.LEFT;
            }
            else if (this.ant.side === this.side.RIGHT)
            {
                coords.x        -= 1;
                coords.rotation  = 0;
                coords.side      = this.side.TOP;
            }
            else if (this.ant.side === this.side.BOTTOM)
            {
                coords.y        += 1;
                coords.rotation  = 90;
                coords.side      = this.side.RIGHT;
            }
            else if (this.ant.side === this.side.LEFT)
            {
                coords.x        += 1;
                coords.rotation  = 180;
                coords.side      = this.side.BOTTOM;
            }
        }
        else
        {
            if (this.ant.side == this.side.TOP)
            {
                coords.y        += 1;
                coords.rotation  = 90;
                coords.side      = this.side.RIGHT;
            }
            else if (this.ant.side == this.side.RIGHT)
            {
                coords.x        += 1;
                coords.rotation  = 180;
                coords.side      = this.side.BOTTOM;
            }
            else if (this.ant.side == this.side.BOTTOM)
            {
                coords.y        -= 1;
                coords.rotation  = 270;
                coords.side      = this.side.LEFT;
            }
            else if (this.ant.side === this.side.LEFT)
            {
                coords.x        -= 1;
                coords.rotation  = 0;
                coords.side      = this.side.TOP;
            }
        }

        // toggle cell color
        var isBlack = this.currentCell.state.isBlack;

        this.currentCell.setState({
            isBlack: !isBlack
        });

        // move ant
        this.ant = coords;

        this.movementID++;
    },

    /******************************** CONTROLS ********************************/

    play: function() {
        this.timeoutHandler = setTimeout(this.draw, this.speed);
    },

    pause: function() {
        clearInterval(this.timeoutHandler);
    },

    stop: function() {

        clearInterval(this.timeoutHandler);

        this.render();
    },

    /******************************* END CONTROLS *****************************/

    render: function() {

        return (<div>
                  <Console App={this} />
                  <Grid App={this} />

                  <div className="movementID">
                      {this.movementID}
                  </div>
                </div>);
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
