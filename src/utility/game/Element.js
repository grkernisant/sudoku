import Bing from '../../components/Dico'

let update_timestamp = {
  set: function (obj, prop, value) {
    if (prop === 'value') {
      obj.last_modified = (new Date()).getTime()
      obj.parent.historyCommit(obj, value)
      if (obj.parent.update_possibles) {
        value = obj.charset.includes(value) ? value : ''
        obj.parent.updatePossibles(obj, value)
        document.getElementById(`cell_${obj.row}_${obj.col}`).innerHTML = value
      }
    } else if (prop === 'forks') {
      if (obj.forks !== null) {
        return true
      }
    } else if (prop === 'last_modified') {
      throw (Bing.googleAssistant().translate('ERRORS.UNAUTHORIZED'))
    }

    obj[prop] = value
    return true  
  }
}
class Element {
  constructor(props) {
    this.col = props.col
    this.row = props.row
    this.gridcol = props.gridcol
    this.gridrow = props.gridrow
    this.value = props.value
    this.last_modified = null
    this.parent = props.parent
    this.charset = props.charset
    this.possibles = props.possibles
    this.blacklist = props.blacklist
    this.forks = props.forks // static

    return new Proxy(this, update_timestamp)
  }

  block = (value) => {
    this.blacklist.push(value)
  }

  fork = () => {
    // place first element last
    if (this.hasForks()) {
      this.forks.push(this.forks.shift())
      return [...this.forks]
    }

    return []
  }

  hasForks = () => {
    return Array.isArray(this.forks)
  }
}

export default Element
