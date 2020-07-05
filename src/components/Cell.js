import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Cell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clearAfter: this.props.clearAfter,
            col: Number(this.props.col),
            cols: Number(this.props.cols),
            chars: this.props.chars,
            gridcol: Number(this.props.gridcol),
            gridrow: Number(this.props.gridrow),
            row: Number(this.props.row),
            rows: Number(this.props.rows)
        }
    }

    render = () => {
        const classNames = ['cell inline-block']
        if (this.state.clearAfter) {
            classNames.push('line-break-after');
        }
        return (
            <li
            className={ classNames.join(' ') }
            data-col={ this.state.col }
            data-gridcol={ this.state.gridcol }
            data-gridrow={ this.state.gridrow }
            data-row={ this.state.row }
            >
                <span className="inline-block">[{ (this.state.row + 1) + ', ' + (this.state.col + 1) }]</span>
            </li>
        )
    }
}

// PropTypes
Cell.propTypes = {
    clearAfter: PropTypes.bool.isRequired,
    chars: PropTypes.array.isRequired,
    col: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    gridcol: PropTypes.number.isRequired,
    gridrow: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired
}

export default Cell
