var App = React.createClass({

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
                </div>);
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
