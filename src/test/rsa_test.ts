// const text = "Dieser Text soll verschlüsselt werden";
const text = "AB";
const number = 12;

const zeroPad = (num: string | number, places: number) => String(num).padStart(places, '0')

function text2Bytes(string: string) {
    return string.split('').map(function (char : string) {
        return zeroPad(char.charCodeAt(0).toString(2), 8);
    }).join('');
}

const binary2Decimal = (string: string) => {
    return string.split(" ").map( (element : string) => {
        return Number.parseInt(element,2);
    }).join(" ");
}

const encode = (string: string) => {
    return string.split(" ").map( (element : string) => {
        return Number(BigInt(Number.parseInt(element)) ** BigInt(3) % BigInt(319));
    }).join(" ");
}

const decode = (string: string) => {
    return string.split(" ").map( (element : string) => {
        return Number(BigInt(Number.parseInt(element)) ** BigInt(187) % BigInt(319));
    }).join(" ");
}

const decimal2Text = (string: string) => {
    return string.split(" ").map( (element : string) => {
        return String.fromCharCode(Number.parseInt(element));
    }).join("");
}

const text2Decimal = (string: string) => {
    return string.split("").map( (element : string) => {
        return element.charCodeAt(0);
    }).join(" ");
}



const encodeText = (string: string) => {
    return decimal2Text(encode(binary2Decimal(text2Bytes(string))));
}

const decodeText = (string :string ) => {
    return decimal2Text(decode(binary2Decimal(text2Bytes(string))));
}

console.log("Schritt für Schritt");
console.log(text);
console.log(text2Bytes(text));
console.log(binary2Decimal(text2Bytes(text)))
console.log(encode(binary2Decimal(text2Bytes(text))))
console.log(decimal2Text(encode(binary2Decimal(text2Bytes(text)))))
console.log(decode(encode(binary2Decimal(text2Bytes(text)))))
console.log(decimal2Text(decode(encode(binary2Decimal(text2Bytes(text))))))
// console.log(decimal2Text(decode(encode(binary2Decimal(text2Binary(text))))))
// console.log(encodeText(text));


// console.log(decodeText(encodeText(text)))
// console.log(text);
// console.log(text2Decimal(text))
// console.log(encode(text2Decimal(text)))

var data = [];
for (var i = 0; i < text.length; i++){
    data.push(text.charCodeAt(i));
}
console.log(data.join(""));

console.log(text2Bytes(text))
console.log(binary2Decimal(text2Bytes(text)))
console.log(encode(binary2Decimal(text2Bytes(text))))
console.log(decode(encode(binary2Decimal(text2Bytes(text)))))

// console.log(text)
// console.log(encodeText(text))
// console.log(decodeText(encodeText(text)))
// console.log()