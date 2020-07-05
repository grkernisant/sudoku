import jQuery from 'jquery'
import React, { Component } from 'react'
import Dico from './components/Dico'
import Game from './components/Game'
import Charset from './utility/Charset'

import './reset.css'
import './App.css'
import './Sudoku.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charsetType: Charset.NUMERIC,
      dico: Dico,
      lang: 'en',
      settings: {
        cols: 3,
        rows: 3,
        chars: Charset.get(Dico, 4)
      }
    }
  }
  
  componentDidMount = () => {
    jQuery('.cell.line-break-after').after('<li class="block"></li>')
    jQuery('.section.line-break-after').after('<div class="block"></div>')

    let cols = this.state.settings.cols
    let rows = this.state.settings.rows
    jQuery('.section[data-gridcol="' + (cols - 1) + '"]').addClass('outerborder-right')
    jQuery('.section[data-gridrow="' + (rows - 1) + '"]').addClass('outerborder-bottom')

    let col_max = Math.pow(cols, 2) - 1
    let row_bot = Math.pow(rows, 2) - 1
    for (let c = cols-1; c <= col_max; c+= cols) {
      jQuery('.cell[data-col="' + c + '"]').addClass('bordercollapse-right')
    }
    for (let r = rows-1; r <= row_bot; r+= rows) {
      jQuery('.cell[data-row="' + r + '"]').addClass('bordercollapse-bottom')
    }
  }

  render = () => {
    return (
      <div className="app">
        <Dico lang={ this.state.lang } />
        <Game settings={ this.state.settings } />
      </div>
    )
  }

  setChars = () => {
    let nb_chars = this.state.settings.cols * this.state.settings.rows
    let chars = Charset.get(this.state.dico, nb_chars)
    this.setSettings('chars', chars)
  }

  setCharsetType = (charsetType) => {
    this.setStateItem('charsetType', Charset.setType(charsetType))
  }

  setSettings = (setting, value) => {
    let settings = this.state.settings
    settings[setting] = value
    this.setStateItem('settings', settings)
  }

  setStateItem = (key, value) => {
    let s = this.state
    s.key = value
    this.setState(s)
  }
}

export default App;
