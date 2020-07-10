import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

class Dico extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lang: this.props.lang,
      languages: this.props.languages,
      words: null,
    }
    this.timers = {}
  }

  cleanUp = () => {
    // previous state clean up?
    if (this.timers.switch_lang !== undefined) {
      clearTimeout(this.timers.switch_lang)
      this.timers.switch_lang = undefined
    }
  }

  componentDidMount = () => {
    const hello_world = {
      'en': {
        'hello': 'Hello',
        'world': 'World'
      },
      'fr': {
        'hello': 'Bonjour',
        'world': 'Monde'
      },
      'dk': {
        'hello': 'Hej',
        'world': 'Verden'
      },
      'ht': {
        'hello': 'Bonjou',
        'world': 'Latè'
      }
    }
    for (let lang in hello_world) {
      this.learn(lang)
      console.log(this.get('HELLO_WORLD', hello_world[lang]))
    }
  }

  get = (key, binds) => {
    if (this.state.words === null) {
      this.learn(this.state.lang)
    }

    let value = key
    try {
      let parts = key.split('.')
      value = parts.reduce((total, current) => {
        return total[current]
      }, this.words)

      if (binds!==null) {
        if (Array.isArray(binds)) {
          value = this.replaceBindsArray(value, binds)
        } else if (typeof(binds) === 'object') {
          value = this.replaceBindsObject(value, binds)
        }
      }
    } catch(err) {
      value = key
    }

    return value
  }

  getFlagClassNames = (lang) => {
    let flag_classnames = ['flag', 'inline-block']
    flag_classnames.push(lang)
    return flag_classnames.join(' ')
  }

  langOptionClick = (e, id) => {
    try {
      e.preventDefault();
      const lang_options = document.getElementById('lang-options')
      const parent = lang_options.parentElement;
      if  (parent) {
        const active = 'active'
        const inactive = 'inactive'
        const has_active = parent.className.match(/\bactive\b/g)
        const lang_options_classes = parent.className
          .split(' ')
          .filter(c => c!==active && c!==inactive)
        if (has_active) {
          // close options
          lang_options_classes.push(inactive)
        } else {
          // open options
          lang_options_classes.push(active)
        }
        parent.className = lang_options_classes.join(' ')
        // switch lang?
        this.switchLanguage(id)
      }
    } catch(err) {
      console.log(err)
    }
  }

  learn = (lang) => {
    try {
      const lang_file = require('../utility/lang/' + lang)
      this.words = lang_file.default
    } catch(err) {
      throw err
    }

    return lang
  }

  openLanguageOptionsPane = (e) => {
    e.preventDefault()
    const lang_id = `switch-${ this.state.lang }`
    document.getElementById(lang_id).click()
  }

  render = () => {
    // cleanup ?
    this.cleanUp()

    const lang_options = []
    this.state.languages.map((lang) => {
      lang_options.push(<span
        id={ 'switch-' + lang }
        key={ uuidv4() }
        className={ this.getFlagClassNames(lang) }
        onClick={ (e) => this.langOptionClick(e, lang) }></span>
      )
      return lang
    }, lang_options)
    return (
      <div className="dico lang-switcher text-align-right inactive" data-lang={ this.state.lang }>
        <FontAwesomeIcon icon={['far', 'language']} onClick={ (e) => this.openLanguageOptionsPane(e) }/>
        <span id="lang-options" className="flags inline-block">
        { lang_options }
        </span>
      </div>
    )
  }

  replaceBindsArray = (str, arr) => {
    str = arr.reduce((total , current) => {
      return total.split('?', 2).join(current)
    }, str)

    return str
  }

  replaceBindsObject = (str, obj) => {
    for (let key in obj) {
      let bind = `:${key}:`
      if (str.indexOf(bind)!==-1) {
        str = str.replace(bind, obj[key])
      }

    }

    return str
  }

  setStateItem = (key, value) => {
    if (typeof(key)==='string') {
      this.setState({
        ...this.state,
        key: value
      })
    } else if (typeof(key)==='object') {
      this.setState({
        ...this.state,
        ...key
      })
    }
  }

  switchLanguage = (new_lang) => {
    if (new_lang!==this.state.lang) {
      // switch both lang and languages
      const lang_sorted = this.state.languages.filter(lang => lang !== new_lang)
      lang_sorted.unshift(new_lang)
      const new_state_options = {
        lang: new_lang,
        languages: lang_sorted
      }
      if (this.timers.switch_lang === undefined) {
        const self = this
        this.timers.switch_lang = setTimeout(() => {
          self.setStateItem(new_state_options)
        }, 360)
      } else {
        // animation too slow?
        clearTimeout(this.timers.switch_lang)
        this.timers.switch_lang = undefined
        this.setStateItem({
          lang: new_lang,
          languages: lang_sorted
        })
      }
    }
  }
}

// PropTypes
Dico.propTypes = {
  lang: PropTypes.string.isRequired,
  languages: PropTypes.array.isRequired
}

Dico.prototype.getValue = Dico.get

export default Dico
