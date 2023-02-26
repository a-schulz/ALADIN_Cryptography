export const Ascii = () => {
    return (
        <div className={"container"}>
            <h1>ASCII Table</h1>
            <div className="row align-items-start">
                <div className={"col"}>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Decimal</th>
                            <th scope="col">Character</th>
                            <th scope="col">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(ascii).filter((e) => Number.parseInt(e) <= 32).map((key) => {
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{ascii[key].char}</td>
                                    <td>{ascii[key].name}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className={"col"}>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Decimal</th>
                            <th scope="col">Character</th>
                            <th scope="col">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(ascii).filter((e) => Number.parseInt(e) > 32 && Number.parseInt(e) <= 64).map((key) => {
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{ascii[key].char}</td>
                                    <td>{ascii[key].name}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row align-items-start">
                <div className={"col"}>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Decimal</th>
                            <th scope="col">Character</th>
                            <th scope="col">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(ascii).filter((e) => Number.parseInt(e) > 64 && Number.parseInt(e) <= 96).map((key) => {
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{ascii[key].char}</td>
                                    <td>{ascii[key].name}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className={"col"}>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Decimal</th>
                            <th scope="col">Character</th>
                            <th scope="col">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(ascii).filter((e) => Number.parseInt(e) > 96).map((key) => {
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{ascii[key].char}</td>
                                    <td>{ascii[key].name}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export const ascii = {
    0: {char: "[NUL]", name: "null character"},
    1: {char: "[SOH]", name: "start of heading"},
    2: {char: "[STX]", name: "start of text"},
    3: {char: "[ETX]", name: "end of text"},
    4: {char: "[EOT]", name: "end of transmission"},
    5: {char: "[ENQ]", name: "enquiry"},
    6: {char: "[ACK]", name: "acknowledge"},
    7: {char: "[BEL]", name: "bell"},
    8: {char: "[BS]", name: "backspace"},
    9: {char: "[HT]", name: "horizontal tab"},
    10: {char: "[LF]", name: "new line"},
    11: {char: "[VT]", name: "vertical tab"},
    12: {char: "[FF]", name: "new page"},
    13: {char: "[CR]", name: "carriage return"},
    14: {char: "[SO]", name: "shift out"},
    15: {char: "[SI]", name: "shift in"},
    16: {char: "[DLE]", name: "data link escape"},
    17: {char: "[DC1]", name: "device control 1"},
    18: {char: "[DC2]", name: "device control 2"},
    19: {char: "[DC3]", name: "device control 3"},
    20: {char: "[DC4]", name: "device control 4"},
    21: {char: "[NAK]", name: "negative acknowledge"},
    22: {char: "[SYN]", name: "synchronous idle"},
    23: {char: "[ETB]", name: "end of transmission block"},
    24: {char: "[CAN]", name: "cancel"},
    25: {char: "[EM]", name: "end of medium"},
    26: {char: "[SUB]", name: "substitute"},
    27: {char: "[ESC]", name: "escape"},
    28: {char: "[FS]", name: "file separator"},
    29: {char: "[GS]", name: "group separator"},
    30: {char: "[RS]", name: "record separator"},
    31: {char: "[US]", name: "unit separator"},
    32: {char: "[Space]", name: "space"},
    33: {char: "!", name: "exclamation mark"},
    34: {char: '"', name: "double quotation mark"},
    35: {char: "#", name: "number sign"},
    36: {char: "$", name: "dollar sign"},
    37: {char: "%", name: "percent sign"},
    38: {char: "&", name: "ampersand"},
    39: {char: "'", name: "apostrophe"},
    40: {char: "(", name: "left parenthesis"},
    41: {char: ")", name: "right parenthesis"},
    42: {char: "*", name: "asterisk"},
    43: {char: "+", name: "plus sign"},
    44: {char: ",", name: "comma"},
    45: {char: "-", name: "hyphen"},
    46: {char: ".", name: "full stop"},
    47: {char: "/", name: "solidus"},
    48: {char: "0", name: "digit zero"},
    49: {char: "1", name: "digit one"},
    50: {char: "2", name: "digit two"},
    51: {char: "3", name: "digit three"},
    52: {char: "4", name: "digit four"},
    53: {char: "5", name: "digit five"},
    54: {char: "6", name: "digit six"},
    55: {char: "7", name: "digit seven"},
    56: {char: "8", name: "digit eight"},
    57: {char: "9", name: "digit nine"},
    58: {char: ":", name: "colon"},
    59: {char: ";", name: "semicolon"},
    60: {char: "<", name: "less-than sign"},
    61: {char: "=", name: "equals sign"},
    62: {char: ">", name: "greater-than sign"},
    63: {char: "?", name: "question mark"},
    64: {char: "@", name: "at sign"},
    65: {char: "A", name: "uppercase A"},
    66: {char: "B", name: "uppercase B"},
    67: {char: "C", name: "uppercase C"},
    68: {char: "D", name: "uppercase D"},
    69: {char: "E", name: "uppercase E"},
    70: {char: "F", name: "uppercase F"},
    71: {char: "G", name: "uppercase G"},
    72: {char: "H", name: "uppercase H"},
    73: {char: "I", name: "uppercase I"},
    74: {char: "J", name: "uppercase J"},
    75: {char: "K", name: "uppercase K"},
    76: {char: "L", name: "uppercase L"},
    77: {char: "M", name: "uppercase M"},
    78: {char: "N", name: "uppercase N"},
    79: {char: "O", name: "uppercase O"},
    80: {char: "P", name: "uppercase P"},
    81: {char: "Q", name: "uppercase Q"},
    82: {char: "R", name: "uppercase R"},
    83: {char: "S", name: "uppercase S"},
    84: {char: "T", name: "uppercase T"},
    85: {char: "U", name: "uppercase U"},
    86: {char: "V", name: "uppercase V"},
    87: {char: "W", name: "uppercase W"},
    88: {char: "X", name: "uppercase X"},
    89: {char: "Y", name: "uppercase Y"},
    90: {char: "Z", name: "uppercase Z"},
    91: {char: "[", name: "left square bracket"},
    92: {char: "\\", name: "backslash"},
    93: {char: "]", name: "right square bracket"},
    94: {char: "^", name: "circumflex accent"},
    95: {char: "_", name: "low line"},
    96: {char: "`", name: "grave accent"},
    97: {char: "a", name: "lowercase a"},
    98: {char: "b", name: "lowercase b"},
    99: {char: "c", name: "lowercase c"},
    100: {char: "d", name: "lowercase d"},
    101: {char: "e", name: "lowercase e"},
    102: {char: "f", name: "lowercase f"},
    103: {char: "g", name: "lowercase g"},
    104: {char: "h", name: "lowercase h"},
    105: {char: "i", name: "lowercase i"},
    106: {char: "j", name: "lowercase j"},
    107: {char: "k", name: "lowercase k"},
    108: {char: "l", name: "lowercase l"},
    109: {char: "m", name: "lowercase m"},
    110: {char: "n", name: "lowercase n"},
    111: {char: "o", name: "lowercase o"},
    112: {char: "p", name: "lowercase p"},
    113: {char: "q", name: "lowercase q"},
    114: {char: "r", name: "lowercase r"},
    115: {char: "s", name: "lowercase s"},
    116: {char: "t", name: "lowercase t"},
    117: {char: "u", name: "lowercase u"},
    118: {char: "v", name: "lowercase v"},
    119: {char: "w", name: "lowercase w"},
    120: {char: "x", name: "lowercase x"},
    121: {char: "y", name: "lowercase y"},
    122: {char: "z", name: "lowercase z"},
    123: {char: "{", name: "left curly bracket"},
    124: {char: "|", name: "vertical line"},
    125: {char: "}", name: "right curly bracket"},
    126: {char: "~", name: "tilde"},
    127: {char: "[DEL]", name: "delete"},
    128: {char: "€", name: "euro sign"},
};

