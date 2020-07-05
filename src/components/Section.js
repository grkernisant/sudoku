import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Cell from './Cell'

class Section extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clearAfter: this.props.clearAfter,
      cols: Number(this.props.cols),
      chars: this.props.chars,
      gridcol: Number(this.props.gridcol),
      gridrow: Number(this.props.gridrow),
      rows: Number(this.props.rows)
    }
  }

  componentDidMount = () => {
  }

  render = () => {
    const cells = [];
    for (let r = 0; r < this.state.rows; r++) {
        for (let c = 0; c < this.state.cols; c++) {
        let uuid = uuidv4()
        let row = this.state.gridrow * this.state.rows + r
        let col = this.state.gridcol * this.state.cols + c
        let clearAfter = c === this.state.cols-1
        cells.push(<Cell
          key={ uuid }
          clearAfter={ clearAfter }
          chars={ this.state.chars }
          col={ col }
          cols={ this.state.cols }
          gridcol={ this.state.gridcol }
          gridrow={ this.state.gridrow }
          row={ row }
          rows={ this.state.rows } />);
      }
    }

    const classNames = ['section inline-block'];
    if (this.state.clearAfter) {
      classNames.push('line-break-after');
    }

    return (
        <ul
        className={ classNames.join(' ') }
        data-gridrow={ this.state.gridrow }
        data-gridcol={ this.state.gridcol }>
            { cells }
        </ul>
    )
  }
}

// PropTypes
Section.propTypes = {
  clearAfter: PropTypes.bool.isRequired,
  chars: PropTypes.array.isRequired,
  cols: PropTypes.number.isRequired,
  gridcol: PropTypes.number.isRequired,
  gridrow: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired
}

export default Section
