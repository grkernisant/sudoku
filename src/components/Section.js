import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Cell from './Cell'

class Section extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cols: Number(this.props.cols),
      charset: this.props.charset,
      gridcol: Number(this.props.gridcol),
      gridrow: Number(this.props.gridrow),
      rows: Number(this.props.rows)
    }
  }

  componentDidMount = () => {
  }

  style = (props) => {
    const grid_template_columns = `repeat(${ props.nb_cols }, minmax(min(3rem, 100%), 1fr))`
    const grid_template_rows = `repeat(${ props.nb_rows }, 3rem)`
    return ({
        gridTemplateColumns: grid_template_columns,
        gridTemplateRows: grid_template_rows
    })
  }

  render = () => {
    const gc = this.state.gridcol
    const gr = this.state.gridrow
    const section_name = `section-${gr}-${gc}`
    const cells = [];
    for (let r = 0; r < this.state.rows; r++) {
        for (let c = 0; c < this.state.cols; c++) {
        let uuid = `${section_name}-cell-${r}-${c}`
        let row = this.state.gridrow * this.state.rows + r
        let col = this.state.gridcol * this.state.cols + c
        cells.push(<Cell
          key={ uuid }
          id={ uuid }
          charset={ this.state.charset }
          col={ col }
          cols={ this.state.cols }
          section={ section_name }
          gridcol={ this.state.gridcol }
          gridrow={ this.state.gridrow }
          row={ row }
          rows={ this.state.rows } />);
      }
    }

    const classNames = ['section inline-grid outer-borders'];

    return (
        <div
          id={ this.props.id }
          className={ classNames.join(' ') }
          data-gridrow={ this.state.gridrow }
          data-gridcol={ this.state.gridcol }
          style={ this.style({
            nb_cols: this.state.cols,
            nb_rows: this.state.rows
          }) }>
            { cells }
        </div>
    )
  }
}

// PropTypes
Section.propTypes = {
  id: PropTypes.string.isRequired,
  charset: PropTypes.array.isRequired,
  cols: PropTypes.number.isRequired,
  gridcol: PropTypes.number.isRequired,
  gridrow: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired
}

export default Section
