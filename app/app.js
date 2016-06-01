var App = React.createClass({

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