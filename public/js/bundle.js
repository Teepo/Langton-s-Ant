
var Ant = React.createClass({

    getInitialState: function() {

        return {
            x : 50,
            y : 50,
            rotation : 0,
            side : 0,
            currentCell : this.props.cell
        };
    },

    render: function() {

        if ((this.state.currentCell.state.coords.x == this.state.x
           && this.state.currentCell.state.coords.y == this.state.y)

           || this.state.currentCell.state.antIsHere === true)
        {
            this.props.App.currentCell = this.state.currentCell;
            this.props.App.currentCell.state.antIsHere = true;

            this.props.App.ant = this;
        }
        else
        {
            return false;
        }

        var __antClassName = "ant _" + this.state.rotation;

        return (<div className={__antClassName}></div>);
    }
});
var Cell = React.createClass({

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

        if (typeof this.props.App.__proto__.cells[this.state.coords.x] === "undefined")
            this.props.App.__proto__.cells[this.state.coords.x] = [];

        this.props.App.__proto__.cells[this.state.coords.x][this.state.coords.y] = this;

        var cellClassName = this.state.isBlack ? 'black' : '';

        return (<td className={cellClassName} onClick={this.onClick}>
            <Ant App={this.props.App} cell={this} />
            </td>);
    }
});
var Row = React.createClass({

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
                x : 100,
                y : 100
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
});String.prototype.toHHMMSS = function () {

    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}

    return hours + ':' + minutes + ':' + seconds;
};

var Console = React.createClass({

    getInitialState: function() {

        return {
            movementID    : 0,
            movementLimit : 10000,
            timeElapsed   : 0
        };
    },

    componentDidMount: function() {

        // store reference in <App />
        this.props.App.__proto__.console = this;
    },

    onChange: function(e) {

        var coords = this.props.App.state.gridSize;

        coords[e.target.name] = parseInt(e.target.value);

        this.props.App.setState({
            gridSize : coords
        });
    },

    onZoom: function(e) {

        // enter key
        if (e.charCode === 13)
            document.querySelector('.grid').style.zoom = parseInt(e.target.value) / 100;
    },

    onPlayClickEvent: function() {

        this.props.App.__proto__.isPlay = !this.props.App.__proto__.isPlay;

        if (this.props.App.__proto__.isPlay)
            this.props.App.play();
        else
            this.props.App.pause();
    },

    onNextClickEvent: function() {
        this.props.App.nextState();
    },

    onStopClickEvent: function() {

        this.props.App.stop();
    },

    render: function() {

        var App = this.props.App;

        var playStateClassName = ((!this.props.App.isPlay) ? 'play' : 'pause') + "State state";

        var __time = ("" + this.state.timeElapsed).toHHMMSS();

        return (<div className="console">

                    <div className="table">
                        <div className="cell">

                            <div className="coords">
                              X = <input type="number" name="x" value={App.state.gridSize.x} onChange={this.onChange} />
                              Y = <input type="number" name="y" value={App.state.gridSize.y} onChange={this.onChange} />
                            </div>

                            <div className="controls">

                              ZOOM = <input type="text" onKeyPress={this.onZoom} defaultValue={this.props.App.zoom} />

                              <div className={playStateClassName} onClick={this.onPlayClickEvent}></div>
                              <div className="stopState state"    onClick={this.onStopClickEvent}></div>
                              <div className="nextState state"    onClick={this.onNextClickEvent}></div>
                            </div>
                        </div>
                    </div>

                  <div className="movementID">
                      {this.state.movementID}
                  </div>
                  <div className="time">
                      {__time}
                  </div>

                </div>);
    }
});var App = React.createClass({

    /** COMPONENT REFERENCE **/

    // <Cell /> list
    cells : [],

    // <Cell />
    currentCell : null,

    // <Ant />
    ant : null,

    // <Console />
    console : null,

    /** **/

    movementID     : 0,
    movementLimit  : 11000,
    speed          : 0,

    timeoutHandler : null,
    timerHandler   : null,

    zoom : 10,

    side: {
        TOP    : 0,
        RIGHT  : 1,
        BOTTOM : 2,
        LEFT   : 3
    },

    isStop: true,
    isPlay: false,

    getInitialState: function() {

        return {
            gridSize: {
                x : 100,
                y : 100
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

    timer: function() {

        this.console.setState({
            timeElapsed : ++this.console.state.timeElapsed
        });
    },

    draw: function() {

        var coords = this.ant.state;

        if (this.currentCell.state.isBlack)
        {
            if (this.ant.state.side === this.side.TOP)
            {
                coords.y        -= 1;
                coords.rotation  = 270;
                coords.side      = this.side.LEFT;
            }
            else if (this.ant.state.side === this.side.RIGHT)
            {
                coords.x        -= 1;
                coords.rotation  = 0;
                coords.side      = this.side.TOP;
            }
            else if (this.ant.state.side === this.side.BOTTOM)
            {
                coords.y        += 1;
                coords.rotation  = 90;
                coords.side      = this.side.RIGHT;
            }
            else if (this.ant.state.side === this.side.LEFT)
            {
                coords.x        += 1;
                coords.rotation  = 180;
                coords.side      = this.side.BOTTOM;
            }
        }
        else
        {
            if (this.ant.state.side == this.side.TOP)
            {
                coords.y        += 1;
                coords.rotation  = 90;
                coords.side      = this.side.RIGHT;
            }
            else if (this.ant.state.side == this.side.RIGHT)
            {
                coords.x        += 1;
                coords.rotation  = 180;
                coords.side      = this.side.BOTTOM;
            }
            else if (this.ant.state.side == this.side.BOTTOM)
            {
                coords.y        -= 1;
                coords.rotation  = 270;
                coords.side      = this.side.LEFT;
            }
            else if (this.ant.state.side === this.side.LEFT)
            {
                coords.x        -= 1;
                coords.rotation  = 0;
                coords.side      = this.side.TOP;
            }
        }

        // toggle old cell state
        this.currentCell.setState({
            isBlack   : !this.currentCell.state.isBlack,
            antIsHere : false
        });

        // update new cell
        this.cells[coords.x][coords.y].setState({
            antIsHere : true
        });

        // move ant
        this.ant.setState({
            x : coords.x,
            y : coords.y,
            rotation : coords.rotation,
            side : coords.side,
            currentCell : this.cells[coords.x][coords.y]
        });

        // update console
        this.console.setState({
            movementID : ++this.console.state.movementID
        });
    },

    /******************************** CONTROLS ********************************/

    play: function() {
        this.timeoutHandler = setInterval(this.draw, this.speed);
        this.timerHandler = setInterval(this.timer, 1000);
    },

    nextState: function() {
        this.draw();
    },

    pause: function() {
        clearInterval(this.timeoutHandler);
        clearInterval(this.timerHandler);
    },

    stop: function() {

        clearInterval(this.timeoutHandler);
        clearInterval(this.timerHandler);

        this.isPlay = false;
        this.isStop = true;

        this.render();
    },

    /******************************* END CONTROLS *****************************/

    render: function() {

        return (<div>
                  <Console App={this} />
                  <Grid App={this} />
                </div>);
    }
});

ReactDOM.render(<App />, document.getElementById('app'));

