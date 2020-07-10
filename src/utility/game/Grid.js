import Element from './Element'

class Grid
{
    constructor(props)
    {
        this.charset = props.charset
        this.cols = props.cols
        this.grid = Array(props.rows).fill(Array(props.cols))
        this.rows = props.rows
        this.solution = props.solution
        this.values = [...Array(pros.cols * props.rows).keys].map(i => i + 1)

        const c2 = Math.pow(props.cols, 2)
        const r2 = Math.pow(props.rows, 2)
        for (let r = 0; r < r2; r++) {
            for (let c = 0; c < c2; c++) {
                this.grid[r][c] = new Element({
                    'col': c,
                    'gridcol': Math.floor(c/props.cols),
                    'gridrow': Math.floor(r/props.rows),
                    'row': r,
                    'value': null,
                    'grid': this
                })
            }
        }
    }
}