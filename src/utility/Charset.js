let values = []
let type = undefined

const Charset = {
    ALPHA: 'ALPHA',
    ALPHANUM: 'ALPHANUM',
    NUMERIC: 'NUMERIC',

    get: (nb_chars, rosetta) => {
        let error, nb_digits, v
        values = []
        switch(type) {
            case Charset.ALPHANUM:
                if  (nb_chars>62) {
                    error = 'ERRORS.MAX_CHARS_LIMIT'
                    if  (rosetta) {
                        error = rosetta.get(error, [62])
                    }
                    throw(error);
                }

                nb_digits = Math.min(9, nb_chars)
                v = 1
                do {
                    values.push(v++)
                } while(v<=nb_digits)

                addAlphaChars(values, nb_chars)
            break;

            case Charset.ALPHA:
                if  (nb_chars>52) {
                    error = 'ERRORS.MAX_CHARS_LIMIT'
                    if  (rosetta) {
                        error = rosetta.get(error, [52])
                    }
                    throw(error);
                }

                addAlphaChars(values, nb_chars)
            break;

            case Charset.NUMERIC:
            default:
                for (v = 1; v <= nb_chars; v++) {
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

const addAlphaChars = (values, nb_chars, from_char=65) => {
    let c, nb_alpha
    do {
        c = 0
        nb_alpha = Math.max(nb_chars - values.length, 0)
        nb_alpha = Math.min(nb_alpha, 26)
        while  (c < nb_alpha) {
            values.push(String.fromCharCode(from_char + c))
            c++
        }
        from_char+= 32
    } while(from_char<98)
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