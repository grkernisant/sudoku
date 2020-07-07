const ALPHANUM = 'ALPHANUM'
const NUMERIC = 'NUMERIC'

let values = []
let type = NUMERIC

const Charset = {
    get: (nb_chars, rosetta) => {
        // console.log(rosetta.get('ERRORS.MAX_CHARS_LIMIT'))
        values = []
        switch(type) {
            case ALPHANUM:
                if  (nb_chars>62) {
                    //throw();
                }
            break;

            case NUMERIC:
            default:
                for (let v = 1; v <= nb_chars; v++) {
                    values.push(v);
                }
            break;
        }

        return values;
    },
    setType: (t) => {
        type = validCharsetType(t)
        return type
    }
}

const validCharsetType = (type) => {
    switch(type) {
        case ALPHANUM:
            type = ALPHANUM
        break;

        case NUMERIC:
        default:
            type = NUMERIC
        break;
    }

    return type
}

export default Charset