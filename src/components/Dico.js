import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { readFileSync } from 'fs'
import vm from 'vm'

class Dico extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: this.props.lang,
      words: null
    }
  }

  componentDidMount = () => {
  }

  get = (key, binds) => {
    let value = key
    let [section, subkey] = key.split('.')
    if (this.state.words === null) {
      this.learn(this.state.lang)
    }

    if (this.words[section] !== undefined && this.words[section][subkey] !== undefined) {
      value = this.words[section][subkey]
      if (binds!==null) {
        if (Array.isArray(binds)) {
          value = this.replaceBindsArray(value, binds)
        } else if (typeof(binds) === 'object') {
          value = this.replaceBindsObject(value, binds)
        }
      }
    }

    return value;
  }

  learn = (lang) => {
    try {
      const data = readFileSync('./lang/' + lang + '.js')
      console.log(data)
      // this.words = new vm.Script(data)
    } catch(err) {
      throw err
    }

    return lang
  }

  render = () => {
    return (
      <div className="dico lang-switcher text-align-right" data-lang={ this.state.lang }>
        { this.state.lang }
      </div>
    )
  }

  replaceBindsArray = (str, arr) => {
    return str
  }

  replaceBindsObject = (str, obj) => {
    return str
  }

  setStateItem = (key, value) => {
    let s = this.state
    s.key = value
    this.setState(s)
  }
}
  
// PropTypes
Dico.propTypes = {
  lang: PropTypes.string.isRequired
}
  
export default Dico