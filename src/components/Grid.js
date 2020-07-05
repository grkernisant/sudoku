import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Section from './Section'

class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cols: Number(this.props.cols),
            rows: Number(this.props.rows),
            chars: this.props.chars
        }
    }

    render = () => {
        const sections = [];
        for (let r = 0; r < this.state.rows; r++) {
            for (let c = 0; c < this.state.cols; c++) {
                let uuid = uuidv4()
                let clearAfter = c === this.state.cols-1
                sections.push(<Section
                    key={uuid}
                    rows={ this.state.rows }
                    cols={ this.state.cols }
                    gridrow={r}
                    gridcol={c}
                    chars={ this.state.chars }
                    clearAfter={clearAfter} />);
            }
        }

        return (
            <div className="grid">
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
