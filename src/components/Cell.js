import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Cell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            col: Number(this.props.col),
            cols: Number(this.props.cols),
            chars: this.props.chars,
            gridcol: Number(this.props.gridcol),
            gridrow: Number(this.props.gridrow),
            row: Number(this.props.row),
            rows: Number(this.props.rows)
        }
    }

    gridItemContentStyle = (props) => {
        const line_heights = {}
        const prefixes = ['Webkit', 'ms', 'Moz', 'O'];
        const font_size = (7/12*props.nb_rows).toFixed(2) + 'rem';
        const line_height = props.nb_rows + 'rem'

        prefixes.map((prefix) => {
            line_heights[prefix + 'LineHeight'] = line_height
            return true
        }, line_heights, line_height)
        const element_style = {
            ...line_heights,
            fontSize: font_size,
            lineHeight: line_height
        }

        return (element_style)
    }

    render = () => {
        const class_names = ['cell grid-item sudoku-grid-item inner-borders']
        if  (((this.state.row + 1) % this.state.rows) === 0) {
            class_names.push('inner-borders-grid-bottom')
        }
        if  (((this.state.col + 1) % this.state.cols) === 0) {
            class_names.push('inner-borders-grid-right')
        }
        return (
            <div
            className={ class_names.join(' ') }
            data-col={ this.state.col }
            data-gridcol={ this.state.gridcol }
            data-gridrow={ this.state.gridrow }
            data-row={ this.state.row }
            >
                <span className="inline-block" style={ this.gridItemContentStyle({
                    nb_rows: this.state.rows
                }) }>[{ (this.state.row + 1) + ', ' + (this.state.col + 1) }]</span>
            </div>
        )
    }
}

// PropTypes
Cell.propTypes = {
    chars: PropTypes.array.isRequired,
    col: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    gridcol: PropTypes.number.isRequired,
    gridrow: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired
}

export default Cell
