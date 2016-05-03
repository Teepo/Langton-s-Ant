var App = React.createClass({

    getInitialState: function () {

        return {
            gridSize: {
                x : 30,
                y : 30
            },

            ant : {
                x : 5,
                y : 5,
                rotation: 0,
            },

            speed : 100,
        };
    },

    componentDidMount: function() {

        this.timeoutHandler = setTimeout(this.draw, this.state.speed);
    },

    componentDidUpdate: function() {

        this.timeoutHandler = setTimeout(this.draw, this.state.speed);
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
        else
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

        // toggle cell color
        var isBlack = this.currentCell.state.isBlack;

        this.currentCell.setState({
            isBlack: !isBlack
        });

        // move ant
        this.setState({
            ant : coords
        });
    },

    render: function() {

        return (
            <div>
              <Console App={this} />
              <Grid    App={this} />
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));