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

    const nb_cols = 3
    const nb_rows = 3
    const nb_chars = nb_rows * nb_cols
    const dictionary =  new Dico({lang: 'en'})
    this.state = {
      charsetType: Charset.NUMERIC,
      dico: dictionary,
      lang: 'en',
      settings: {
        cols: nb_cols,
        rows: nb_rows,
        chars: Charset.get(nb_chars, dictionary)
      }
    }
  }
  
  componentDidMount = () => {
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
