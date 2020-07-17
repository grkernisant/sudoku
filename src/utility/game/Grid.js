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
    this.history = []
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
          blacklist: [],
          forks: null
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
      .filter(v => v !== 0 && v !== '')
  }

  getGridColumn = (c) => {
    return c - c % this.cols
  }

  getGridRow = (r) => {
    return r - r % this.rows
  }

  getGridElements = (r, c) => {
    const c0 = this.getGridColumn(c)
    const r0 = this.getGridRow(r)

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
      .filter(v => v !== 0 && v !== '')
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
      .filter(v => v !== 0 && v !== '')
  }

  gridContains = (r, c, row, col) => {
    const c0 = this.getGridColumn(c)
    const r0 = this.getGridRow(r)

    /* console.log(`[${row}, ${col}]?`)
    console.log(`[${r0}, ${c0}] [${r0}, ${c0+this.cols}]`)
    console.log(`[${r0+this.rows}, ${c0}] [${r0+this.rows}, ${c0+this.cols}]`) */
    return r0 <= row &&
      row < (r0 + this.rows) &&
      c0 <= col &&
      col < (c0 + this.cols)
  }

  historyCommit = (obj, value) => {
    if (this.charset.includes(value)) {
      this.history.push({
        col: obj.col,
        row: obj.row,
        value
      })
    } else {
      if (value === undefined) {
        if (this.history.length>0) {
          let last_added = this.history.pop()
          this.elements[last_added.row][last_added.col].block(last_added.value)
          this.elements[last_added.row][last_added.col].value = ''
        }
      }
    }
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

  setColumnValues = (col, values) => {
    const elements = this.getColumnElements(col)
    values.map( (value, index) => {
      elements[index].value = value
      return value
    })
  }

  setGridValues = (row, col, values) => {
    const elements = this.getGridElements(row, col)
    values.map( (value, index) => {
      elements[index].value = value
      return value
    })
  }

  setRowValues = (row, values) => {
    const elements = this.getRowElements(row)
    values.map( (value, index) => {
      elements[index].value = value
      return value
    })
  }

  shuffle = (arr) => {
    const shuffled = [...arr]
    shuffled.sort( (a, b) => Math.random()<0.5 ? 1 : -1)

    return shuffled
  }

  solve = () => {
    if (this.isEmpty()) {
      console.log('Grid is empty')
      const c = Math.floor(Math.pow(this.cols, 2) / 2) - 1
      const r = Math.floor(Math.pow(this.rows, 2) / 2) - 1
      console.log(`${r} ${c}`)
      this.setGridValues(r, c, this.shuffle(this.charset))

      /* let i_max = Math.pow(this.rows, 2) * Math.pow(this.cols, 2) - this.charset.length
      let i = 0
      // let elements_flat = this.elements.flat(1)
      let elements = [...this.elements.flat(1)]
      let n, m, min_possibles, ri, p, x, y
      let undefined_counter = 0
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
        x = elements[ri].col
        y = elements[ri].row
        // select random possible value
        // elment's first fork?
        if (!elements[ri].hasForks()) {
          p = this.shuffle([...elements[ri].possibles])
          elements[ri].forks = p
        } else {
          p = elements[ri].fork()
        }

        console.log(`Selecting [${y}, ${x}] = ${p[0]} out of ${m}/${n} elements, with ${min_possibles} possibles ${ p.join(',')}`)
        elements[ri].value = p[0]

        undefined_counter += p[0]===undefined ? 1 : 0
        i+= p[0]!==undefined ? 1 : 0
      } while (i < i_max && undefined_counter < 1) */
    } else {
      console.log('Grid has values')
    }
  }

  static sortByMinPossibles = (a, b) => {
    if (a.possibles.length < b.possibles.length) {
      return -1
    } else if (a.possibles.length === b.possibles.length) {
      return 0
    }

    return 1
  }

  updatePossibles = (e, nv) => {
    // adding or removing from cell?
    let values = {}
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
      // affected_elements[index].possibles = affected_elements[index].possibles.filter(v => v !== pv)

      let rc = index.split('_')
      let c = Number(rc[1])
      let r = Number(rc[0])
      let c0 = this.getGridColumn(c)
      let r0 = this.getGridRow(r)
      values['row_' + r] = this.getRowValues(r)
      if (adding && e.row === r && e.charset.includes(pv)) {
        values['row_' + r].push(pv)
      }
      values['col_' + c] = this.getColumnValues(c)
      if (adding && e.col === c && e.charset.includes(pv)) {
        values['col_' + c].push(pv)
      }
      values[`grid_${r0}_${c0}`] = this.getGridValues(r0, c0)
      if  (adding && e.charset.includes(pv) && this.gridContains(r, c, e.row, e.col)) {
        values[`grid_${r0}_${c0}`].push(pv)
      }
      
      let impossibles_set = new Set()
      let indexes = []
      indexes.push(`row_${r}`)
      indexes.push(`col_${c}`)
      indexes.push(`grid_${r0}_${c0}`)
      indexes.map(v => {
        if (values[v].length > 0) {
          impossibles_set.add(...values[v])
        }
        return v
      })
      let impossibles = Array.from(impossibles_set.values())
      affected_elements[index].possibles = affected_elements[index].charset.filter(v => !impossibles.includes(v))
      console.log(`index: ${index}`)
      console.log(impossibles_set)
      console.log(`row_${r}: [${values[`row_${r}`].join(', ')}]`)
      console.log(`col_${c}: [${values[`col_${c}`].join(', ')}]`)
      console.log(`grid_${r0}_${c0}: [${values[`grid_${r0}_${c0}`].join(', ')}]`)
      console.log(`impossibles: [${impossibles.join(', ')}]`)
      console.log(`possibles: [${affected_elements[index].possibles.join(', ')}]`)

      // affected_elements[index].possibles.push(pv)

      document.getElementById(`possibles_${index}`).innerHTML = affected_elements[index].possibles.join(',')
    }
  }
}

export default Grid