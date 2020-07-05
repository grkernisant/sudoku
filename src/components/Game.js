import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Grid from './Grid'

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            settings: {
                chars: this.props.settings.chars,
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
                chars={ this.state.settings.chars } />
            </div>
        )
    }
}

// PropTypes
Game.propTypes = {
    settings: PropTypes.object.isRequired
}

export default Game;
