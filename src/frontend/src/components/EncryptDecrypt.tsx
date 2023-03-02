import {useState} from "react";
import {useLocation} from "react-router-dom";
import {Rsa} from "../../../backend/rsaCryptography/Rsa";
import {getRandomInt} from "../../../backend/rsaCryptography/GetRandomInt";
import {EncryptDecryptHelper} from "./EncryptDecryptHelper";
import {useEffectOnce} from "../utils/useEffectOnce";
import {fetchJson} from "../utils/fetchHelper";
import {addCustomValidity, addValidationAttributesToElements} from "../utils/inputValidation/addValidation";
import {validationConstraints} from "../utils/inputValidation/validationConstraints";

interface EncryptDecryptInput {
    chiffratNumeric: number,
    messageNumeric: number,
    chiffratText: string,
    messageText: string,
}

export const EncryptDecrypt = () => {

    const location = useLocation();
    const rsaNumeric = new Rsa(location.state._rsaConfig);
    const rsaString = new Rsa({p: 3, q: 43, e: 5});
    // N = 129 damit lassen sich alle Werte der ASCII-Tabelle darstellen
    const [numberToEncrypt] = useState(getRandomInt(20));
    const [numberToDecrypt] = useState(getRandomInt(20));
    const [textToEncrypt, setTextToEncrypt] = useState("");
    const [textToDecrypt, setTextToDecrypt] = useState("");
    const [inputs, setInputs] = useState({} as EncryptDecryptInput);
    // true if text should be used
    const [encryptText, setEncryptText] = useState(false);

    const validationConstraints: Record<string, validationConstraints> = {
        chiffratNumeric: {required: true},
        messageNumeric: {required: true},
        chiffratText: {required: true},
        messageText: {required: true},
    };

    useEffectOnce(() => {
        const fetchAndSet = async () => {
            const response = await fetchJson("https://random-word-api.herokuapp.com/word?length=6");
            setTextToEncrypt(response[0]);
            const response2 = await fetchJson("https://random-word-api.herokuapp.com/word?length=6");
            setTextToDecrypt(rsaString.encodeString(response2[0], rsaString.publicKey));
        }
        fetchAndSet();
        addValidationAttributesToElements(validationConstraints);
        addCustomValidity(validationConstraints);
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.id;
        const value = event.target.type === "number" ? Number.parseInt(event.target.value) : event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const inputCorrect = () => {
        if (encryptText) {
            return (rsaString.encodeString(textToEncrypt, rsaString.publicKey) == inputs.chiffratText &&
                rsaString.decodeString(textToDecrypt) == inputs.messageText);
        }else{
           return (rsaNumeric.encodeNumeric(numberToEncrypt, rsaNumeric.publicKey) == inputs.chiffratNumeric &&
               rsaNumeric.decodeNumeric(numberToDecrypt) == inputs.messageNumeric);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!inputCorrect()) {
            alert("Your solution is not correct.\n" +
            "Please check your input.\n" +
            "Consider looking into the solution aids.");
        }else{
            alert("Congratulations!\n" +
                "Your solution is correct.");
        }
    }

    return (
        <div className="container">
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                       onClick={(e) => {
                           setEncryptText(e.target["checked"]);
                       }}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">I want to encrypt text.</label>
            </div>
            <h1>Encryption - Decryption</h1>
            <div className="card">
                <div className="card-body" style={{display: (!encryptText) ? "block" : "none"}}>
                    <h5>Here are your Keys!</h5>
                    <p>Public key: e= {rsaNumeric._publicKey["exponent"]}, n= {rsaNumeric._publicKey["divisor"]}</p>
                    <p>Private key: d= {rsaNumeric.privateKey["exponent"]}, n= {rsaNumeric.privateKey["divisor"]}</p>
                </div>
                <div className="card-body" style={{display: (encryptText) ? "block" : "none"}}>
                    <h5>Here are your Keys!</h5>
                    <p>Public key: e= {rsaString._publicKey["exponent"]}, n= {rsaString._publicKey["divisor"]}</p>
                    <p>Private key: d= {rsaString.privateKey["exponent"]}, n= {rsaString.privateKey["divisor"]}</p>
                </div>
            </div>
            <div id="encryptText" style={{display: (encryptText) ? "block" : "none"}}>
                <h4>Encrypting/Decrypting text</h4>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h3>You want to send your friend the following message: "{textToEncrypt}". Please encrypt it.</h3>
                    <input type="string" placeholder="Enter your solution..." id="chiffratText" className="form-control"
                           onChange={handleChange}/>

                    <h3>You got the following message: "{textToDecrypt}". Decrypt it.</h3>
                    <input type="string" placeholder="Enter the original message..." id="messageText"
                           className="form-control"
                           onChange={handleChange}/>
                    <button type="submit" className="btn btn-outline-primary" data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">Submit
                    </button>
                </form>
            </div>
            <div id="encryptNumberic" style={{display: (!encryptText) ? "block" : "none"}}>
                <h4>Encrypting/Decrypting numbers</h4>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h3>You want to send your friend the following message: "{numberToEncrypt}". Please encrypt it.</h3>
                    <input type="number" placeholder="Enter your solution..." id="chiffratNumeric"
                           className="form-control"
                           onChange={handleChange}/>

                    <h3>You got the following message: "{numberToDecrypt}". Decrypt it.</h3>
                    <input type="number" placeholder="Enter the original message..." id="messageNumeric"
                           className="form-control"
                           onChange={handleChange}/>
                    <button type="submit" className="btn btn-outline-primary" data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">Submit
                    </button>
                </form>
            </div>
            <EncryptDecryptHelper numberToEncrypt={numberToEncrypt} numberToDecrypt={numberToDecrypt}
                                  rsaNumeric={rsaNumeric} rsaString={rsaString} encryptText={encryptText} textToDecrypt={textToDecrypt} textToEncrypt={textToEncrypt}></EncryptDecryptHelper>
        </div>
    )
}