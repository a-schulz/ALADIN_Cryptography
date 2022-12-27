import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Rsa} from "../../../backend/rsaCryptograpy/Rsa";
import {getRandomInt} from "../../../backend/rsaCryptograpy/GetRandomInt";
import {EncryptDecryptHelper} from "./EncryptDecryptHelper";
import {useEffectOnce} from "../utils/useEffectOnce";
import {fetchAndSetAll, fetchJson} from "../utils/fetchHelper";
import {addCustomValidity, addValidationAttributesToElements} from "../utils/inputValidation/addValidation";
import {validationConstraints} from "../utils/inputValidation/validationConstraints";

//Todo: Validation with hidden input?

interface EncryptDecryptInput {
    chiffratNumeric: number,
    messageNumeric: number,
    chiffratText: string,
    messageText: string,
}

export const EncryptDecrypt = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const rsa = new Rsa(location.state._rsaConfig);
    const [numberToEncrypt, setNumberToEncrypt] = useState(getRandomInt(20));
    const [numberToDecrypt, setNumberToDecrypt] = useState(getRandomInt(20));
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
        fetchAndSetAll([
                {
                    url: "https://random-word-api.herokuapp.com/word?length=6",
                    setter: setTextToEncrypt
                },
                {
                    url: "https://random-word-api.herokuapp.com/word?length=6",
                    setter: setTextToDecrypt
                }
            ]
        );
        addValidationAttributesToElements(validationConstraints);
        addCustomValidity(validationConstraints);
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.id;
        const value = event.target.type === "number" ? Number.parseInt(event.target.value) : event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const inputCorrect = (input: EncryptDecryptInput, rsa: Rsa) => {
        if (encryptText) {
            return false;
            // rsa.encode(textToEncrypt, rsa.publicKey) == inputs.chiffratText &&
            //     rsa.decode(textToDecrypt) == inputs.messageText

        }else{
           return (rsa.encode(numberToEncrypt, rsa.publicKey) == inputs.chiffratNumeric &&
               rsa.decode(numberToDecrypt) == inputs.messageNumeric);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!inputCorrect(inputs, rsa)) {
            alert("Your solution is not correct." +
            "Please check your input.\n" +
            "Consider looking into the solution aids.");
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
                <div className="card-body">
                    <h5>Here are your Keys!</h5>
                    <p>Public key: e= {rsa._publicKey["exponent"]}, n= {rsa._publicKey["divisor"]}</p>
                    <p>Private key: d= {rsa.privateKey["exponent"]}, n= {rsa.privateKey["divisor"]}</p>
                </div>
            </div>
            <div id="encryptText" style={{display: (encryptText) ? "block" : "none"}}>
                <h4>Encrypting/Decrypting text</h4>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h3>You want to send your friend the following message: "{textToEncrypt}". Please encrypt it.</h3>
                    <input type="number" placeholder="Enter your solution..." id="chiffratText" className="form-control"
                           onChange={handleChange}/>

                    <h3>You got the following message: "{textToDecrypt}". Decrypt it.</h3>
                    <input type="number" placeholder="Enter the original message..." id="messageText"
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
            <EncryptDecryptHelper textToEncrypt={numberToEncrypt} textToDecrypt={numberToDecrypt}
                                  rsa={rsa}></EncryptDecryptHelper>
        </div>
    )
}