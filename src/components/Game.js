import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Grid from './Grid'

class Game extends Component {
    constructor(props) {
        super(props)

        console.log('constructing Game')
        this.state = {
            settings: {
                charset: this.props.settings.charset,
                cols: this.props.settings.cols,
                rows: this.props.settings.rows
            }
        }
    }

    render = () => {
        return (
            <div className="game sudoku">
                <Grid
                rows={ this.state.settings.rows }
                cols={ this.state.settings.cols }
                charset={ this.state.settings.charset } />
            </div>
        )
    }
}

// PropTypes
Game.propTypes = {
    name: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
}

export default Game;
