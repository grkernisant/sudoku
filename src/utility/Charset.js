let values = []
let type = undefined

const Charset = {
    ALPHA: 'ALPHA',
    ALPHANUM: 'ALPHANUM',
    NUMERIC: 'NUMERIC',

    get: (nb_chars, rosetta) => {
        values = []
        switch(type) {
            case Charset.ALPHANUM:
                if  (nb_chars>62) {
                    throw(rosetta.get('ERRORS.MAX_CHARS_LIMIT', [62]));
                }
                const nb_digits = Math.min(9, nb_chars)
                let v = 1
                do {
                    values.push(v++)
                } while(v<=nb_digits)

                let from_char = 65
                do {
                    let c = 0
                    let nb_alpha = Math.max(nb_chars - values.length, 0)
                    nb_alpha = Math.min(nb_alpha, 26)
                    while  (c < nb_alpha) {
                        values.push(String.fromCharCode(from_char + c))
                        c++
                    }
                    from_char+= 32
                } while(from_char<98)
            break;

            case Charset.ALPHA:
            break;

            case Charset.NUMERIC:
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

const validCharsetType = (t) => {
    switch(t) {
        case Charset.ALPHA:
        case Charset.ALPHANUM:
            type = t
        break;

        case Charset.NUMERIC:
        default:
            type = Charset.NUMERIC
        break;
    }

    return type
}

export default Charset