import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faLanguage } from '@fortawesome/pro-regular-svg-icons'
import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Dico from './components/Dico'
import Game from './components/Game'
import Charset from './utility/Charset'

import './reset.css'
import './App.css'
import './Sudoku.css'

// font awesome
library.add( faLanguage )
dom.watch()

class App extends Component {
  constructor(props) {
    super(props);

    console.log('constructing App')

    const nb_cols = 3
    const nb_rows = 3
    const nb_chars = nb_rows * nb_cols
    this.state = {
      charsetType: Charset.setType(Charset.NUMERIC),
      lang: 'en',
      settings: {
        cols: nb_cols,
        rows: nb_rows,
        chars: Charset.get(nb_chars)
      }
    }
  }
  
  componentDidMount = () => {
  }

  render = () => {
    return (
      <div className="app">
        <Dico lang={ this.state.lang } languages={ ['en', 'fr', 'dk', 'ht'] } />
        <Game name={ uuidv4() } settings={ this.state.settings } />
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
