
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

    componentWillMount : function() {

        if (this.props.App.state.ant.x == this.state.coords.x
           && this.props.App.state.ant.y == this.state.coords.y)
        {
            this.props.App.setState({
                currentCell : this
            });

            console.log('ANT FOUNDED');
        }
    },

    onClick: function() {

        this.setState({
            isBlack : !this.state.isBlack
        });
    },

    render: function() {

        var cellClassName = this.state.isBlack ? 'black' : 'white';

        if (this.props.App.state.ant.x == this.state.coords.x
           && this.props.App.state.ant.y == this.state.coords.y)
        {
            cellClassName += " ant";
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
                              &nbsp;
                              Y = <input type="number" name="y" value={App.state.gridSize.y} onChange={this.onChange} />
                            </div>

                            <div className="controls">
                            </div>
                        </div>
                    </div>

                </div>);
    }
});var App = React.createClass({

    getInitialState: function () {

        return {
            gridSize : {
                x : 11,
                y : 11
            },

            ant : {
                x : 5,
                y : 5
            },

            currentCell : null,

            speed : 1000
        };
    },

    componentWillMount: function() {
        console.log('APP MOUNT');
    },

    componentDidMount: function() {
        console.log('APP DID MOUNT');
    },

    componentDidUpdate: function() {
        console.log('APP DID UPDATE');
    },

    componentWillUpdate: function() {
        console.log('APP WILL UPDATE');
    },

    componentWillUnmount: function() {
        console.log('APP UNMOUNT');
    },

    draw: function() {

        console.log('APP DRAW', this.state);

        var coords = this.state.ant;

        if (this.state.currentCell.state.isBlack)
            coords.x += 1;
        else
            coords.y += 1;

        this.setState({
            ant : coords
        });
    },

    render: function() {

        console.log('RENDER APP');

        return (
            <div>
              <Console App={this} />
              <Grid    App={this} />
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
