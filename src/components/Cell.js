import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Cell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            col: Number(this.props.col),
            cols: Number(this.props.cols),
            charset: this.props.charset,
            gridcol: Number(this.props.gridcol),
            gridrow: Number(this.props.gridrow),
            row: Number(this.props.row),
            rows: Number(this.props.rows)
        }
    }

    gridItemContentStyle = (props) => {
        const line_heights = {}
        const prefixes = ['Webkit', 'ms', 'Moz', 'O'];
        const font_size = '2.0rem'
        const line_height = '2.75rem'
        prefixes.map((prefix) => {
            line_heights[prefix + 'LineHeight'] = line_height
            return true
        }, line_heights, line_height)
        const element_style = {
            ...line_heights,
            fontSize: font_size,
            height: '100%',
            lineHeight: line_height,
            width: '100%'
        }

        return (element_style)
    }

    render = () => {
        const class_names = ['cell grid-item sudoku-grid-item position-relative inner-borders']
        if  (((this.state.row + 1) % this.state.rows) === 0) {
            class_names.push('inner-borders-grid-bottom')
        }
        if  (((this.state.col + 1) % this.state.cols) === 0) {
            class_names.push('inner-borders-grid-right')
        }
        return (
            <div
            id={ this.props.id }
            className={ class_names.join(' ') }
            data-col={ this.state.col }
            data-gridcol={ this.state.gridcol }
            data-gridrow={ this.state.gridrow }
            data-row={ this.state.row }
            data-section={ this.props.section }
            >
                <span className="position-relative inline-block" style={ this.gridItemContentStyle({
                    nb_rows: this.state.rows
                }) }>
                    <span id={ `cell_${this.state.row}_${this.state.col}` }></span>
                    <span
                    id={ `possibles_${this.state.row}_${this.state.col}` }
                    className="position-absolute possibles"></span>
                    <span className="position-absolute coordinates"
                    data-y={ this.state.row + 1 }
                    data-x={ this.state.col + 1 }></span>
                </span>
            </div>
        )
    }
}

// PropTypes
Cell.propTypes = {
    id: PropTypes.string.isRequired,
    charset: PropTypes.array.isRequired,
    col: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    gridcol: PropTypes.number.isRequired,
    gridrow: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    section: PropTypes.string.isRequired
}

export default Cell
