import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Section from './Section'

class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cols: Number(this.props.cols),
            rows: Number(this.props.rows),
            chars: this.props.chars
        }

        this.solution = Array(this.props.rows).fill(Array(this.props.cols).fill(0))
        console.log(this.solution)
    }

    style = (props) => {
        const grid_template_columns = `repeat(${ props.nb_cols }, 1fr)`
        return ({
            gridTemplateColumns: grid_template_columns
        })
    }

    render = () => {
        const sections = [];
        for (let r = 0; r < this.state.rows; r++) {
            for (let c = 0; c < this.state.cols; c++) {
                let uuid = `section-${r}-${c}`
                let clearAfter = c === this.state.cols-1
                sections.push(<Section
                    key={ uuid }
                    id={ uuid }
                    rows={ this.state.rows }
                    cols={ this.state.cols }
                    gridrow={r}
                    gridcol={c}
                    chars={ this.state.chars }
                    clearAfter={clearAfter} />);
            }
        }

        return (
            <div className="grid sudoku-grid" style={ this.style({
                nb_cols: this.state.cols,
                nb_rows: this.state.rows
            }) }>
                { sections }
            </div>
        )
    }
};

// PropTypes
Grid.propTypes = {
    cols: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    chars: PropTypes.array.isRequired
}

export default Grid
