import PropTypes from 'prop-types'
import React, { Component } from 'react'
import GridLogic from '../utility/game/Grid'
import Section from './Section'

class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cols: Number(props.cols),
      rows: Number(props.rows),
      charset: props.charset
    }

    this.solution_generated = false
    this.gridLogic = new GridLogic({
      charset: props.charset,
      cols: props.cols,
      rows: props.rows
    })
  }

  componentDidMount = () => {
    if (!this.solution_generated) {
      this.generateSolution()
    }
  }

  generateSolution = () => {
    this.gridLogic.solve()
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
        sections.push(<Section
          key={ uuid }
          id={ uuid }
          rows={ this.state.rows }
          cols={ this.state.cols }
          gridrow={r}
          gridcol={c}
          charset={ this.state.charset } />);
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
  charset: PropTypes.array.isRequired
}

export default Grid
