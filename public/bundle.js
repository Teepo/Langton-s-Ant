
var Cell = React.createClass({

    getInitialState: function() {

        return {
            isBlack : false,

            coords: {
                x : this.props.x,
                y : this.props.y
            }
        };
    },

    componentDidUpdate : function() {

        if (this.props.App.state.ant.x == this.state.coords.x
           && this.props.App.state.ant.y == this.state.coords.y)
        {
            this.props.App.currentCell = this;
        }
    },

    componentDidMount : function() {

        if (this.props.App.state.ant.x == this.state.coords.x
           && this.props.App.state.ant.y == this.state.coords.y)
        {
            this.props.App.currentCell = this;
        }
    },

    onClick: function() {

        this.setState({
            isBlack : !this.state.isBlack
        });
    },

    render: function() {

        var cellClassName = this.state.isBlack ? 'black' : '';

        if (this.props.App.state.ant.x == this.state.coords.x
           && this.props.App.state.ant.y == this.state.coords.y)
        {
            cellClassName += " ant _" + this.props.App.state.ant.rotation;
        }

        return (<td className={cellClassName} onClick={this.onClick}></td>);
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

    render: function() {

        var App = this.props.App;

        return (<div className="console">

                    <div className="table">
                        <div className="cell">

                            <div className="coords">
                              X = <input type="number" name="x" value={App.state.gridSize.x} onChange={this.onChange} />
                              Y = <input type="number" name="y" value={App.state.gridSize.y} onChange={this.onChange} />
                            </div>

                            <div className="controls">
                            </div>
                        </div>
                    </div>

                </div>);
    }
});var App = React.createClass({

    movementID     : 0,
    movementLimit  : 10,
    speed          : 1000,
    timeoutHandler : null,

    getInitialState: function () {

        return {
            gridSize: {
                x : 11,
                y : 11
            },

            ant : {
                x : 5,
                y : 5,
                rotation: 0,
            },
        };
    },

    componentDidMount: function() {

        this.timeoutHandler = setTimeout(this.draw, this.speed);
    },

    componentDidUpdate: function() {

        if (this.movementID >= this.movementLimit)
        {
            console.info('THE END !')
            return false;
        }

        this.timeoutHandler = setTimeout(this.draw, this.speed);
    },

    componentWillUnmount: function() {
        clearInterval(this.timeoutHandler);
    },

    draw: function() {

        var coords = this.state.ant;

        if (this.currentCell.state.isBlack)
        {
            if (this.state.ant.rotation == 0)
            {
                coords.y += 1;
                coords.rotation = 90;
            }
            else if (this.state.ant.rotation == 90)
            {
                coords.x += 1;
                coords.rotation = 180;
            }
            else if (this.state.ant.rotation == 180)
            {
                coords.y -= 1;
                coords.rotation = 270;
            }
            else
            {
                coords.x -= 1;
                coords.rotation = 0;
            }

        }
        else
        {
            if (this.state.ant.rotation == 0)
            {
                coords.y -= 1;
                coords.rotation = -90;
            }
            else if (this.state.ant.rotation == -90)
            {
                coords.x -= 1;
                coords.rotation = -180;
            }
            else if (this.state.ant.rotation == -180)
            {
                coords.y += 1;
                coords.rotation = -270;
            }
            else
            {
                coords.x += 1;
                coords.rotation = 0;
            }
        }

        // toggle cell color
        var isBlack = this.currentCell.state.isBlack;

        this.currentCell.setState({
            isBlack: !isBlack
        });

        // move ant
        this.setState({
            ant : coords
        });

        this.movementID++;
    },

    render: function() {

        return (
            <div>
              <Console App={this} />
              <Grid    App={this} />

              <div className="movementID">
                {this.movementID}
              </div>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
