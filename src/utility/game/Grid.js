import Bing from '../../components/Dico'
import Element from './Element'
class Grid
{
  constructor(props) {
    this.cols = props.cols !== undefined ? props.cols : null
    this.rows = props.rows !== undefined ? props.rows : null
    if (this.cols === null || this.rows === null) {
      throw (Bing.googleAssistant().translate('ERRORS.LOGIC.MISSING_DIMENSIONS'))
    }

    const c2 = Math.pow(props.cols, 2)
    const r2 = Math.pow(props.rows, 2)
    this.elements = new Array(r2).fill(0).map( r => new Array(c2).fill(undefined))
    this.solution = props.solution !== undefined ? props.solution : new Array(r2).fill(0).map(x => new Array(c2).fill(0))
    this.values = [...Array(props.cols * props.rows).keys()].map(i => i + 1)
    this.charset = props.charset !== undefined ?
      props.charset : [...Array(props.cols * props.rows).keys()].map(i => i + 1)
    this.update_possibles = props.update_possibles !== undefined ? props.update_possibles : true

    this.charset_map = new Map()
    this.values.map( (value, index) => {
      this.charset_map.set(this.values[index], this.charset[index])
      return value
    })

    for (let r = 0; r < r2; r++) {
      for (let c = 0; c < c2; c++) {
        this.elements[r][c] = new Element({
          parent: this,
          col: c,
          row: r,
          gridcol: Math.floor(c/this.cols),
          gridrow: Math.floor(r/this.rows),
          value: this.solution[r][c],
          charset: [...this.charset],
          possibles: [...this.charset],
          values: [...this.values]
        })
      }
    }
  }

  getColumnElements = (c) => {
    const r2 = Math.pow(this.rows, 2)
    let elements = []
    for (let r = 0; r < r2; r++) {
      elements.push(this.elements[r][c])
    }

    return elements
  }

  getColumnValues = (c) => {
    return this.getColumnElements(c)
      .map(o => o.value)
      .filter(v => v !== 0)
  }

  getGridElements = (r, c) => {
    const c0 = c - c % this.cols
    const r0 = r - r % this.rows

    const cmax = c0 + this.cols
    const rmax = r0 + this.rows
    let elements = []
    for (let r = r0; r < rmax; r++) {
      for (let c = c0; c < cmax; c++) {
        elements.push(this.elements[r][c])
      }
    }

    return elements
  }

  getGridValues = (r, c) => {
    return this.getGridElements(r, c)
      .map(o => o.value)
      .filter(v => v !== 0)
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getRowElements = (r) => {
    return [...this.elements[r]]
  }

  getRowValues = (r) => {
    return this.getRowElements(r)
      .map(o => o.value)
      .filter(v => v !== 0)
  }

  isEmpty = () => {
    const r2 = Math.pow(this.rows, 2)
    let found_value = false
    let r = 0
    while (r < r2 && !found_value) {
      found_value = this.getRowValues(r).length > 0
      r++
    }

    return !found_value
  }

  shuffle = (arr) => {
    const shuffled = [...arr]
    shuffled.sort( (a, b) => Math.random()<0.5 ? 1 : -1)

    return shuffled
  }

  setRowValues = (row, values) => {
    const elements = this.getRowElements(row)
    values.map( (value, index) => {
      elements[index].value = value
      return value
    })
  }

  solve = () => {
    if (this.isEmpty()) {
      console.log('Grid is empty')
      this.setRowValues(0, this.shuffle(this.charset))
      let i_max = 72
      let i = 0
      // let elements_flat = this.elements.flat(1)
      let elements = [...this.elements.flat(1)]
      let n, m, min_possibles, ri, p
      do {
        // get min possibles
        elements = elements.filter(el => !el.charset.includes(el.value)).sort(this.sortByMinPossibles)
        // how many can be set?
        n = elements.length
        m = 0
        min_possibles = elements[0].possibles.length
        while (m<n && elements[m].possibles.length===min_possibles) {
          m++
        }
        ri = this.getRandomInt(m)
        console.log(`Selecting ${ri} out of ${m}/${n} elements, with ${min_possibles} possibles`)
        // select random possible value
        p = this.shuffle([...elements[ri].possibles])
        elements[ri].value = p[0]

        i++
      } while (i < i_max && elements[ri].value!==undefined)
    } else {
      console.log('Grid has values')
    }
  }

  static sortByMinPossibles = (a, b) => {
    if (a.possibles.length === b.possibles.length) {
      if (!a.charset.includes(a.value) && b.charset.includes(b.value)) {
        return -1
      } else if (a.charset.includes(a.value) && !b.charset.includes(b.value)) {
        return 1
      }

      return 0
    } else if (a.possibles.length < b.possibles.length) {
      return -1
    }

    return 1
  }

  updatePossibles = (e, nv) => {
    // adding or removing from cell?
    let adding = this.charset.includes(nv) ? true : false
    let pv = adding ? nv : e.value
    // populate possibles
    const affected_elements = {}
    this.getRowElements(e.row).map(obj => {
      let index = `${obj.row}_${obj.col}`
      affected_elements[index] = obj
      return obj
    })
    this.getColumnElements(e.col).map(obj => {
      let index = `${obj.row}_${obj.col}`
      if (affected_elements[index] === undefined)
        affected_elements[index] = obj

      return obj
    })
    this.getGridElements(e.row, e.col).map(obj => {
      let index = `${obj.row}_${obj.col}`
      if (affected_elements[index] === undefined)
        affected_elements[index] = obj

      return obj
    })
    for(let index in affected_elements) {
      if  (adding) {
        affected_elements[index].possibles = affected_elements[index].possibles.filter(v => v !== pv)
      } else if (!affected_elements[index].possibles.includes(pv)) {
        // affected_elements[index].possibles.push(pv)
      }
      document.getElementById(`possibles_${index}`).innerHTML = affected_elements[index].possibles.join(',')
    }    
  }
}

export default Grid